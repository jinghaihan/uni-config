import type { UserConfig, UserOptions } from '../types'

export async function resolveUserConfigs(options: UserOptions = {}): Promise<UserConfig[]> {
  const configs: UserConfig[] = []

  const { formatters } = options
  const {
    tailwindcss: tailwindcssConfig,
  } = formatters ?? {}

  if (tailwindcssConfig) {
    const { tailwindcss } = await import('./tailwindcss')
    configs.push(tailwindcss({
      ...tailwindcssConfig,
    }))
  }

  return configs
}
