import { BACKEND_HOST } from './defaults';

export class WebSocketClient {
  private readonly ws: WebSocket;

  constructor(path: string) {
    const url = `${BACKEND_HOST.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

    this.ws = new WebSocket(url);
  }

  public get readyState(): number {
    return this.ws.readyState;
  }

  public subscribe<K extends keyof WebSocketEventMap>(
    name: K,
    cb: (event: WebSocketEventMap[K]) => void,
  ): () => void {
    this.ws.addEventListener(name, cb);

    return () => this.ws.removeEventListener(name, cb);
  }

  public send(data: unknown): void {
    if (this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket connection is not open');
    }

    const payload = typeof data === 'string' ? data : JSON.stringify(data);

    if (payload === undefined) {
      throw new Error('WebSocket payload must be JSON-serializable');
    }

    this.ws.send(payload);
  }

  public close(code = 1000, reason = ''): void {
    this.ws.close(code, reason);
  }
}
