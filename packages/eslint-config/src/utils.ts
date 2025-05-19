import type { VendoredPrettierOptions } from './types'

export function mergePrettierOptions(
  options: VendoredPrettierOptions = {},
  overrides: VendoredPrettierOptions = {},
): VendoredPrettierOptions {
  return {
    ...options,
    ...overrides,
    plugins: [
      ...(overrides.plugins || []),
      ...(options.plugins || []),
    ],
  }
}
