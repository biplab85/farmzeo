# Farmzeo — Project Skill & Instructions for Claude

## Repository

- **GitHub:** https://github.com/biplab85/farmzeo
- **Main branch:** `main`

---

## Project Overview

Rebuild the Farmzeo website as a modern, responsive, multi-page static-first React website.

**Requirements:**

- Match the original color palette (see Color Palette section below)
- Match the original font family
- Modern UI/UX design
- Responsive layout (mobile-first)
- Deployed on Vercel
- Initially static, upgradeable to dynamic later

**Content source:** All text and images come from `CONTENT.pdf` in the project root.

---

## Tech Stack

- **Framework:** React (Vite or Next.js App Router preferred)
- **Styling:** Tailwind CSS + SCSS with variables
- **Sliders:** SwiperJS (https://swiperjs.com/)
- **Modals/Lightbox:** FancyApps (https://fancyapps.com/)
- **Animations:** SVG animations where appropriate
- **Language:** TypeScript
- **Deployment:** Vercel

---

## Architecture Rules

### Content Management

- All content must be stored in `src/content.ts`
- All pages and sections must consume data from `content.ts`
- No hardcoded text inside components

### Folder Structure

```
src/
├── components/      # Reusable UI components (Button, Card, Modal, etc.)
├── sections/        # Page sections (Hero, Solution, Benefits, etc.)
├── styles/          # SCSS variables and global styles
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── content.ts       # All site content (centralized data)
├── App.tsx          # Main app component
└── main.tsx         # Entry point

public/
├── images/          # Optimized images (WebP)
├── fonts/           # Custom fonts (if needed)
└── favicon.ico      # Favicon
```

---

## Sections Structure

The site is built from the following sections, in order (matching `CONTENT.pdf`):

| #  | Section                  | Component Name           |
|----|--------------------------|--------------------------|
| 1  | Navigation               | `Navbar`                 |
| 2  | Hero Section             | `Hero`                   |
| 3  | Problem Section          | `Problem`                |
| 4  | The Opportunity          | `Opportunity`            |
| 5  | Solution Section         | `Solution`               |
| 6  | Product Tour / How It Works | `ProductTour`         |
| 7  | Benefits / Key Features  | `Benefits`               |
| 8  | Impact on Farmers        | `Impact`                 |
| 9  | Why Choose Farmzeo       | `WhyChoose`              |
| 10 | Vision and Growth        | `Vision`                 |
| 11 | FAQ                      | `FAQ`                    |
| 12 | Final CTA                | `FinalCTA`               |
| 13 | Join Us / Contact        | `Contact`                |
| 14 | Footer                   | `Footer`                 |

---

## Navigation

- **Logo:** FARMZEO (with leaf icon)
- **Nav Links:** Features, How It Works, Pricing, About
- **CTA Button:** Get Started Free
- **Behavior:** Sticky header with scroll-aware styling
- **Active link:** Highlight based on current scroll position

---

## UI/UX Requirements

- Modern, clean design
- Responsive across mobile, tablet, and desktop
- Sticky header with scroll behavior
- Smooth scrolling between sections
- SVG animations where useful
- FancyApps modals for demos/media
- SwiperJS sliders for testimonials or product tours

---

## Styling Rules

- **Layout:** Tailwind CSS utility classes
- **Variables:** SCSS for colors, fonts, and breakpoints
- **No inline styles**
- Refer to the Color Palette section below for exact values

---

## Code Quality Rules

- One section = one component file
- Reusable components for shared UI elements (Button, Card, SectionLabel, etc.)
- TypeScript throughout (strict mode)
- Props-driven components — no internal hardcoded content
- Clean, flat folder structure

---

## Images & Assets

- Source images from the original site
- Optimize all images to WebP format
- Lazy-load images below the fold
- Store in `/public/images/`
- Include alt text for every image

---

## SEO & Performance

- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`)
- Proper heading hierarchy (single `<h1>`, sequential `<h2>`-`<h4>`)
- Meta tags (title, description, Open Graph)
- Lighthouse score target: 80+

---

## Accessibility (a11y)

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Alt text for all images
- Proper ARIA labels where needed
- Visible focus indicators for interactive elements
- Color contrast ratio compliance (4.5:1 minimum)
- Skip-to-content link

---

## Forms & Contact

- Contact form with client-side validation
- Email integration (Formspree / EmailJS / custom backend)
- Success and error feedback messages
- Anti-spam protection (honeypot or reCAPTCHA)

---

## Deployment

- **Platform:** Vercel
- **Strategy:** Static-first, upgradeable to dynamic
- **CI/CD:** Auto-deploy from `main` branch

---

## Git Workflow

- **Production branch:** `main`
- **Feature branches:** `feature/<section-name>`
- **Commit messages:** Clear, descriptive, conventional style
- **Remote:** https://github.com/biplab85/farmzeo

---

## Color Palette

Derived from the Farmzeo logo (dark navy wordmark, teal-green field curves, golden sun icon).

| Role               | Hex       | Usage                                                        |
|--------------------|-----------|--------------------------------------------------------------|
| Primary (Navy)     | `#1B3252` | Headlines, navbar text, footer bg, logo wordmark             |
| Secondary (Teal)   | `#00A896` | Tagline, section labels, links, hover states, icon accents   |
| Accent (Amber)     | `#F5A623` | CTA buttons, highlights, stat numbers, pricing emphasis      |
| Background White   | `#FFFFFF` | Main page bg, card bg, form inputs                           |
| Background Light   | `#F7F9FC` | Alternating section bg (Problem, Benefits, FAQ)              |
| Background Dark    | `#0F2137` | Footer bg, dark CTA sections, contrast sections              |
| Text Body          | `#4A5568` | Body text, descriptions, subheadlines                        |
| Text Muted         | `#94A3B8` | Placeholders, captions, disabled states                      |
| Success            | `#22C55E` | Success messages, positive stats, form validation success    |
| Error              | `#EF4444` | Error messages, form validation errors                       |

### SCSS Variables

```scss
$color-primary:        #1B3252;
$color-secondary:      #00A896;
$color-accent:         #F5A623;
$color-bg-white:       #FFFFFF;
$color-bg-light:       #F7F9FC;
$color-bg-dark:        #0F2137;
$color-text-heading:   #1B3252;
$color-text-body:      #4A5568;
$color-text-muted:     #94A3B8;
$color-success:        #22C55E;
$color-error:          #EF4444;
```

### Tailwind Config Extension

```js
colors: {
  primary:   '#1B3252',
  secondary: '#00A896',
  accent:    '#F5A623',
  dark:      '#0F2137',
  body:      '#4A5568',
  muted:     '#94A3B8',
  light:     '#F7F9FC',
}
```

---

## Goal

Create a professional, modern, fast, and scalable rebuild of the Farmzeo website using React, Tailwind CSS, SCSS, SwiperJS, FancyApps, and a content-driven architecture. The final product should be a polished, production-ready site that reflects Farmzeo's mission: empowering farmers through technology.
