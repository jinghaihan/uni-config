import type { LinterConfig, Options, UserConfig } from './types'
import antfu from '@antfu/eslint-config'
import { resolveUserConfigs } from './rules'
import { baseOptions } from './rules/base'

export async function defineConfig(options: Options, ...userConfigs: UserConfig[]): Promise<LinterConfig> {
  const resolvedOptions = {
    ...baseOptions,
    ...options,
  }

  const configs = await resolveUserConfigs(resolvedOptions)

  return antfu(
    resolvedOptions,
    ...configs,
    ...userConfigs,
  )
}

export default defineConfig

export { tailwindcss } from './rules/tailwindcss'
