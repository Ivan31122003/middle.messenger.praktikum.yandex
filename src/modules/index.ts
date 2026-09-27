import Handlebars from "handlebars";
import { LoginFormModuleTemplate } from "./login-form";
import { RegistrationFormModuleTemplate } from "./registration-form";
import { ChatItemModuleTemplate } from "./chat-item";
import { ContactsModuleTemplate } from "./contacts";

export const registerModules = () => {
  Handlebars.registerPartial("login-form", LoginFormModuleTemplate);
  Handlebars.registerPartial(
    "registration-form",
    RegistrationFormModuleTemplate,
  );
  Handlebars.registerPartial("chat-item", ChatItemModuleTemplate);
  Handlebars.registerPartial("contacts", ContactsModuleTemplate);
};
