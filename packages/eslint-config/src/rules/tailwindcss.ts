import type { UserConfig } from '../types'
import { installPackage } from '@antfu/install-pkg'
import { getPackageInfoSync, isPackageExists } from 'local-pkg'
import semver from 'semver'

export async function defineTailwindCssConfig(): Promise<UserConfig | undefined> {
  const tailwindcssPkg = getPackageInfoSync('tailwindcss')
  const tailwindcssVersion = semver.coerce(tailwindcssPkg?.version)?.version

  if (tailwindcssVersion) {
    const majorVersion = semver.major(tailwindcssVersion)
    if (majorVersion === 3) {
      return defineTailwindCssV3Config()
    }
  }
}

async function defineTailwindCssV3Config(): Promise<UserConfig> {
  try {
    if (!isPackageExists('eslint-plugin-tailwindcss'))
      await installPackage('eslint-plugin-tailwindcss', { dev: true })

    const tailwindcss = await import('eslint-plugin-tailwindcss')
    return [
      ...tailwindcss.default.configs['flat/recommended'],
      {
        rules: {
          'tailwindcss/no-custom-classname': 'off',
        },
      },
    ]
  }
  catch (error) {
    console.error(error)
    return []
  }
}
