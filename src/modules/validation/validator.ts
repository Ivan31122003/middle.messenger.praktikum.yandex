export type ValidationResult = string | undefined;
export type FormValues = Record<string, string>;

type ValidatorName =
  | 'login'
  | 'email'
  | 'phone'
  | 'first_name'
  | 'second_name'
  | 'display_name'
  | 'password'
  | 'message';

export type Validator = (value: string) => ValidationResult;

const LOGIN_PATTERN = /^(?=.{3,20}$)(?=.*[A-Za-z])[A-Za-z0-9_-]+$/;
const EMAIL_PATTERN = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z]+\.[A-Za-z]+$/;
const PASSWORD_PATTERN = /^(?=.{8,40}$)(?=.*[A-Z])(?=.*\d).+$/;
const PHONE_PATTERN = /^\+?\d{10,15}$/;
const NAME_PATTERN = /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]*(?:-[A-Za-zА-Яа-яЁё]+)*$/;

export const validateNotEmpty = (value: string): ValidationResult => {
  if (!value.trim()) {
    return 'Заполните поле';
  }

  return undefined;
};

const validateLogin = (value: string): ValidationResult => {
  if (!value.trim()) {
    return 'Введите логин';
  }

  if (!LOGIN_PATTERN.test(value)) {
    return 'Логин: 3–20 символов, латиница, цифры, дефис или подчёркивание';
  }

  return undefined;
};

const validateEmail = (value: string): ValidationResult => {
  if (!value.trim()) {
    return 'Введите почту';
  }

  if (!EMAIL_PATTERN.test(value)) {
    return 'Введите корректный адрес почты';
  }

  return undefined;
};

const validatePassword = (value: string): ValidationResult => {
  if (!value.trim()) {
    return 'Введите пароль';
  }

  if (!PASSWORD_PATTERN.test(value)) {
    return 'Пароль: 8–40 символов, минимум одна заглавная буква и цифра';
  }

  return undefined;
};

const validatePhone = (value: string): ValidationResult => {
  if (!value.trim()) {
    return 'Введите номер телефона';
  }

  if (!PHONE_PATTERN.test(value)) {
    return 'Телефон: от 10 до 15 цифр, может начинаться с +';
  }

  return undefined;
};

const validateName = (value: string, emptyMessage: string, fieldName: string): ValidationResult => {
  if (!value.trim()) {
    return emptyMessage;
  }

  if (!NAME_PATTERN.test(value)) {
    return `${fieldName} должно начинаться с заглавной буквы и содержать только буквы или дефис`;
  }

  return undefined;
};

const validateFirstName = (value: string): ValidationResult =>
  validateName(value, 'Введите имя', 'Имя');

const validateSecondName = (value: string): ValidationResult =>
  validateName(value, 'Введите фамилию', 'Фамилия');

const validateDisplayName = (value: string): ValidationResult => {
  if (!value.trim()) {
    return 'Введите имя в чате';
  }

  return undefined;
};

const validateMessage = (value: string) => {
  if (!value.trim()) {
    return 'Введите сообщение';
  }

  return undefined;
};

export const repeatPassword = (value1: string, value2: string) => {
  if (value1 !== value2) {
    return 'Пароль не совпадает';
  }

  return undefined;
};

export const validators: Record<ValidatorName, Validator> = {
  login: validateLogin,
  email: validateEmail,
  phone: validatePhone,
  first_name: validateFirstName,
  second_name: validateSecondName,
  display_name: validateDisplayName,
  password: validatePassword,
  message: validateMessage,
};

export const isValidatorName = (name: string): name is ValidatorName => {
  return name in validators;
};
