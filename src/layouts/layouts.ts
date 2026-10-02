import Handlebars from "handlebars";
import { AuthLayoutTemplate } from "./auth";
import { ErrorLayoutTemplate } from "./error";
import { ProfileLayoutTemplate } from "./profile";

export const registerLayouts = () => {
  Handlebars.registerPartial("auth-layout", AuthLayoutTemplate);
  Handlebars.registerPartial("error-layout", ErrorLayoutTemplate);
  Handlebars.registerPartial("profile-layout", ProfileLayoutTemplate);
};
