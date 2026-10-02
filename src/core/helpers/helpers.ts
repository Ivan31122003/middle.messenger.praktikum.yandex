import Handlebars from "handlebars";
import { eq } from "./eq";
import { lookup } from "./lookup";
import { concat } from "./concat";

export const registerHelpers = () => {
  Handlebars.registerHelper("eq", eq);
  Handlebars.registerHelper("lookup", lookup);
  Handlebars.registerHelper("concat", concat);
};
