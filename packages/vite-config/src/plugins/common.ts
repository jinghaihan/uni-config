import type { PluginOption } from 'vite'
import type { OptionsConfig } from '../types'
import { visualizer as Visualizer } from 'rollup-plugin-visualizer'
import Dts from 'vite-plugin-dts'
import { loadConditionPlugins } from '../utils'

export async function loadCommonPlugins(options: OptionsConfig): Promise<PluginOption[]> {
  const {
    isBuild,
    visualizer = false,
    dts = options.type === 'lib',
  } = options

  return await loadConditionPlugins([
    {
      condition: isBuild && !!visualizer,
      plugins: () => [
        Visualizer(
          typeof visualizer === 'boolean'
            ? {
                filename: './node_modules/.cache/visualizer/stats.html',
                gzipSize: true,
                open: true,
              }
            : visualizer,
        ),
      ],
    },
    {
      condition: isBuild && !!dts,
      plugins: () => [
        Dts(
          typeof dts === 'boolean'
            ? {
                logLevel: 'error',
              }
            : dts,
        ),
      ],
    },
  ])
}
