# Cameron's Thoughts

This repository is being migrated from a Create React App single-page app to an Astro-based static site.

## Content model

- checked-in posts under `content/posts/` are the source of truth
- legacy exports in `src/entries.js` and `src/categories.js` remain as historical migration references
- post metadata is stored in frontmatter
- post bodies render as markdown
- markdown may use `:::footer-note ... :::` for legacy `footer_note` callouts
- markdown may use `:::youtube VIDEO_ID :::` for responsive YouTube embeds

## Available scripts

### `npm run generate-search-index`

Builds `public/search-index.json` from the checked-in posts.

### `npm start`

Runs the Astro development server after refreshing the search index.

### `npm run build`

Refreshes the search index and builds the static Astro site.

## Deployment

- Netlify should use Node `22.14.0`
- Netlify publish directory should be `dist`
- `netlify.toml` defines the build command as `npm run build`

### `npm test`

Runs the current compatibility tests for markdown rendering, routing, and search-index generation.
