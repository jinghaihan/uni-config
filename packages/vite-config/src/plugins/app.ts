import type { PluginOption } from 'vite'
import type { OptionsConfig } from '../types'
import { loadCommonPlugins } from './common'
import { loadVuePlugins } from './vue'

export async function loadAppPlugins(options: OptionsConfig): Promise<PluginOption[]> {
  const { vue } = options

  const plugins: PluginOption[] = await loadCommonPlugins(options)

  if (vue) {
    plugins.push(await loadVuePlugins('app', options))
  }

  return plugins
}
