type QueryValue = string | number | boolean | null | undefined;

export function queryStringify(data: Record<string, QueryValue>): string {
  const params = Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    });

  return params.length > 0 ? `?${params.join('&')}` : '';
}
