import type { OptionsFormatters } from '@antfu/eslint-config'

export const VENDORED_PRETTIER_OPTIONS: OptionsFormatters['prettierOptions'] = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'auto',
}
