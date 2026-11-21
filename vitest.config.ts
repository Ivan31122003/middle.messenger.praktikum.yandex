import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      environmentOptions: { jsdom: { url: 'http://localhost/' } },
      clearMocks: true,
      restoreMocks: true,
      unstubGlobals: true,
      include: ['src/**/*.test.ts'],
    },
  }),
);
