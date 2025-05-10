# eslint-config

[![npm version][npm-version-src]][npm-version-href]
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

> [!NOTE]
> A shareable ESLint config based on [@antfu/eslint-config](https://github.com/antfu/eslint-config), customized with personal preferences and built-in automatic [Tailwind CSS v3](https://github.com/francoismassart/eslint-plugin-tailwindcss) rule detection.

## Features

- **Tailwind CSS Support**:
  - Automatically detects Tailwind CSS v3 and enables recommended Tailwind rules
  - Disables `no-custom-classname` rule

## Usage

```ts
import { defineConfig } from '@octohash/eslint-config'

export default defineConfig(
  {
    // Configures for antfu's config
  },
  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    rules: {}
  }
)
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@octohash/eslint-config?style=flat&colorA=080f12&colorB=1fa669
