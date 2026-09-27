interface User {
  email: string;
  login: string;
  name: string;
  surname: string;
  chatName: string;
  phone: string;
}

const user: User = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  name: "Иван",
  surname: "Иванов",
  chatName: "Иван",
  phone: "+7 (909) 967 30 30",
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
