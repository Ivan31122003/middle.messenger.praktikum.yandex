import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HTTPTransport } from './HTTPTransport';
import { BACKEND_HOST } from './defaults';

class FakeXHR {
  static latest: FakeXHR;
  constructor() {
    FakeXHR.latest = this;
  }
  open = vi.fn();
  send = vi.fn();
  setRequestHeader = vi.fn();
  getResponseHeader = vi.fn(() => 'application/json');
  withCredentials = false;
  timeout = 0;
  responseType = '';
  status = 200;
  statusText = 'OK';
  responseText = '{"id":1}';
  response: unknown = null;
  onload = () => {};
  onerror = () => {};
  onabort = () => {};
  ontimeout = () => {};
}

describe('HTTPTransport', () => {
  let http: HTTPTransport;
  beforeEach(() => {
    vi.stubGlobal('XMLHttpRequest', FakeXHR);
    http = new HTTPTransport('/api/v2/chats');
  });

  it('encodes GET parameters, skips missing values and sends credentials', async () => {
    const promise = http.get('', {
      data: { title: 'A & Б', offset: 0, limit: undefined, empty: null },
    });
    const xhr = FakeXHR.latest;
    expect(xhr.open).toHaveBeenCalledWith(
      'GET',
      `${BACKEND_HOST}/api/v2/chats?title=A%20%26%20%D0%91&offset=0`,
    );
    expect(xhr.send).toHaveBeenCalledWith();
    expect(xhr.withCredentials).toBe(true);
    expect(xhr.timeout).toBe(5000);
    xhr.onload();
    await expect(promise).resolves.toEqual({ id: 1 });
  });

  it.each(['post', 'put', 'delete'] as const)('sends JSON using %s', async (method) => {
    const promise = http[method]('/1', { data: { title: 'Chat' } });
    const xhr = FakeXHR.latest;
    expect(xhr.open).toHaveBeenCalledWith(method.toUpperCase(), `${BACKEND_HOST}/api/v2/chats/1`);
    expect(xhr.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(xhr.send).toHaveBeenCalledWith('{"title":"Chat"}');
    xhr.onload();
    await promise;
  });

  it('sends FormData without forcing a content type', async () => {
    const data = new FormData();
    data.set('avatar', new Blob(['image']), 'avatar.png');
    const promise = http.put('/avatar', { data });
    const xhr = FakeXHR.latest;
    expect(xhr.send).toHaveBeenCalledWith(data);
    expect(xhr.setRequestHeader).not.toHaveBeenCalled();
    xhr.onload();
    await promise;
  });

  it('preserves custom headers and raw string bodies', async () => {
    const promise = http.post('', { data: 'hello', headers: { 'Content-Type': 'text/plain' } });
    const xhr = FakeXHR.latest;
    expect(xhr.setRequestHeader).toHaveBeenCalledExactlyOnceWith('Content-Type', 'text/plain');
    expect(xhr.send).toHaveBeenCalledWith('hello');
    xhr.getResponseHeader.mockReturnValue('text/plain');
    xhr.responseText = 'done';
    xhr.onload();
    await expect(promise).resolves.toBe('done');
  });

  it('returns the response for an explicit responseType', async () => {
    const promise = http.get('', { responseType: 'json' });
    const xhr = FakeXHR.latest;
    expect(xhr.responseType).toBe('json');
    xhr.response = { title: 'Chat' };
    xhr.onload();
    await expect(promise).resolves.toEqual({ title: 'Chat' });
  });

  it('falls back to text for malformed JSON', async () => {
    const promise = http.get('');
    FakeXHR.latest.responseText = 'invalid JSON';
    FakeXHR.latest.onload();
    await expect(promise).resolves.toBe('invalid JSON');
  });

  it('rejects HTTP errors with response details', async () => {
    const promise = http.get('');
    Object.assign(FakeXHR.latest, { status: 403, statusText: 'Forbidden', responseText: 'denied' });
    FakeXHR.latest.onload();
    await expect(promise).rejects.toMatchObject({
      status: 403,
      statusText: 'Forbidden',
      response: 'denied',
    });
  });

  it.each([
    ['onerror', 'Network error'],
    ['onabort', 'Request aborted'],
    ['ontimeout', 'Request timeout'],
  ] as const)('rejects on %s', async (event, reason) => {
    const promise = http.get('', { timeout: 100 });
    expect(FakeXHR.latest.timeout).toBe(100);
    FakeXHR.latest[event]();
    await expect(promise).rejects.toMatchObject({ reason });
  });
});
