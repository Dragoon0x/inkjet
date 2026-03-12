// ═══════════════════════════════════════════
// INKJET — Engine + Export
// ═══════════════════════════════════════════

import type { PatternConfig, PatternResult, ExportFormat } from '../types'
import { getRenderer } from '../patterns'

let counter = 0
function uid(): string { return `inkjet-${++counter}-${Date.now().toString(36)}` }

function defaults(c: PatternConfig): Required<PatternConfig> {
  return {
    pattern: c.pattern,
    width: c.width ?? 20,
    height: c.height ?? 20,
    scale: c.scale ?? 1,
    rotation: c.rotation ?? 0,
    color: c.color ?? '#000000',
    background: c.background ?? 'none',
    strokeWidth: c.strokeWidth ?? 1,
    opacity: c.opacity ?? 1,
    density: c.density ?? 0.5,
    seed: c.seed ?? 42,
  }
}

/**
 * Generate a pattern result from config.
 */
export function generate(config: PatternConfig): PatternResult {
  const c = defaults(config)
  const renderer = getRenderer(c.pattern)
  if (!renderer) throw new Error(`Unknown pattern: "${c.pattern}". Use getAllPatternNames() to see available patterns.`)

  const tw = c.width * c.scale
  const th = c.height * c.scale
  const id = uid()

  const innerSvg = renderer(c, c.width, c.height)
  const transform = c.rotation !== 0 ? ` patternTransform="rotate(${c.rotation})"` : ''
  const bg = c.background !== 'none' ? `<rect width="${c.width}" height="${c.height}" fill="${c.background}"/>` : ''

  const patternElement = `<pattern id="${id}" width="${tw}" height="${th}" patternUnits="userSpaceOnUse"${transform}><g transform="scale(${c.scale})">${bg}${innerSvg}</g></pattern>`

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${patternElement}</defs><rect width="100%" height="100%" fill="url(#${id})"/></svg>`

  return { svg, patternElement, id, tileWidth: tw, tileHeight: th }
}

/**
 * Export pattern in different formats.
 */
export function exportPattern(config: PatternConfig, format: ExportFormat): string {
  const result = generate(config)

  switch (format) {
    case 'svg':
      return result.svg

    case 'css': {
      const encoded = encodeURIComponent(result.svg).replace(/'/g, '%27').replace(/"/g, '%22')
      return `background-image: url("data:image/svg+xml,${encoded}");\nbackground-repeat: repeat;\nbackground-size: ${result.tileWidth}px ${result.tileHeight}px;`
    }

    case 'datauri': {
      const encoded = encodeURIComponent(result.svg).replace(/'/g, '%27').replace(/"/g, '%22')
      return `data:image/svg+xml,${encoded}`
    }

    case 'react': {
      const c = defaults(config)
      return `import React from 'react'\n\nexport function Pattern({ style, className }) {\n  return (\n    <div\n      className={className}\n      style={{\n        backgroundImage: \`url("data:image/svg+xml,${encodeURIComponent(result.svg).replace(/'/g, '%27').replace(/"/g, '%22')}")\`,\n        backgroundRepeat: 'repeat',\n        backgroundSize: '${result.tileWidth}px ${result.tileHeight}px',\n        ...style,\n      }}\n    />\n  )\n}\n\n// Pattern: ${c.pattern}, ${result.tileWidth}x${result.tileHeight}, color: ${c.color}`
    }

    case 'figma': {
      const c = defaults(config)
      return JSON.stringify({
        type: 'svg-pattern',
        name: c.pattern,
        svg: result.svg,
        tileWidth: result.tileWidth,
        tileHeight: result.tileHeight,
        color: c.color,
        background: c.background,
      }, null, 2)
    }

    case 'tailwind': {
      const encoded = encodeURIComponent(result.svg).replace(/'/g, '%27').replace(/"/g, '%22')
      return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      backgroundImage: {\n        '${config.pattern}': \`url("data:image/svg+xml,${encoded}")\`,\n      },\n    },\n  },\n}`
    }

    default:
      return result.svg
  }
}

/**
 * Generate CSS background-image value only.
 */
export function toCSS(config: PatternConfig): string {
  const result = generate(config)
  const encoded = encodeURIComponent(result.svg).replace(/'/g, '%27').replace(/"/g, '%22')
  return `url("data:image/svg+xml,${encoded}")`
}

/**
 * Apply pattern as background to a DOM element.
 */
export function applyTo(element: HTMLElement, config: PatternConfig): void {
  const result = generate(config)
  const encoded = encodeURIComponent(result.svg).replace(/'/g, '%27').replace(/"/g, '%22')
  element.style.backgroundImage = `url("data:image/svg+xml,${encoded}")`
  element.style.backgroundRepeat = 'repeat'
  element.style.backgroundSize = `${result.tileWidth}px ${result.tileHeight}px`
}

/**
 * Compose multiple patterns into one SVG.
 */
export function compose(configs: PatternConfig[]): string {
  const defs: string[] = []
  const rects: string[] = []

  for (const config of configs) {
    const result = generate(config)
    defs.push(result.patternElement)
    rects.push(`<rect width="100%" height="100%" fill="url(#${result.id})"/>`)
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${defs.join('')}</defs>${rects.join('')}</svg>`
}
