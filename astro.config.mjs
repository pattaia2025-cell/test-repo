import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://test-repo-1dh.pages.dev/',
  integrations: [tailwind()],
});
