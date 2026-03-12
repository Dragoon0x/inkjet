// ═══════════════════════════════════════════
// INKJET — Types
// ═══════════════════════════════════════════

export type PatternCategory =
  | 'dots' | 'lines' | 'grid' | 'geometric' | 'organic'
  | 'texture' | 'technical' | 'artistic' | 'wave' | 'noise'
  | 'cultural' | 'typography'
  | 'textile' | 'fashion' | 'architectural' | 'islamic' | 'modern'
  | 'decorative' | 'nature-ext' | 'check' | 'stripe' | 'floral'
  | 'retro' | 'abstract'

export interface PatternConfig {
  /** Pattern name */
  pattern: string
  /** Tile width. Default: 20 */
  width?: number
  /** Tile height. Default: 20 */
  height?: number
  /** Scale multiplier. Default: 1 */
  scale?: number
  /** Rotation in degrees. Default: 0 */
  rotation?: number
  /** Primary color. Default: '#000000' */
  color?: string
  /** Secondary color. Default: 'none' (transparent) */
  background?: string
  /** Stroke width. Default: 1 */
  strokeWidth?: number
  /** Opacity 0-1. Default: 1 */
  opacity?: number
  /** Density 0-1 (pattern-specific). Default: 0.5 */
  density?: number
  /** Random seed for reproducible patterns */
  seed?: number
}

export interface PatternResult {
  /** Full SVG string */
  svg: string
  /** Just the <pattern> element */
  patternElement: string
  /** Pattern ID */
  id: string
  /** Tile dimensions after scale */
  tileWidth: number
  tileHeight: number
}

export type ExportFormat = 'svg' | 'css' | 'datauri' | 'react' | 'figma' | 'tailwind'

export interface PatternMeta {
  name: string
  category: PatternCategory
  description: string
  tags: string[]
}

export const CATEGORIES: PatternCategory[] = [
  'dots', 'lines', 'grid', 'geometric', 'organic',
  'texture', 'technical', 'artistic', 'wave', 'noise',
  'cultural', 'typography', 'textile', 'fashion', 'architectural',
  'islamic', 'modern', 'decorative', 'nature-ext', 'check',
  'stripe', 'floral', 'retro', 'abstract',
]
