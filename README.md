# unplugin-image

[![NPM version](https://img.shields.io/npm/v/unplugin-image?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-image)

🍣 A universal bundler plugin which imports JPG, PNG, GIF, SVG, and WebP files.

## Install

```bash
npm i -D unplugin-image
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginImage from 'unplugin-image/vite'

export default defineConfig({
  plugins: [
    {
      ...UnpluginImage({ /* options */ }),
      enforce: 'pre',
    },
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnpluginImage from 'unplugin-image/rollup'

export default {
  plugins: [
    UnpluginImage({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-image/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-image/nuxt', { /* options */ }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-image/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import UnpluginImage from 'unplugin-image/esbuild'

build({
  plugins: [UnpluginImage()],
})
```

<br></details>

## Usage

### Options

For all options please refer to [docs](https://github.com/rollup/plugins/tree/master/packages/image#options).

This plugin accepts all [@rollup/plugin-image](https://github.com/rollup/plugins/tree/master/packages/image#options) options.
