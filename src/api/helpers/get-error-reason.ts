export function getErrorReason(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error !== 'object' || error === null) {
    return 'Не удалось выполнить запрос';
  }

  if ('response' in error && typeof error.response === 'string') {
    try {
      const body: unknown = JSON.parse(error.response);

      if (
        typeof body === 'object' &&
        body !== null &&
        'reason' in body &&
        typeof body.reason === 'string'
      ) {
        return body.reason;
      }
    } catch {
      // Ответ сервера может быть не JSON.
    }
  }

  // Сетевые ошибки и таймауты твоего транспорта.
  if ('reason' in error && typeof error.reason === 'string') {
    return error.reason;
  }

  return 'Не удалось выполнить запрос';
}
