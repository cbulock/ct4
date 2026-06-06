import { describe, expect, test } from 'vitest';
import { renderMarkdownContent } from './lib/renderMarkdownContent';
import { cleanEntryBasename, getEntryPath } from './lib/routes';

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

describe('markdown rendering', () => {
	test('renders markdown content with paragraph output and hard line breaks', () => {
		expect(renderMarkdownContent('Line one\nLine two')).toBe('<p>Line one<br>\nLine two</p>\n');
	});

	test('renders markdown content with preserved paragraph breaks', () => {
		expect(renderMarkdownContent('First paragraph\n\nSecond paragraph')).toBe(
			'<p>First paragraph</p>\n<p>Second paragraph</p>\n',
		);
	});

	test('renders footer note directives with markdown content inside', () => {
		expect(
			renderMarkdownContent(':::footer-note\nUpdate: see [the newer post](https://example.com).\n:::'),
		).toBe(
			'<div class="footer_note">\n<p>Update: see <a href="https://example.com">the newer post</a>.</p>\n</div>\n',
		);
	});

	test('renders markdown unordered lists', () => {
		expect(renderMarkdownContent('- One\n- Two')).toBe('<ul>\n<li>One</li>\n<li>Two</li>\n</ul>\n');
	});

	test('renders markdown ordered lists', () => {
		expect(renderMarkdownContent('1. One\n2. Two')).toBe('<ol>\n<li>One</li>\n<li>Two</li>\n</ol>\n');
	});

	test('renders markdown blockquotes with paragraph content', () => {
		expect(renderMarkdownContent('> Quoted line\n>\n> Second paragraph')).toBe(
			'<blockquote>\n<p>Quoted line</p>\n<p>Second paragraph</p>\n</blockquote>\n',
		);
	});

	test('renders markdown h4 headings', () => {
		expect(renderMarkdownContent('#### Section title')).toBe('<h4>Section title</h4>\n');
	});

	test('renders markdown bold with nested italics', () => {
		expect(renderMarkdownContent('***important***')).toBe(
			'<p><em><strong>important</strong></em></p>\n',
		);
	});

	test('renders markdown inline code', () => {
		expect(renderMarkdownContent('Use `mt-static` here.')).toBe(
			'<p>Use <code>mt-static</code> here.</p>\n',
		);
	});

	test('renders fenced code blocks', () => {
		expect(renderMarkdownContent('```\nline 1\nline 2\n```')).toBe(
			'<cindor-code-block>line 1\nline 2\n</cindor-code-block>\n',
		);
	});

	test('renders markdown tables', () => {
		expect(renderMarkdownContent('| Name | Value |\n| --- | --- |\n| One | Two |')).toBe(
			'<table>\n<thead>\n<tr>\n<th>Name</th>\n<th>Value</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>One</td>\n<td>Two</td>\n</tr>\n</tbody>\n</table>\n',
		);
	});

	test('renders youtube directives as responsive embeds', () => {
		expect(renderMarkdownContent(':::youtube 2CrDKCQ3G38\n:::')).toBe(
			'<div class="youtube-embed">\n<iframe src="https://www.youtube.com/embed/2CrDKCQ3G38" title="YouTube video player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>\n</div>\n',
		);
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
