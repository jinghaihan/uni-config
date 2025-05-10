import type { PluginOptions as VueI18nOptions } from '@intlify/unplugin-vue-i18n'
import type { PluginVisualizerOptions as VisualizerOptions } from 'rollup-plugin-visualizer'
import type { Options as VueAutoImportOptions } from 'unplugin-auto-import/types'
import type { Options as VueAutoComponentOptions } from 'unplugin-vue-components'
import type { Options as VueAutoRouterOptions } from 'unplugin-vue-router'
import type { PluginOption, UserConfig } from 'vite'
import type { PluginOptions as DtsOptions } from 'vite-plugin-dts'
import type { VitePluginVueDevToolsOptions as VueDevtoolsOptions } from 'vite-plugin-vue-devtools'

export type ProjectType = 'app' | 'lib'

export interface CommonPluginOptions {
  visualizer?: boolean | VisualizerOptions
  dts?: boolean | DtsOptions
}

export interface OptionsVue {
  devtools?: boolean | VueDevtoolsOptions
  i18n?: boolean | VueI18nOptions
  autoImport?: boolean | VueAutoImportOptions
  autoComponent?: boolean | VueAutoComponentOptions
  autoRouter?: boolean | VueAutoRouterOptions
}

export interface OptionsConfig extends CommonPluginOptions {
  /**
   * Type of the project.
   *
   * @default auto-detect based on the `index.html` file
   */
  type?: ProjectType
  /**
   * Enable Vue support.
   *
   * @default auto-detect based on the dependencies
   */
  vue?: boolean | OptionsVue
  isBuild?: boolean
  overrides?: UserConfig
}

export interface ConditionPlugin {
  condition?: boolean
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>
}

export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>
