import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssImport(),
        postcssNested(),
      ],
    },
  },
});
