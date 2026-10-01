import Handlebars from "handlebars";
import { eq } from "./eq.ts";
import { lookup } from "./lookup.ts";

export const registerHelpers = () => {
  Handlebars.registerHelper("eq", eq);
  Handlebars.registerHelper("lookup", lookup);
};
