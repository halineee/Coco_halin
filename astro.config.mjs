// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

// Adresse publique du site (GitHub Pages).
// Si vous utilisez un jour un nom de domaine personnalisé, remplacez `site`
// par ce domaine et mettez `base` à '/'.
export default defineConfig({
  site: 'https://halineee.github.io',
  base: '/Coco_halin',
  trailingSlash: 'always',
  vite: {
    plugins: [yaml()],
  },
});
