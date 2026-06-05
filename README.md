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

### `npm run migrate-content`

Legacy fallback script that rebuilds the file-backed content layer from the old exports.

### `npm run generate-search-index`

Builds `public/search-index.json` from the checked-in posts.

### Migration helpers

- `node scripts/find-markdown-candidates.mjs` finds plain-text legacy posts that can be flipped safely
- `node scripts/find-image-candidates.mjs` finds legacy posts whose remaining HTML is limited to supported images and links
- `node scripts/find-paragraph-candidates.mjs` finds legacy posts whose remaining HTML is limited to plain paragraph tags plus already-supported links, images, and italics
- `node scripts/find-footer-note-candidates.mjs` finds legacy posts whose remaining HTML is limited to supported footer notes plus already-supported links, images, italics, and paragraphs
- `node scripts/find-list-candidates.mjs` finds legacy posts whose remaining HTML is limited to plain unordered lists plus already-supported links, images, italics, paragraphs, and footer notes
- `node scripts/find-blockquote-candidates.mjs` finds legacy posts whose remaining HTML is limited to plain blockquotes plus already-supported links, images, italics, paragraphs, lists, and footer notes
- `node scripts/find-h4-candidates.mjs` finds legacy posts whose remaining HTML is limited to plain h4 headings plus already-supported tags
- `node scripts/find-bold-candidates.mjs` finds legacy posts whose remaining HTML is limited to plain b tags plus already-supported tags
- `node scripts/find-br-candidates.mjs` finds legacy posts whose remaining HTML is limited to supported tags plus `<br>` separators
- `node scripts/find-code-candidates.mjs` finds legacy posts whose remaining HTML is limited to plain `<pre>`/`<code>` tags plus already-supported tags
- `node scripts/convert-anchor-only-posts.mjs <post-file...>` converts safe link-only batches
- `node scripts/convert-image-posts.mjs <post-file...>` converts safe image batches
- `node scripts/convert-italic-posts.mjs <post-file...>` converts safe italic batches
- `node scripts/convert-paragraph-posts.mjs <post-file...>` converts safe paragraph batches
- `node scripts/convert-list-posts.mjs <post-file...>` converts safe unordered-list batches
- `node scripts/convert-blockquote-posts.mjs <post-file...>` converts safe blockquote batches
- `node scripts/convert-h4-posts.mjs <post-file...>` converts safe h4-heading batches
- `node scripts/convert-bold-posts.mjs <post-file...>` converts safe bold-tag batches
- `node scripts/convert-br-posts.mjs <post-file...>` converts safe `<br>`-separator batches
- `node scripts/convert-code-posts.mjs <post-file...>` converts safe code-block and inline-code batches

### `npm start`

Runs the Astro development server after refreshing the search index.

### `npm run build`

Refreshes the search index and builds the static Astro site.

## Deployment

- Netlify should use Node `22.14.0`
- Netlify publish directory should be `dist`
- `netlify.toml` defines the build command as `npm run build`

### `npm test`

Runs the current compatibility tests for the migration helpers.
