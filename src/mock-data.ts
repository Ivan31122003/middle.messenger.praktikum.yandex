interface User {
  avatar: File | null;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

const user: User = {
  avatar: null,
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  first_name: "Иван",
  second_name: "Иванов",
  display_name: "Иван",
  phone: "+7 (909) 967-30-30",
};

interface Contact {
  name: string;
  lastMessageIsYour: boolean;
  lastMessage: string;
  time: string;
  unreadMessagesNumber?: number;
}

const contacts: Contact[] = [
  {
    name: "Андрей",
    lastMessageIsYour: false,
    lastMessage: "Изображение",
    time: "10:49",
    unreadMessagesNumber: 2,
  },
  {
    name: "Киноклуб",
    lastMessageIsYour: true,
    lastMessage: "стикер",
    time: "12:00",
  },
  {
    name: "Илья",
    lastMessageIsYour: false,
    lastMessage:
      "Друзья, у меня для вас особенный выпуск новостей! (какое-то продолжение)",
    time: "11:55",
    unreadMessagesNumber: 4,
  },
  {
    name: "Вадим",
    lastMessageIsYour: true,
    lastMessage: "Круто!",
    time: "Пт",
  },
  {
    name: "тет-а-теты",
    lastMessageIsYour: false,
    lastMessage:
      "И Human Interface Guidelines и Material Design рекомендуют (какое-то продолжение)",
    time: "10:12",
  },
  {
    name: "Андрей",
    lastMessageIsYour: false,
    lastMessage: "Изображение",
    time: "10:49",
    unreadMessagesNumber: 2,
  },
  {
    name: "Киноклуб",
    lastMessageIsYour: true,
    lastMessage: "стикер",
    time: "12:00",
  },
  {
    name: "Илья",
    lastMessageIsYour: false,
    lastMessage:
      "Друзья, у меня для вас особенный выпуск новостей! (какое-то продолжение)",
    time: "11:55",
    unreadMessagesNumber: 4,
  },
  {
    name: "Вадим",
    lastMessageIsYour: true,
    lastMessage: "Круто!",
    time: "Пт",
  },
  {
    name: "тет-а-теты",
    lastMessageIsYour: false,
    lastMessage:
      "И Human Interface Guidelines и Material Design рекомендуют (какое-то продолжение)",
    time: "10:12",
  },
  {
    name: "Андрей",
    lastMessageIsYour: false,
    lastMessage: "Изображение",
    time: "10:49",
    unreadMessagesNumber: 2,
  },
  {
    name: "Киноклуб",
    lastMessageIsYour: true,
    lastMessage: "стикер",
    time: "12:00",
  },
  {
    name: "Илья",
    lastMessageIsYour: false,
    lastMessage:
      "Друзья, у меня для вас особенный выпуск новостей! (какое-то продолжение)",
    time: "11:55",
    unreadMessagesNumber: 4,
  },
  {
    name: "Вадим",
    lastMessageIsYour: true,
    lastMessage: "Круто!",
    time: "Пт",
  },
  {
    name: "тет-а-теты",
    lastMessageIsYour: false,
    lastMessage:
      "И Human Interface Guidelines и Material Design рекомендуют (какое-то продолжение)",
    time: "10:12",
  },
];

export const mockData = {
  user,
  contacts,
};
