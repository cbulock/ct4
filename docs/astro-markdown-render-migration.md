# Astro Markdown Render Migration

Goal: replace CT4's custom `markdown-it` rendering path with Astro content entries plus `render(entry)` while preserving current post output.

## Current Status

- [x] All post files are already plain `.md` and no longer use `contentFormat` frontmatter flags.
- [x] Added an Astro content collection schema for the existing `content/posts` directory via `glob()` in `src/content.config.ts`.
- [x] Live entry pages render through Astro's `render(entry)` path.
- [x] Legacy `:::footer-note`, `:::youtube`, and fenced code blocks now render through Astro markdown plugins instead of page-level `markdown-it` fallback logic.

## Remaining Steps

### Phase 1: Content Source Parity

- [x] Replace `fs` + `gray-matter` reads in `src/lib/content.js` with `getCollection('posts')`.
- [x] Normalize collection entries into the current shape used by routes/components so the rest of the app can stay stable during migration.
- [x] Keep excerpt/category/year/archive helpers working against the normalized collection data.

### Phase 2: Built-In Render Adoption

- [x] Update `src/pages/[year]/[month]/[entryBasename].astro` to call `render(entry)` from `astro:content`.
- [x] Replace `<MarkdownContent content={entry.body} />` with Astro's rendered `Content` component.
- [x] Confirm legacy `.html` route aliases still resolve correctly.

### Phase 3: Feature Parity For Custom Markdown Behavior

- [x] Recreate `:::footer-note` in Astro's markdown pipeline.
- [x] Recreate `:::youtube <id>` in Astro's markdown pipeline.
- [x] Recreate fenced code block output as `<cindor-code-block>`.
- [x] Verify there are no legacy posts depending on any other `markdown-it`-specific behavior.

### Phase 4: Test And Cleanup

- [x] Rewrite `src/markdown-and-routing.test.js` around the Astro-rendered output instead of direct `renderMarkdownContent()` snapshots.
- [x] Add at least one integration-style test that renders a real collection entry with custom directives.
- [x] Remove `markdown-it`, `markdown-it-container`, and the old custom renderer files after parity is proven.
- [x] Remove `gray-matter` if no remaining scripts/runtime code still need it.
- [x] Remove dead React-era content formatting helpers if they are no longer referenced.

## Notes

- The real risk is not collection loading; it is preserving the custom directive/code-block behavior without regressing old posts.
- Using the `glob()` loader lets CT4 keep its current top-level `content/posts` layout for now instead of forcing a file move first.
- `gray-matter` is no longer part of the repo runtime or helper-script path.
- The legacy React SPA and its helper files were removed in a later cleanup pass, so CT4 now has a single Astro app path.
