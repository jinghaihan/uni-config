import type { PluginOption } from 'vite'
import type { OptionsConfig, ProjectType } from '../types'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { ensurePackages, loadConditionPlugins, resolveSubOptions } from '../utils'

export async function loadVuePlugins(projectType: ProjectType, options: OptionsConfig): Promise<PluginOption[]> {
  const { isBuild } = options
  const isApp = projectType === 'app'
  const {
    devtools = false,
    i18n = false,
    autoImport = true,
    autoComponent = true,
    autoRouter = true,
  } = resolveSubOptions(options, 'vue')

  await ensurePackages([
    devtools ? 'vite-plugin-vue-devtools' : undefined,
    i18n ? '@intlify/unplugin-vue-i18n' : undefined,
    autoImport ? 'unplugin-auto-import' : undefined,
    autoComponent ? 'unplugin-vue-components' : undefined,
    autoRouter ? 'unplugin-vue-router' : undefined,
  ])

  return loadConditionPlugins([
    {
      condition: true,
      plugins: () => [
        Vue(),
        VueJsx(),
      ],
    },
    {
      condition: !isBuild && !!devtools,
      plugins: async () => {
        const module = await import('vite-plugin-vue-devtools')
        return [
          module.default(
            typeof devtools === 'boolean'
              ? undefined
              : devtools,
          ),
        ]
      },
    },
    {
      condition: !!i18n,
      plugins: async () => {
        const module = await import('@intlify/unplugin-vue-i18n/vite')
        return [
          module.default(
            typeof i18n === 'boolean'
              ? {
                  compositionOnly: true,
                  fullInstall: true,
                  runtimeOnly: true,
                }
              : i18n,
          ),
        ]
      },
    },
    {
      condition: isApp && !!autoImport,
      plugins: async () => {
        const module = await import('unplugin-auto-import/vite')
        return [
          module.default(
            typeof autoImport === 'boolean'
              ? {
                  imports: [
                    'vue',
                    'vue-i18n',
                    '@vueuse/core',
                  ],
                  dts: 'src/typings/auto-imports.d.ts',
                  dirs: [
                    'src/composables',
                    'src/utils',
                  ],
                  vueTemplate: true,
                }
              : autoImport,
          ),
        ]
      },
    },
    {
      condition: isApp && !!autoComponent,
      plugins: async () => {
        const module = await import('unplugin-vue-components/vite')
        return [
          module.default(
            typeof autoComponent === 'boolean'
              ? {
                  deep: false,
                  dts: 'src/typings/components.d.ts',
                }
              : autoComponent,
          ),
        ]
      },
    },
    {
      condition: isApp && !!autoRouter,
      plugins: async () => {
        const module = await import('unplugin-vue-router/vite')
        return [
          module.default(
            typeof autoRouter === 'boolean'
              ? {
                  dts: 'src/typings/typed-router.d.ts',
                }
              : autoRouter,
          ),
        ]
      },
    },
  ])
}
