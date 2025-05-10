import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/postcss.ts',
  ],
  shims: true,
  format: ['esm'],
})
