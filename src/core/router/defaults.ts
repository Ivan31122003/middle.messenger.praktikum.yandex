import type { Route, Path } from "./types";

export const PAGE_404: Route = {
  type: "page",
  loader: () => import("@/pages/error-404"),
};

export const ROUTES: Record<Path, Route> = {
  "/": {
    type: "redirect",
    to: "/login",
  },
  "/5xx": {
    type: "page",
    loader: () => import("@/pages/error-5xx"),
  },
  "/login": {
    type: "page",
    loader: () => import("@/pages/login"),
  },
  "/registration": {
    type: "page",
    loader: () => import("@/pages/registration"),
  },
  "/messenger": {
    type: "page",
    loader: () => import("@/pages/messenger"),
  },
  "/profile": {
    type: "page",
    loader: () => import("@/pages/profile"),
  },
};
