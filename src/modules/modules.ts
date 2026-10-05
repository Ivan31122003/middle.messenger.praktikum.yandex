import Handlebars from "handlebars";
import { ChatItemModuleTemplate } from "./chat-item";
import { ContactsModuleTemplate } from "./contacts";
import { InfoRowModule } from "./info-row";

export const registerModules = () => {
  Handlebars.registerPartial("chat-item", ChatItemModuleTemplate);
  Handlebars.registerPartial("contacts", ContactsModuleTemplate);
  Handlebars.registerPartial("info-row", InfoRowModule);
};
