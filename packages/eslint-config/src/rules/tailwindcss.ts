import type { PluginOptions } from 'prettier-plugin-tailwindcss'
import type { UserConfig } from '../types'
import { VENDORED_PRETTIER_OPTIONS } from '../constants'

export function tailwindcss(options: PluginOptions): UserConfig {
  return {
    files: ['**/*.{vue,js,ts,jsx,tsx,svelte,astro,html}'],
    name: 'octohash/formatter/tailwindcss',
    rules: {
      'format/prettier': [
        'error',
        {
          plugins: ['prettier-plugin-tailwindcss'],
          tailwindFunctions: ['clsx', 'cva'],
          ...VENDORED_PRETTIER_OPTIONS,
          ...options,
        },
      ],
    },
  }
}
