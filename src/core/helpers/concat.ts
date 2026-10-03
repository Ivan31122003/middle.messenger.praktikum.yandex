export const concat = (...args: unknown[]) => {
  // последний аргумент — options, поэтому его убираем
  return args.slice(0, -1).join("");
};
