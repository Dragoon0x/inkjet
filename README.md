# inkjet

Generative SVG patterns. 500 parametric patterns across 24 categories. Export as SVG, CSS, data URI, React, Figma-ready, or Tailwind. Zero dependencies.

```
npm install useinkjet
```

## One function

```js
import { generate } from 'useinkjet'

const { svg } = generate({ pattern: 'crosshatch', color: '#333', scale: 1.5 })
```

## 500 Patterns in 24 Categories

**Dots (20):** dots, halftone, stipple, confetti, polka, bubbles, rings, and more
**Lines (20):** crosshatch, herringbone, chevron, zigzag, wavy, scallop, hatching, contour
**Grid (18):** isometric, hex-grid, blueprint, brick, basket-weave, plaid, parquet, subway
**Geometric (20):** hexagons, penrose, sierpinski, flower-of-life, meander, cube, stars
**Organic (18):** wood-grain, marble, coral, scales, feathers, snowflake, terrain, clouds
**Texture (16):** canvas, linen, denim, leather, carbon-fiber, terrazzo, film-grain, stucco
**Technical (18):** circuit, microchip, schematic, barcode, qr-dots, gear, waveform
**Artistic (16):** watercolor, ink-splatter, charcoal, woodcut, art-deco, bauhaus, pop-art
**Wave (16):** sine, sawtooth, square-wave, ocean, ripple, pulse, interference
**Noise (16):** perlin, simplex, voronoi, fractal, turbulence, plasma, dither, galaxy
**Cultural (12):** sashiko, seigaiha, asanoha, moroccan, celtic-knot, greek-key, aztec, paisley
**Typography (10):** hash, asterisk, brackets, slashes, ampersand, tilde
**Textile (22):** argyle, houndstooth, gingham, buffalo-check, tweed, corduroy, cable-knit, fair-isle
**Fashion (20):** leopard, zebra, snake, crocodile, peacock, lace, fishnet
**Architectural (22):** gothic-arch, tracery, rose-window, crenellation, torii, dome, pagoda
**Islamic (17):** star-8fold, star-12fold, girih, mashrabiya, zellige-star, arabesque, muqarnas
**Modern (25):** memphis, glitch, pixel-art, low-poly, vaporwave, moire, op-art, de-stijl
**Decorative (25):** quatrefoil, ogee, trellis, guilloche, scrollwork, medallion, fleur-de-lis
**Nature Extended (23):** fibonacci, phyllotaxis, nautilus, fern, lightning, constellation, aurora
**Check (20):** checkerboard, glen-plaid, shepherd, madras, tartan, harlequin, tatami
**Stripe (25):** candy-stripe, barber-pole, shadow-stripe, satin, regimental, breton, racing
**Floral (35):** daisy, rose, cherry-blossom, lotus, sunflower, monstera, lavender, ivy, ditsy
**Retro (35):** 8bit-heart, vinyl-grooves, flower-power, space-invader, starburst, neon-sign
**Abstract (31):** blob, flow-field, lissajous, spirograph, strange-attractor, geodesic

## 6 Export Formats

```js
import { exportPattern } from 'useinkjet'

exportPattern({ pattern: 'halftone' }, 'svg')      // Full SVG
exportPattern({ pattern: 'halftone' }, 'css')      // CSS background-image
exportPattern({ pattern: 'halftone' }, 'datauri')  // Data URI
exportPattern({ pattern: 'halftone' }, 'react')    // React component
exportPattern({ pattern: 'halftone' }, 'figma')    // Figma JSON
exportPattern({ pattern: 'halftone' }, 'tailwind') // Tailwind config
```

## Parameters

Every pattern accepts: `color`, `background`, `scale`, `rotation`, `strokeWidth`, `opacity`, `density`, `seed`.

## Compose

```js
import { compose } from 'useinkjet'

const svg = compose([
  { pattern: 'dots', color: '#000', opacity: 0.3 },
  { pattern: 'lines-diagonal', color: '#999', opacity: 0.15 },
])
```

## Apply to DOM

```js
import { applyTo } from 'useinkjet'

applyTo(document.querySelector('.hero'), {
  pattern: 'circuit',
  color: '#3b82f6',
  opacity: 0.08,
  scale: 1.5,
})
```

## Disclaimer

Experimental software. DYOR.

## License

MIT. Built by [0xDragoon](https://github.com/dragoon0x).
