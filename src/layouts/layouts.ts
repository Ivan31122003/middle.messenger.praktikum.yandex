import Handlebars from 'handlebars';
import { registerComponent } from '@/core';
import { AuthLayoutTemplate } from './auth';
import { ErrorLayout } from './error';
import { ProfileLayoutTemplate } from './profile';

export const registerLayouts = () => {
  registerComponent(ErrorLayout);
  Handlebars.registerPartial('auth-layout', AuthLayoutTemplate);
  Handlebars.registerPartial('profile-layout', ProfileLayoutTemplate);
};
