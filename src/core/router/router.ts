import Handlebars from "handlebars";
import { ROUTES, PAGE_404 } from "./defaults";
import type { Path } from "./types";

import { mockData } from "@/mock-data";

export const renderRoute = async (path?: Path) => {
  const routePath = (path ?? window.location.pathname) as Path;

  const route = ROUTES[routePath] ?? PAGE_404;

  if (route.type === "redirect") {
    window.location.replace(route.to);
    return;
  }

  const { default: template } = await route.loader();

  const html = Handlebars.compile(template)(mockData);
  document.querySelector("#app")!.innerHTML = html;
};
