import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

export type AntfuOptions = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>

export type UserConfig = Awaitable<TypedFlatConfigItem | FlatConfigComposer<any, any> | Linter.Config[]>

export type LinterConfig = FlatConfigComposer<TypedFlatConfigItem, ConfigNames>
