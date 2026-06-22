import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { describe, expect, test } from 'vitest';
import { rehypeCindorCodeBlocks } from './lib/astro-markdown/rehypeCindorCodeBlocks.mjs';
import { remarkLegacyContainers } from './lib/astro-markdown/remarkLegacyContainers.mjs';
import { cleanEntryBasename, getEntryPath } from './lib/routes';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

const renderWithAstroMarkdownPipeline = async (content) => {
	const file = await unified()
		.use(remarkParse)
		.use(remarkLegacyContainers)
		.use(remarkRehype)
		.use(rehypeCindorCodeBlocks)
		.use(rehypeStringify)
		.process(content);

	return String(file);
};

const getMarkdownBodyFromPost = (filename) => {
	const postSource = fs.readFileSync(path.join(POSTS_DIRECTORY, filename), 'utf8');

	return postSource.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/u, '');
};

describe('routing helpers', () => {
	test('build canonical and legacy-compatible entry paths', () => {
		const entry = {
			routeYear: '2005',
			routeMonth: '02',
			basename: 'what_im_reading',
		};

		expect(getEntryPath(entry)).toBe('/2005/02/what_im_reading');
		expect(getEntryPath(entry, { legacyHtml: true })).toBe('/2005/02/what_im_reading.html');
		expect(cleanEntryBasename('what_im_reading.html')).toBe('what_im_reading');
	});
});

describe('Astro markdown pipeline', () => {
	test('renders footer note directives via the Astro markdown plugin path', async () => {
		const renderedHtml = await renderWithAstroMarkdownPipeline(
			getMarkdownBodyFromPost('0022-making_a_photo_gallery-22.md'),
		);

		expect(renderedHtml).toContain('<div class="footer_note"><p>Actually, pic no longer available</p></div>');
	});

	test('renders youtube directives via the Astro markdown plugin path', async () => {
		const renderedHtml = await renderWithAstroMarkdownPipeline(
			getMarkdownBodyFromPost('0560-nestor-591.md'),
		);

		expect(renderedHtml).toContain('<div class="youtube-embed"><iframe');
		expect(renderedHtml).toContain('https://www.youtube.com/embed/2CrDKCQ3G38');
	});

	test('renders fenced code blocks as cindor code blocks via the Astro markdown plugin path', async () => {
		const renderedHtml = await renderWithAstroMarkdownPipeline(
			getMarkdownBodyFromPost('0181-reorganizing_your_website_renaming_permalinks-174.md'),
		);

		expect(renderedHtml).toContain('<cindor-code-block language="html">');
		expect(renderedHtml).toContain('MTArchiveList');
	});
});

describe('HTML conversion helpers', () => {
	test('converts break-separated prose into paragraph markdown', async () => {
		const { convertSupportedHtmlToMarkdown } = await import('../scripts/lib/convert-supported-html.mjs');

		expect(convertSupportedHtmlToMarkdown('First thought.<br />Second thought.')).toBe(
			'First thought.\n\nSecond thought.',
		);
	});

	test('converts break-separated release notes into markdown lists', async () => {
		const { convertSupportedHtmlToMarkdown } = await import('../scripts/lib/convert-supported-html.mjs');

		expect(
			convertSupportedHtmlToMarkdown(
				'Downloads:<br /><br /><a href="https://example.com/one">One</a><br />First release notes.<br /><br /><a href="https://example.com/two">Two</a><br />Second release notes.',
			),
		).toBe(
			'Downloads:\n\n- [One](https://example.com/one)\n  First release notes.\n- [Two](https://example.com/two)\n  Second release notes.',
		);
	});

	test('converts strong, ordered list, and q tags into markdown', async () => {
		const { convertSupportedHtmlToMarkdown } = await import('../scripts/lib/convert-supported-html.mjs');

		expect(
			convertSupportedHtmlToMarkdown(
				'<p><strong>Important</strong></p><ol><li>First</li><li>Second</li></ol><q>Quoted text</q>',
			),
		).toBe('**Important**\n\n1. First\n2. Second\n\n"Quoted text"');
	});

	test('converts pre and code tags into markdown code syntax', async () => {
		const { convertSupportedHtmlToMarkdown } = await import('../scripts/lib/convert-supported-html.mjs');

		expect(
			convertSupportedHtmlToMarkdown(
				'<p>Use <code>mt-static</code> here.</p><pre>&lt;?php<br />echo &quot;hi&quot;;<br /></pre><code>line 1<br />line 2</code>',
			),
		).toBe('Use `mt-static` here.\n\n```\n<?php\necho "hi";\n```\n\n```\nline 1\nline 2\n```');
	});
});
