import type { Route, Path } from "./types";
import { registrationData } from "@/data/registration";
import { profileData } from "@/data/profile";

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
    data: registrationData,
  },
  "/messenger": {
    type: "page",
    loader: () => import("@/pages/messenger"),
  },
  "/profile-info": {
    type: "page",
    loader: () => import("@/pages/profile-info"),
    data: profileData,
  },
  "/profile-change-data": {
    type: "page",
    loader: () => import("@/pages/profile-change-data"),
    data: profileData,
  },
  "/profile-change-password": {
    type: "page",
    loader: () => import("@/pages/profile-change-password"),
  },
};
