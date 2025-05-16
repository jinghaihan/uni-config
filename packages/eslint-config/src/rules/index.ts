import type { Options, UserConfig } from '../types'

export async function resolveUserConfigs(options: Options = {}): Promise<UserConfig[]> {
  const configs: UserConfig[] = []

  const { formatters } = options
  const { tailwindcss: tailwindcssConfig } = formatters ?? {}

  if (tailwindcssConfig) {
    const { tailwindcss } = await import('./tailwindcss')
    configs.push(tailwindcss({
      ...tailwindcssConfig,
    }))
  }

  return configs
}
