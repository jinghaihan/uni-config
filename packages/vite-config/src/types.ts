import type { PluginOptions as VueI18nPluginOptions } from '@intlify/unplugin-vue-i18n'
import type { VitePluginFederationOptions as FederationPluginOptions } from '@originjs/vite-plugin-federation'
import type { PluginVisualizerOptions as VisualizerPluginOptions } from 'rollup-plugin-visualizer'
import type { Options as VueImportsPluginOptions } from 'unplugin-auto-import/types'
import type { Options as VueComponentsPluginOptions } from 'unplugin-vue-components'
import type { Options as VuePagesPluginOptions } from 'unplugin-vue-router'
import type { AliasOptions, PluginOption, UserConfig } from 'vite'
import type { PluginOptions as DtsPluginOptions } from 'vite-plugin-dts'
import type { VitePluginVueDevToolsOptions as VueDevtoolsPluginOptions } from 'vite-plugin-vue-devtools'
import type { AppLoadingPluginOptions } from './plugins/app-loading'
import type { ImportMapPluginOptions } from './plugins/import-map'
import type { LicensePluginOptions } from './plugins/license'
import type { MetadataPluginOptions } from './plugins/metadata'

export type ProjectType = 'app' | 'lib'

export interface CommonPluginOptions {
  visualizer?: boolean | VisualizerPluginOptions
  license?: boolean | LicensePluginOptions
  federation?: FederationPluginOptions
}

export interface AppPluginOptions {
  dynamicBase?: string
  appLoading?: boolean | AppLoadingPluginOptions
  metadata?: boolean | MetadataPluginOptions
  importMap?: boolean | ImportMapPluginOptions
}

export interface LibPluginOptions {
  dts?: boolean | DtsPluginOptions
}

export interface OptionsVue {
  devtools?: boolean | VueDevtoolsPluginOptions
  i18n?: boolean | VueI18nPluginOptions
  imports?: boolean | VueImportsPluginOptions
  components?: boolean | VueComponentsPluginOptions
  pages?: boolean | VuePagesPluginOptions
}

export interface OptionsConfig extends CommonPluginOptions, AppPluginOptions, LibPluginOptions {
  isBuild?: boolean
  /**
   * Type of the project.
   *
   * @default auto-detect based on the `index.html` file
   */
  type?: ProjectType
  alias?: AliasOptions
  /**
   * Enable Vue support.
   *
   * @default auto-detect based on the dependencies
   */
  vue?: boolean | OptionsVue
  vite?: UserConfig
}

export interface ConditionPlugin {
  condition?: boolean
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>
}

export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>
