import { registerComponents } from "@/components";
import { registerModules } from "@/modules";
import { renderRoute, registerHelpers } from "@/core";
import "@/styles/index.scss";

registerHelpers();
registerComponents();
registerModules();
renderRoute();
