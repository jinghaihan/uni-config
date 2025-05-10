import type { UserConfig } from '../types'
import { defineTailwindCssConfig } from './tailwindcss'

export async function defineOverridesConfig(): Promise<UserConfig[]> {
  return [
    defineTailwindCssConfig(),
  ] as UserConfig[]
}
