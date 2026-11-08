export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST || 'https://ya-praktikum.tech';
