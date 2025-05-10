import type { AntfuOptions, LinterConfig, UserConfig } from './types'
import antfu from '@antfu/eslint-config'
import { antfuOptions } from './rules/antfu'
import { defineOverridesConfig } from './rules/overrides'

export async function defineConfig(options: AntfuOptions, ...userConfigs: UserConfig[]): Promise<LinterConfig> {
  const configs = await defineOverridesConfig()

  return antfu(
    {
      ...antfuOptions,
      ...options,
    },
    ...configs,
    ...userConfigs,
  )
}

export default defineConfig
