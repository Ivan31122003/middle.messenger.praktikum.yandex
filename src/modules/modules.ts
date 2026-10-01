import Handlebars from "handlebars";
import { LoginFormModuleTemplate } from "./login-form";
import { RegistrationFormModuleTemplate } from "./registration-form";
import { ChatItemModuleTemplate } from "./chat-item";
import { ContactsModuleTemplate } from "./contacts";
import { InfoRowModule } from "./info-row";
import { ProfileModuleTemplate } from "./profile";

export const registerModules = () => {
  Handlebars.registerPartial("login-form", LoginFormModuleTemplate);
  Handlebars.registerPartial(
    "registration-form",
    RegistrationFormModuleTemplate,
  );
  Handlebars.registerPartial("chat-item", ChatItemModuleTemplate);
  Handlebars.registerPartial("contacts", ContactsModuleTemplate);
  Handlebars.registerPartial("info-row", InfoRowModule);
  Handlebars.registerPartial("profile", ProfileModuleTemplate);
};
