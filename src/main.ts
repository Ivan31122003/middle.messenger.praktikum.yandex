import { registerLayouts } from './layouts';
import { registerHelpers } from './core';
import { registerBlocks } from './pages/blocks';
import { registerComponents } from '@/components';
import { router } from '@/core/navigation';
import {
  LoginPage,
  RegPage,
  MessengerPage,
  ProfileInfoPage,
  ProfileChangeDataPage,
  ProfileChangePasswordPage,
  Error404Page,
  Error5xxPage,
} from '@/pages';
import '@/styles/index.scss';

const main = async () => {
  registerHelpers();
  registerComponents();
  registerBlocks();
  registerLayouts();
  router
    .use('/', LoginPage)
    .use('/sign-up', RegPage)
    .use('/messenger', MessengerPage)
    .use('/settings', ProfileInfoPage)
    .use('/settings-change-data', ProfileChangeDataPage)
    .use('/settings-change-password', ProfileChangePasswordPage)
    .use('/404', Error404Page)
    .use('/500', Error5xxPage);
  router.start();
};

main();
