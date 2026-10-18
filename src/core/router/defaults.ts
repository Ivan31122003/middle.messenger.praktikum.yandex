import type { Route, Path } from './types';
import {
  Error404Page,
  Error5xxPage,
  LoginPage,
  RegPage,
  MessengerPage,
  ProfileInfoPage,
  ProfileChangeDataPage,
  ProfileChangePasswordPage,
} from '@/pages';

export const PAGE_404: Route = {
  type: 'page',
  component: Error404Page,
};

export const ROUTES: Record<Path, Route> = {
  '/': {
    type: 'redirect',
    to: '/login',
  },
  '/5xx': {
    type: 'page',
    component: Error5xxPage,
  },
  '/login': {
    type: 'page',
    component: LoginPage,
  },
  '/reg': {
    type: 'page',
    component: RegPage,
  },
  '/messenger': {
    type: 'page',
    component: MessengerPage,
  },
  '/profile-info': {
    type: 'page',
    component: ProfileInfoPage,
  },
  '/profile-change-data': {
    type: 'page',
    component: ProfileChangeDataPage,
  },
  '/profile-change-password': {
    type: 'page',
    component: ProfileChangePasswordPage,
  },
};
