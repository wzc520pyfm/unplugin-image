import { readFileSync } from 'node:fs'
import { extname } from 'node:path'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import svgToMiniDataURI from 'mini-svg-data-uri'
import type { Options } from './types'

const defaults = {
  dom: false,
  exclude: null,
  include: null,
}

const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function domTemplate({ dataUri }: any) {
  return `
  var img = new Image();
  img.src = "${dataUri}";
  export default img;
`
}

function constTemplate({ dataUri }: any) {
  return `
  var img = "${dataUri}";
  export default img;
`
}

function getDataUri({ format, isSvg, mime, source }: any) {
  return isSvg ? svgToMiniDataURI(source) : `data:${mime};${format},${source}`
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (rawOptions = {}) => {
  const options = Object.assign({}, defaults, rawOptions)
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'unplugin-image',
    load(id) {
      if (!filter(id))
        return null

      const mime = mimeTypes[extname(id) as keyof typeof mimeTypes]
      if (!mime) {
      // not an image
        return null
      }

      this.addWatchFile(id)
      const isSvg = mime === mimeTypes['.svg']
      const format = isSvg ? 'utf-8' : 'base64'
      const source = readFileSync(id, format).replace(/[\r\n]+/gm, '')
      const dataUri = getDataUri({ format, isSvg, mime, source })
      const code = options.dom ? domTemplate({ dataUri }) : constTemplate({ dataUri })

      return code.trim()
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
