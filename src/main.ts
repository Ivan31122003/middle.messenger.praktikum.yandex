import { registerLayouts } from './layouts';
import { renderRoute, registerHelpers } from './core';
import { registerBlocks } from './pages/blocks';
import { registerComponents } from '@/components';
import '@/styles/index.scss';

const main = async () => {
  registerHelpers();
  registerComponents();
  registerBlocks();
  registerLayouts();
  await renderRoute();
};

main();
