import { describe, expect, it } from 'vitest';
import { queryStringify } from './queryStringify';

describe('queryStringify', () => {
  it('returns no question mark for empty parameters', () => {
    expect(queryStringify({})).toBe('');
    expect(queryStringify({ title: undefined, limit: null })).toBe('');
  });

  it('preserves zero, false and empty strings', () => {
    expect(queryStringify({ offset: 0, enabled: false, title: '' })).toBe(
      '?offset=0&enabled=false&title=',
    );
  });

  it('escapes parameter names and values', () => {
    expect(queryStringify({ 'a&b': 'чат + test' })).toBe('?a%26b=%D1%87%D0%B0%D1%82%20%2B%20test');
  });
});
