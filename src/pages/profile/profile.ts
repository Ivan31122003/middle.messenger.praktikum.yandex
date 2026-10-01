import template from "./profile.hbs?raw";
import "./profile.scss";

export const ProfilePageTemplate = template;

export const data = {
  fields: [
    {
      name: "email",
      fieldName: "Почта",
      key: "email",
    },
    {
      name: "login",
      fieldName: "Логин",
      key: "login",
    },
    {
      name: "first_name",
      fieldName: "Имя",
      key: "first_name",
    },
    {
      name: "second_name",
      fieldName: "Фамилия",
      key: "second_name",
    },
    {
      name: "display_name",
      fieldName: "Имя в чате",
      key: "display_name",
    },
    {
      name: "phone",
      fieldName: "Телефон",
      key: "phone",
    },
  ],
};
