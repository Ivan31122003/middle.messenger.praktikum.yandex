import type { RegField } from './types';

export const FIELDS: RegField[] = [
  {
    name: 'email',
    caption: 'Почта',
    type: 'email',
  },
  {
    name: 'login',
    caption: 'Логин',
  },
  {
    name: 'first_name',
    caption: 'Имя',
  },
  {
    name: 'second_name',
    caption: 'Фамилия',
  },
  {
    name: 'phone',
    caption: 'Телефон',
    type: 'tel',
  },
  {
    name: 'password',
    caption: 'Пароль',
    type: 'password',
  },
  {
    name: 'repeat_password',
    caption: 'Пароль (еще раз)',
    type: 'password',
  },
];
