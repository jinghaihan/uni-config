import type {
  Awaitable,
  ConfigNames,
  OptionsConfig,
  OptionsFormatters,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import type { PluginOptions as TailwindCssPluginOptions } from 'prettier-plugin-tailwindcss'

export type AntfuOptions = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>

export type UserOptions = AntfuOptions & {
  formatters?: OptionsConfig['formatters'] & {
    tailwindcss?: TailwindCssPluginOptions
  }
}

export type UserConfig = Awaitable<TypedFlatConfigItem | FlatConfigComposer<any, any> | Linter.Config[]>

export type LinterConfig = FlatConfigComposer<TypedFlatConfigItem, ConfigNames>

export type VendoredPrettierOptions = OptionsFormatters['prettierOptions']
