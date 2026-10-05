import { registerComponents } from "./components";
import { registerModules } from "./modules";
import { registerLayouts } from "./layouts";
import { renderRoute, registerHelpers } from "./core";
import "@/styles/index.scss";

// Только для 1-го спринта
const addEventListenersForNavigation = () => {
  // Формы
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

  const changeDataForm = document.getElementById("profile-change-data-form");
  changeDataForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "/profile-info";
  });

  const changePasswordForm = document.getElementById(
    "profile-change-password-form",
  );
  changePasswordForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "/profile-info";
  });

  // Кнопки
  const changeDataButton = document.getElementById("profile-info__change-data");
  changeDataButton?.addEventListener("click", () => {
    window.location.href = "/profile-change-data";
  });

  const changePasswordButton = document.getElementById(
    "profile-info__change-password",
  );
  changePasswordButton?.addEventListener("click", () => {
    window.location.href = "/profile-change-password";
  });

  const exitButton = document.getElementById("profile-info__exit");
  exitButton?.addEventListener("click", () => {
    window.location.href = "/login";
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
