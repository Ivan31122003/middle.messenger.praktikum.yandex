import Handlebars from "handlebars";
import { eq } from "./eq.ts";

export const registerHelpers = () => {
  Handlebars.registerHelper("eq", eq);
};
