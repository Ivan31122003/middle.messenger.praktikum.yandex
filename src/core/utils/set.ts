import type { Indexed } from './types';

const isObject = (x: unknown): x is Indexed => typeof x === 'object' && x !== null;

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!isObject(object)) {
    return object;
  }

  const keys = path.split('.');
  let current: Indexed = object as Indexed;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const next = current[key];

    if (!isObject(next) || Array.isArray(next)) {
      current[key] = {};
    }
    current = current[key] as Indexed;
  }

  current[keys[keys.length - 1]] = value;

  return object;
}
