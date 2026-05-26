# Cameron's Thoughts

This repository is being migrated from a Create React App single-page app to an Astro-based static site.

## Content model

- legacy entries are sourced from `src/entries.js`
- legacy categories are sourced from `src/categories.js`
- `npm run migrate-content` converts those exports into one file per post under `content/posts/`
- post metadata is stored in frontmatter
- post bodies are preserved as legacy raw content for parity instead of being rewritten to true Markdown

## Available scripts

### `npm run migrate-content`

Rebuilds the file-backed content layer from the legacy exports.

### `npm start`

Runs the Astro development server after regenerating the content files.

### `npm run build`

Regenerates the content files and builds the static Astro site.

## Deployment

- Netlify should use Node `20`
- Netlify publish directory should be `dist`
- `netlify.toml` defines the build command as `npm run build`

### `npm test`

Runs the current compatibility tests for the migration helpers.
