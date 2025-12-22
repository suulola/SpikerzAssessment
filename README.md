# Spikerz Assessment

An Angular 21 dashboard focused on cybersecurity/asset risk. The UI is built to mirror the Figma design with a strong emphasis on tokenized styling, reusable components, and responsive layout behavior.

## Highlights

- Standalone Angular components with signals.
- Tailwind-first styling with SCSS only for tokenized mixins and SVG/pseudo-element styling.
- PrimeNG components (e.g., Chart) for consistent UI.
- Ngx-graph for the interactive attack path visualization.
- Tokenized design system (no hardcoded px in CSS/SCSS).

## Tech Stack

- Angular 21 (standalone + signals)
- TypeScript (strict)
- Tailwind CSS (with design tokens)
- PrimeNG + PrimeIcons
- @swimlane/ngx-graph (graph visualization)
- Chart.js (PrimeNG Chart dependency)

## Project Structure

- `src/app/features/vulnerabilities/` — vulnerability details, remediation cards, graph panel, popovers.
- `src/app/features/shell/` — layout, sidebar.
- `src/styles/_tokens.scss` — design tokens sourced from Figma.
- `tailwind.config.js` — Tailwind extensions to mirror tokens.

## Design Tokens

This project enforces tokenized values for spacing, colors, radii, and sizes.

- SCSS tokens live in `src/styles/_tokens.scss`.
- Tailwind tokens are extended in `tailwind.config.js`.
- Avoid hardcoded px in CSS/SCSS. Use tokens or Tailwind utilities instead.


## Setup

Install dependencies:

```bash
npm install --legacy-peer-deps
```

Note: `@swimlane/ngx-graph@11` has peer dependencies for Angular 18–20. The project uses Angular 21, so `--legacy-peer-deps` is required.

## Development

```bash
ng serve
```

Then open `http://localhost:4200`.

## Build

```bash
ng build
```

## Testing

```bash
ng test
```

## Key UI Areas

- **Vulnerabilities page**: details panel + graph panel in a responsive split layout.
- **Attack Path Overview**: ngx-graph rendering with custom nodes + popovers.
- **Assets & Contextual Risk**: paginated asset list and a doughnut chart.
- **Remediation cards**: expandable cards styled to match the design.

## PrimeNG Chart (Contextual Risk)

The Contextual Risk card uses PrimeNG Chart (Chart.js) with a doughnut chart and a center value overlay. Chart styling is controlled via chart options and design tokens.


