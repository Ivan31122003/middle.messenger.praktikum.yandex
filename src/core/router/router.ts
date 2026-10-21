import { ROUTES, PAGE_404 } from './defaults';
import type { Path } from './types';

// Импровизированный роутер
export const renderRoute = async (path?: Path) => {
  const routePath = (path ?? window.location.pathname) as Path;
  const route = ROUTES[routePath] ?? PAGE_404;

  if (route.type === 'redirect') {
    window.location.replace(route.to);
    return;
  }

  const app = document.querySelector<HTMLElement>('#app');

  if (!app) {
    throw new Error('Не найден контейнер #app');
  }

  const page = new route.component();
  const pageElement = page.element();

  if (!pageElement) {
    throw new Error(`Страница ${route.component.name} не создала DOM-элемент`);
  }

  app.replaceChildren(pageElement);

  return;
};
