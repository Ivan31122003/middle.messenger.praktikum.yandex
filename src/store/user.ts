export interface User {
  avatar: File | null;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

export const mockUser: User = {
  avatar: null,
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'Иван',
  phone: '+79099673030',
};
