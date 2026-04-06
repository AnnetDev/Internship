# Internship

A landing page for the **Internship** project — a joint initiative by governments and volunteer brigades aimed at upskilling young professionals at early and mid stages of their careers. Provides information about internship, volunteering, and study abroad programs.

## Tech Stack

- **Vite** — build tool
- **SCSS/Sass** — CSS preprocessor
- **BEM** — naming methodology
- **Vanilla JS** — no framework
- **Swiper** — sliders
- **PostCSS + Autoprefixer** — CSS postprocessing
- **SVG Sprite** — icon system

## Features

- Fully responsive layout (mobile, tablet, desktop)
- Burger menu with navigation and dropdowns
- Language switcher (RU / EN) with full content translation
- Hero section with auto-playing slider
- Sliders for programs, reviews, and news sections
- Tabbed news section
- FAQ accordion
- Popup with form validation and checkbox
- Contact form with validation and city dropdown

## Getting Started

1. Install Node.js (supported versions: `^18.18` or `^20.9`)
2. Install dependencies:

```shell
npm i
```

3. Start the development server:

```shell
npm run dev
```

4. Additional commands:

| Command | Description |
|---|---|
| `npm run build` | Build optimized version to `dist` folder |
| `npm run preview` | Preview the production build |
| `npm run convert-rastr` | Convert raster images to WebP in `source/img/` |

> The SVG sprite is built from files in `source/img/sprite/`. Reference icons in HTML via `href="/__spritemap#sprite-{icon-file-name}"`

## Quality Checks

| Command | Description |
|---|---|
| `npm run test` | Pixel Perfect testing (requires `npm run dev` running on `localhost:3000`) |
| `npm run w3c` | W3C HTML validation |
| `npm run linthtml` | Markup check via linthtml rules |
| `npm run html-validate` | HTML validation |
| `npm run lint-bem` | BEM compliance check |
| `npm run stylelint` | Stylelint check (with autofix) |
| `npm run lint-js` | ESLint check (with autofix) |
| `npm run ls-lint` | File and folder naming check |
| `npm run editorconfig` | EditorConfig compliance check |
