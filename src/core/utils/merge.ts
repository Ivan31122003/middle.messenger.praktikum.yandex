import type { Indexed } from './types';

const isPlainObject = (x: unknown) =>
  typeof x === 'object' &&
  x !== null &&
  (Object.getPrototypeOf(x) === Object.prototype || Object.getPrototypeOf(x) === null);

export const merge = (a: Indexed, b: Indexed) => {
  const result = { ...a };
  for (const key of Object.keys(b)) {
    const av = result[key] as Indexed;
    const bv = b[key] as Indexed;
    result[key] = isPlainObject(av) && isPlainObject(bv) ? merge(av, bv) : bv;
  }
  return result;
};
