import Handlebars from "handlebars";

import { PrButtonTemplate } from "./pr-button";
import { PrInputTemplate } from "./pr-input";

export const registerComponents = () => {
  Handlebars.registerPartial("pr-button", PrButtonTemplate);
  Handlebars.registerPartial("pr-input", PrInputTemplate);
};
