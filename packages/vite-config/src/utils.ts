import type { PackageJson } from 'pkg-types'
import type { PluginOption } from 'vite'
import type { ConditionPlugin, OptionsConfig, ProjectType, ResolvedOptions } from './types'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import deepmerge from 'deepmerge'
import { findUp } from 'find-up'
import { isPackageExists } from 'local-pkg'
import { readPackageJSON } from 'pkg-types'

export function getProjectType(): ProjectType {
  const htmlPath = join(process.cwd(), 'index.html')
  return existsSync(htmlPath) ? 'app' : 'lib'
}

export async function loadMergedPackageJson(): Promise<PackageJson> {
  const root = process.cwd()

  const rootPkgJsonPath = await findUp('pnpm-lock.yaml', {
    cwd: root,
    type: 'file',
  })
  const rootPkgJson = rootPkgJsonPath ? await readPackageJSON(rootPkgJsonPath) : {}
  const pkgJson = await readPackageJSON(root)

  return deepmerge(rootPkgJson, pkgJson)
}

export function extractAuthorInfo(pkgJson: PackageJson) {
  const { author } = pkgJson

  const isObject = typeof author === 'object'
  const name = isObject ? author.name : author
  const email = isObject ? author.email : undefined
  const url = isObject ? author.url : undefined

  return {
    name,
    email,
    url,
  }
}

const scopeUrl = fileURLToPath(new URL('.', import.meta.url))
const isCwdInScope = isPackageExists('@octohash/vite-config')

export async function loadConditionPlugins(conditionPlugins: ConditionPlugin[]): Promise<PluginOption[]> {
  const plugins: PluginOption[] = []
  for (const conditionPlugin of conditionPlugins) {
    if (conditionPlugin.condition) {
      const realPlugins = await conditionPlugin.plugins()
      plugins.push(...realPlugins)
    }
  }
  return plugins.flat()
}

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean'
    ? {} as any
    : options[key] || {} as any
}

export function isPackageInScope(name: string): boolean {
  return isPackageExists(name, { paths: [scopeUrl] })
}

export async function ensurePackages(packages: (string | undefined)[]): Promise<void> {
  if (process.env.CI || process.stdout.isTTY === false || isCwdInScope === false)
    return

  const nonExistingPackages = packages.filter(i => i && !isPackageInScope(i)) as string[]
  if (nonExistingPackages.length === 0)
    return

  const p = await import('@clack/prompts')
  const result = await p.confirm({
    message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
  })
  if (result)
    await import('@antfu/install-pkg').then(i => i.installPackage(nonExistingPackages, { dev: true }))
}
