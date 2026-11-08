export type ApiResult<T> = { ok: true; data: T } | { ok: false; reason: string };

export type ApiVoidResult = { ok: true } | { ok: false; reason: string };
