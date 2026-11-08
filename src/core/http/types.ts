import { METHODS } from './defaults';

type Method = (typeof METHODS)[keyof typeof METHODS];

type QueryData = Record<string, string | number | boolean | null | undefined>;

type BaseOptions = {
  headers?: Record<string, string>;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
};

export type GetOptions = BaseOptions & {
  data?: QueryData;
};

export type BodyOptions = BaseOptions & {
  data?: Record<string, unknown> | FormData | string;
};

export type RequestOptions =
  | (GetOptions & { method: typeof METHODS.GET })
  | (BodyOptions & { method: Exclude<Method, typeof METHODS.GET> });

export type HTTPMethod<Options> = (url: string, options?: Options) => Promise<unknown>;
