import { METHODS, BACKEND_HOST } from './defaults';
import type { GetOptions, BodyOptions, RequestOptions, HTTPMethod } from './types';
import { queryStringify } from './helpers';
export class HTTPTransport {
  private baseURL: string;

  constructor(basePath: string = '') {
    this.baseURL = `${BACKEND_HOST}${basePath}`;
  }

  get: HTTPMethod<GetOptions> = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post: HTTPMethod<BodyOptions> = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put: HTTPMethod<BodyOptions> = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete: HTTPMethod<BodyOptions> = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  private request = (url: string, options: RequestOptions, timeout = 5000) => {
    const fullUrl = this.baseURL + url;
    const { headers = {}, method, data, responseType } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('HTTP method is required'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && data ? `${fullUrl}${queryStringify(data)}` : fullUrl);
      xhr.withCredentials = true;

      if (responseType) {
        xhr.responseType = responseType;
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response;

          if (xhr.responseType) {
            response = xhr.response;
          } else {
            try {
              const contentType = xhr.getResponseHeader('Content-Type');
              if (contentType && contentType.includes('application/json')) {
                response = JSON.parse(xhr.responseText);
              } else {
                response = xhr.responseText;
              }
            } catch {
              response = xhr.responseText;
            }
          }

          resolve(response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.responseText,
            request: xhr,
          });
        }
      };

      xhr.onabort = () =>
        reject({
          reason: 'Request aborted',
          request: xhr,
        });

      xhr.onerror = () =>
        reject({
          reason: 'Network error',
          request: xhr,
        });

      xhr.timeout = timeout;

      xhr.ontimeout = () =>
        reject({
          reason: 'Request timeout',
          timeout: timeout,
          request: xhr,
        });

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else if (typeof data === 'object') {
        if (!headers['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  };
}
