import { defineConfig } from 'tsup'
import { optionalDependencies } from './package.json'

export default defineConfig({
  entry: ['src/index.ts'],
  shims: true,
  format: ['esm'],
  external: Object.keys(optionalDependencies),
})
