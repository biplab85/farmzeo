# Farmzeo

A premium landing page for Farmzeo — an all-in-one digital platform empowering farmers with smart tools for selling produce, tracking fields, accessing weather insights, and boosting profits.

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** for blazing-fast dev/build
- **Tailwind CSS 3.4** + **SCSS** (variables only)
- **Framer Motion** for scroll animations and micro-interactions
- **SwiperJS** for carousels
- **react-intersection-observer** for scroll-triggered effects

## Features

- Fully responsive design (mobile-first)
- Premium dark sections with layered gradient backgrounds, animated ambient orbs, and subtle grid overlays
- Interactive mouse-cursor-follow SVG constellation animation (desktop)
- Cursor trail particles with parallax effect
- Animated stat counters with progress bars
- Split-text reveal animations on scroll
- Glassmorphism card effects with hover micro-interactions
- Floating particle system with unique drift animations
- Stroke-text watermark in footer
- Back-to-top button with spring animation
- Reduced motion support (`prefers-reduced-motion`)

## Sections

1. **Navbar** — Sticky nav with glassmorphism backdrop
2. **Hero** — Dark section with CTA
3. **Problem** — Pain points farmers face
4. **Solution** — How Farmzeo solves them
5. **Product Tour** — Feature walkthrough with carousel
6. **Benefits** — Key advantages
7. **Impact** — Premium dark section with animated stats, constellation SVG, and cursor-follow effects
8. **Why Choose** — Differentiators
9. **FAQ** — Accordion-style Q&A
10. **Final CTA** — Conversion section with mesh gradient
11. **Contact** — Contact form
12. **Footer** — Links, socials, and FARMZEO stroke-text watermark

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  components/    # Reusable UI components (Button, Container, Icons, etc.)
  sections/      # Page sections (Hero, Impact, Footer, etc.)
  styles/        # SCSS variables and global styles
  content.ts     # All text content (no hardcoded strings in components)
  App.tsx         # Main app with section composition
  main.tsx        # Entry point
```

## Color Palette

| Color          | Hex       |
|----------------|-----------|
| Primary Navy   | `#1B3252` |
| Dark Navy      | `#021B33` |
| Teal           | `#0D9984` |
| Teal Light     | `#2ABFAD` |
| Accent Amber   | `#F5A623` |
| Body Text      | `#4A5568` |
| Background     | `#FFFFFF` |
| Light BG       | `#F8FAFB` |
