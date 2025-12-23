import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
    globals: true
  },
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      $env: path.resolve('./src/env-mock')
    }
  }
})
