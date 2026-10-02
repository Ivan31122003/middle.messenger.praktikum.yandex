export const lookup = (
  obj: Record<string, unknown> | null | undefined,
  key: string | number,
): unknown => {
  if (obj == null) {
    return undefined;
  }
  return obj[key];
};
