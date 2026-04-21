# Design Brief

## Direction

**Cold Pressed Oils — Premium Artisanal Storefront** — Celebrating purity, tradition, and the natural golden richness of cold-pressed oils. Every color choice is rooted in the physical world of oil extraction: gleaming amber oil, raw cotton seeds, weathered wooden presses, and fresh botanical leaves.

## Tone

Pure, golden, and natural — a premium feel grounded in authenticity. Spacious warm cream backgrounds evoke linen and unbleached cloth. The golden amber primary pulses with the rich color of freshly pressed sesame and sunflower oil. Botanical green accents breathe freshness and trust into the palette.

## Differentiation

Rich golden amber primary (the literal color of cold-pressed oil) replacing generic earth tones creates an immediately recognizable identity. Paired with botanical green and warm oil-seed brown foreground, the palette is unmistakably about pure, natural oil — not generic warm commerce.

## Color Palette

| Token       | OKLCH           | Role                                              |
|-------------|-----------------|---------------------------------------------------|
| background  | 0.97 0.012 85   | Warm off-white linen/raw cotton page background   |
| foreground  | 0.14 0.02 55    | Rich dark brown — pressed oil seed, high contrast |
| card        | 0.99 0.006 80   | Pure warm white — clean premium product cards     |
| primary     | 0.60 0.16 78    | Rich golden amber — color of cold-pressed oil     |
| secondary   | 0.94 0.018 80   | Warm light amber-cream — subtle surface tone      |
| muted       | 0.94 0.018 80   | Same warm amber-cream for muted UI areas          |
| accent      | 0.60 0.10 138   | Fresh botanical green — oil plant leaves, purity  |
| destructive | 0.55 0.22 25    | Red for delete/cancel actions                     |
| border      | 0.90 0.012 80   | Subtle warm gold-tinted border                    |
| sidebar     | 0.96 0.015 82   | Slightly warmer cream than background             |

## Dark Mode Palette

| Token       | OKLCH           | Role                                              |
|-------------|-----------------|---------------------------------------------------|
| background  | 0.14 0.02 65    | Deep warm dark brown — aged pressed oil wood      |
| foreground  | 0.95 0.01 80    | Warm cream text                                   |
| card        | 0.20 0.02 65    | Slightly lighter warm dark wood for cards         |
| primary     | 0.72 0.16 80    | Bright golden amber — luminous against dark wood  |
| accent      | 0.75 0.12 140   | Bright leaf green — vivid on dark backgrounds     |
| border      | 0.30 0.015 65   | Dark warm wood-grain border                       |

## Chart Colors

Golden amber → botanical green → warm brown → honey gold → deep amber. All values stay in the warm oil/nature hue family for cohesion.

## Typography

- Display: Fraunces — classical serif for heritage, product names, category headers
- Body: Lora — warm organic serif for descriptions and interface text
- Mono: Geist Mono — order IDs, pricing, SKUs
- Scale: hero `text-5xl md:text-6xl font-bold`, h2 `text-3xl md:text-4xl font-bold`, label `text-sm font-semibold`, body `text-base leading-relaxed`

## Gradient Utilities

- `gradient-golden` — golden amber (0.60 0.16 78) → honey gold (0.75 0.14 88): for hero CTAs and premium accents
- `gradient-earthy` — primary → accent (amber → botanical green): for nature-forward sections
- `gradient-warm` — legacy alias for gradient-earthy

## Elevation & Depth

Minimal shadows (card: 4px, elevated: 8px); product images dominate. Warm cream card backgrounds suggest unrefined materials. Hover: subtle shadow lift (12px) with 150ms transition. Warm gold-tinted borders between zones; `gradient-golden` reserved for CTAs and accent elements only.

## Structural Zones

| Zone              | Background      | Border                 | Notes                                          |
|-------------------|-----------------|------------------------|------------------------------------------------|
| Header            | bg-card         | border-b border-border | Logo, nav, cart — elevated warm white          |
| Product Grid      | bg-background   | —                      | Warm cream cards create rhythm on linen canvas |
| Footer            | bg-muted/70     | border-t border-border | Business info, heritage story — amber-cream    |
| Sidebar (owner)   | bg-sidebar      | border-r border-border | Warm navigation for owner tools                |

## Spacing & Rhythm

24px section gaps; product grid 12px gap, 2–3 columns mobile-first. Card padding: 16px. Loose density emphasizes craftsmanship. Breathing room over compression.

## Component Patterns

- Buttons: rounded-sm, primary (golden amber fill, cream text), secondary (outline), hover lifts shadow
- Cards: rounded-sm, warm cream bg, minimal shadow, hover 12px shadow on product cards
- Badges: rounded-full, botanical green accent, compact padding, uppercase label

## Motion

Entrance: Cards fade in + slight upward slide (200ms, ease-out). Hover: shadow lift only (no translate). Transitions via `transition-smooth` (300ms). No bounce — motion suggests intentional craft.

## Constraints

- No gradients on card surfaces; reserve `gradient-golden` for CTAs only
- Product images dominate — never obscure
- Golden amber / warm brown tones throughout create cohesion
- Maintain 16px minimum touch targets on mobile
- High contrast text (foreground on card always ≥ 0.75 lightness diff)

## Signature Detail

Rich golden amber primary (the literal hue of cold-pressed oil) + botanical green accents + warm oil-seed brown foreground + warm cream background + serif typography = unmistakable premium cold-pressed oil identity.
