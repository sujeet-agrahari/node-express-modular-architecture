/// <reference types="vitest" />

import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    setupFiles: ['/tests/settings/env-setup.js']
  }
});
