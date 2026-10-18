import { PrButton } from './pr-button';
import { PrInput } from './pr-input';
import { PrAvatar } from './pr-avatar';
import { registerComponent } from '@/core';

export const registerComponents = () => {
  registerComponent(PrButton);
  registerComponent(PrInput);
  registerComponent(PrAvatar);
};
