import type { PluginOptions } from 'prettier-plugin-tailwindcss'
import type { UserConfig } from '../types'
import { PRETTIER_OPTIONS } from '../constants'
import {
  GLOB_ASTRO,
  GLOB_ASTRO_TS,
  GLOB_HTML,
  GLOB_JS,
  GLOB_JSX,
  GLOB_SVELTE,
  GLOB_TS,
  GLOB_TSX,
  GLOB_VUE,
} from '../glob'
import { mergePrettierOptions } from '../utils'

export function tailwindcss(options: PluginOptions): UserConfig {
  return {
    files: [
      GLOB_ASTRO,
      GLOB_ASTRO_TS,
      GLOB_HTML,
      GLOB_JS,
      GLOB_JSX,
      GLOB_SVELTE,
      GLOB_TS,
      GLOB_TSX,
      GLOB_VUE,
    ],
    name: 'octohash/formatter/tailwindcss',
    rules: {
      'format/prettier': [
        'error',
        mergePrettierOptions(PRETTIER_OPTIONS, {
          plugins: ['prettier-plugin-tailwindcss'],
          tailwindFunctions: ['clsx', 'cva'],
          ...options,
        }),
      ],
    },
  }
}
