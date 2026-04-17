# Design Brief

## Direction

**Premium E-commerce Storefront** — A confident, welcoming marketplace interface designed to convert browsers into buyers with clean product discovery and intuitive checkout flow.

## Tone

Bold modern energy with editorial warmth — professional enough for premium products, approachable enough for everyday shoppers. Spacious, breathing layout that prioritizes product imagery.

## Differentiation

Warm burnt-orange primary paired with deep charcoal backgrounds creates a premium, confident visual identity that guides customers from discovery to purchase without visual clutter.

## Color Palette

| Token      | OKLCH       | Role                                    |
|------------|-------------|----------------------------------------|
| background | 0.98 0.008 280 | Light cream-neutral page background  |
| foreground | 0.15 0.01 280  | Deep charcoal text for contrast        |
| card       | 1.0 0.004 280  | Pure white for product cards           |
| primary    | 0.58 0.19 60   | Warm burnt-orange: primary CTAs, accents |
| accent     | 0.7 0.22 35    | Golden-amber: highlights, badges       |
| destructive| 0.55 0.22 25   | Red for delete/cancel actions          |
| border     | 0.9 0.008 280  | Subtle grey for card dividers          |

## Typography

- Display: Bricolage Grotesque — warm, confident headings for hero, product categories, CTAs
- Body: Bricolage Grotesque — unified system for all interface text, readable at scale
- Mono: Geist Mono — code, order IDs, SKUs, pricing details
- Scale: hero `text-5xl md:text-6xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-bold`, label `text-sm font-semibold uppercase tracking-widest`, body `text-base`

## Elevation & Depth

Cards elevated with subtle shadows (4-12px blur); product images dominate visual hierarchy. Hover states lift cards further (12-32px shadow) without animation bounce. Border emphasis between zones; no gradients on surfaces — reserve gradient accents for CTAs only.

## Structural Zones

| Zone    | Background          | Border              | Notes                                          |
|---------|-------------------|-------------------|-----------------------------------------------|
| Header  | bg-background     | border-b border-border | Logo, nav, search, cart icon — spacious padding |
| Product Grid | bg-background | — | Alternating card backgrounds (white/off-white) for rhythm |
| Footer  | bg-muted/80       | border-t border-border | Business info, links, copyright — subtle muted background |
| Sidebar (owner) | bg-card | border-r border-border | Dark navigation for owner dashboard |

## Spacing & Rhythm

24px section gaps between hero/products/footer. Product grid: 12px gap with 2–3 columns mobile-first. Card padding: 16px. Micro-spacing: 4px/8px for internal button/label groups. Loose density telegraphs premium positioning.

## Component Patterns

- Buttons: rounded-md, primary (warm orange fill, white text), secondary (outline), hover lifts shadow to `shadow-hover`
- Cards: rounded-lg, white bg, subtle `shadow-card`, hover `shadow-hover` on product cards with 150ms transition
- Badges: rounded-full, accent background (golden amber), compact padding, uppercase label

## Motion

Entrance: Cards fade in + slight upward slide (200ms, ease-out) on page load. Hover: Product cards lift shadow only (no translate) on hover/focus. No bounce or playful easing — motion supports hierarchy, not distraction. Transitions via `transition-smooth` utility (300ms cubic-bezier).

## Constraints

- No full-page gradients; reserve gradients for button overlays or CTAs only
- Product images are hero; never crop or obscure
- Owner dashboard uses sidebar + cards, distinct from customer storefront
- Maintain 16px minimum touch targets on mobile
- High contrast text (foreground on card always ≥ 0.85 lightness diff)

## Signature Detail

Warm burnt-orange primary accent with deep charcoal creates a confident, premium e-commerce identity that differentiates from generic blue-primary SaaS designs — the warmth invites, the depth commands respect.
