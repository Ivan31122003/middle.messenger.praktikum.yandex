import Handlebars from "handlebars";
import { PrButtonTemplate } from "./pr-button";
import { PrInputTemplate } from "./pr-input";
import { PrAvatarTemplate } from "./pr-avatar";

export const registerComponents = () => {
  Handlebars.registerPartial("pr-button", PrButtonTemplate);
  Handlebars.registerPartial("pr-input", PrInputTemplate);
  Handlebars.registerPartial("pr-avatar", PrAvatarTemplate);
};
