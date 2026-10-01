import Handlebars from "handlebars";
import { AuthLayoutTemplate } from "./auth";

export const registerLayouts = () => {
  Handlebars.registerPartial("auth-layout", AuthLayoutTemplate);
};
