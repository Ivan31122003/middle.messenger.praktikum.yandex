import { registerComponents } from "./components";
import { registerModules } from "./modules";
import { registerLayouts } from "./layouts";
import { renderRoute, registerHelpers } from "./core";
import "@/styles/index.scss";

// Только для 1-го спринта
const addEventListenersForNavigation = () => {
  const loginForm = document.getElementById("login-form");
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "/messenger";
  });

  const regForm = document.getElementById("registration-form");
  regForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "/messenger";
  });
};

const main = async () => {
  registerHelpers();
  registerComponents();
  registerModules();
  registerLayouts();
  await renderRoute();
  addEventListenersForNavigation();
};

main();
