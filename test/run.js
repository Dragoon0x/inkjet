var ij = require('../dist/index.js')
var passed = 0, failed = 0
function assert(c, m) { if (c) { passed++; console.log('  ✓ ' + m) } else { failed++; console.error('  ✗ ' + m) } }
function assertEq(a, b, m) { assert(a === b, m + ' (got: ' + a + ')') }

console.log('\n  Exports')
assert(typeof ij.generate === 'function', 'generate')
assert(typeof ij.exportPattern === 'function', 'exportPattern')
assert(typeof ij.toCSS === 'function', 'toCSS')
assert(typeof ij.applyTo === 'function', 'applyTo')
assert(typeof ij.compose === 'function', 'compose')
assert(typeof ij.getAllPatternNames === 'function', 'getAllPatternNames')
assert(typeof ij.getPatternsByCategory === 'function', 'getPatternsByCategory')
assert(typeof ij.getMeta === 'function', 'getMeta')
assert(typeof ij.getAllMeta === 'function', 'getAllMeta')
assert(Array.isArray(ij.CATEGORIES), 'CATEGORIES')

console.log('\n  Patterns')
var names = ij.getAllPatternNames()
assertEq(names.length, 500, '200 patterns')
assertEq(ij.CATEGORIES.length, 24, '12 categories')

// Every category has patterns
ij.CATEGORIES.forEach(function(cat) {
  var ps = ij.getPatternsByCategory(cat)
  assert(ps.length > 0, cat + ' has ' + ps.length + ' patterns')
})

console.log('\n  Generate all 200')
var errors = []
names.forEach(function(name) {
  try {
    var result = ij.generate({ pattern: name })
    if (!result.svg.includes('<svg')) errors.push(name + ': no <svg')
    if (!result.patternElement.includes('<pattern')) errors.push(name + ': no <pattern')
    if (!result.id) errors.push(name + ': no id')
  } catch (e) { errors.push(name + ': ' + e.message) }
})
assert(errors.length === 0, 'All 500 generate without error' + (errors.length ? ' FAILED: ' + errors.slice(0, 5).join(', ') : ''))

console.log('\n  Config')
var r1 = ij.generate({ pattern: 'dots', color: '#ff0000', scale: 2, density: 0.8 })
assert(r1.svg.includes('#ff0000'), 'Color applied')
assert(r1.tileWidth === 40, 'Scale 2x width')

var r2 = ij.generate({ pattern: 'crosshatch', rotation: 45 })
assert(r2.patternElement.includes('rotate(45)'), 'Rotation applied')

var r3 = ij.generate({ pattern: 'stipple', seed: 123 })
var r4 = ij.generate({ pattern: 'stipple', seed: 123 })
var strip = function(s) { return s.replace(/inkjet-\d+-\w+/g, 'ID') }
assertEq(strip(r3.svg), strip(r4.svg), 'Seeded random is reproducible')

var r5 = ij.generate({ pattern: 'stipple', seed: 456 })
assert(strip(r5.svg) !== strip(r3.svg), 'Different seed = different output')

console.log('\n  Export formats')
var css = ij.exportPattern({ pattern: 'dots' }, 'css')
assert(css.includes('background-image'), 'CSS export has background-image')
assert(css.includes('background-repeat'), 'CSS export has repeat')

var uri = ij.exportPattern({ pattern: 'dots' }, 'datauri')
assert(uri.startsWith('data:image/svg+xml'), 'Data URI starts correctly')

var react = ij.exportPattern({ pattern: 'dots' }, 'react')
assert(react.includes('import React'), 'React export has import')
assert(react.includes('backgroundImage'), 'React export has backgroundImage')

var figma = ij.exportPattern({ pattern: 'dots' }, 'figma')
var parsed = JSON.parse(figma)
assert(parsed.type === 'svg-pattern', 'Figma export has type')
assert(parsed.name === 'dots', 'Figma export has name')

var tw = ij.exportPattern({ pattern: 'dots' }, 'tailwind')
assert(tw.includes('module.exports'), 'Tailwind export has module.exports')
assert(tw.includes('backgroundImage'), 'Tailwind export has backgroundImage')

console.log('\n  toCSS')
var cssVal = ij.toCSS({ pattern: 'crosshatch' })
assert(cssVal.startsWith('url('), 'toCSS returns url()')

console.log('\n  compose')
var composed = ij.compose([
  { pattern: 'dots', color: '#000', opacity: 0.3 },
  { pattern: 'lines-diagonal', color: '#999', opacity: 0.2 },
])
assert(composed.includes('<svg'), 'Compose returns SVG')
assert((composed.match(/<pattern/g) || []).length === 2, 'Compose has 2 patterns')
assert((composed.match(/<rect/g) || []).length >= 2, 'Compose has 2+ rects')

console.log('\n  Meta')
var meta = ij.getMeta('halftone')
assert(meta !== null, 'getMeta returns meta')
assertEq(meta.category, 'dots', 'Halftone is in dots category')
assert(Array.isArray(meta.tags), 'Meta has tags')
assert(meta.tags.length > 0, 'Meta has at least one tag')

var allMeta = ij.getAllMeta()
assertEq(Object.keys(allMeta).length, 500, 'getAllMeta has 200 entries')

console.log('\n  Error handling')
try { ij.generate({ pattern: 'nonexistent' }); assert(false, 'Should throw for unknown pattern') }
catch (e) { assert(e.message.includes('Unknown pattern'), 'Throws for unknown pattern') }

console.log('\n  ' + passed + ' passed, ' + failed + ' failed\n')
process.exit(failed > 0 ? 1 : 0)
