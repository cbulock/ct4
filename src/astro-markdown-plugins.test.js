import { describe, expect, test } from 'vitest';
import { convertPreCodeElement } from './lib/astro-markdown/rehypeCindorCodeBlocks.mjs';
import { parseLegacyMarkdownBlock } from './lib/astro-markdown/remarkLegacyContainers.mjs';

describe('legacy markdown Astro plugins', () => {
	test('converts footer-note blocks into wrapped markdown content', () => {
		const node = parseLegacyMarkdownBlock(
			':::footer-note\nUpdate: see [the newer post](https://example.com).\n:::',
		);

		expect(node?.data?.hName).toBe('div');
		expect(node?.data?.hProperties?.className).toEqual(['footer_note']);
		expect(node?.children).toHaveLength(1);
		expect(node?.children[0]?.type).toBe('paragraph');
		expect(node?.children[0]?.children[0]?.value).toBe('Update: see ');
		expect(node?.children[0]?.children[1]?.type).toBe('link');
	});

	test('converts youtube blocks into iframe embeds', () => {
		const node = parseLegacyMarkdownBlock(':::youtube 2CrDKCQ3G38\n:::');

		expect(node?.data?.hName).toBe('div');
		expect(node?.data?.hProperties?.className).toEqual(['youtube-embed']);
		expect(node?.children[0]?.data?.hName).toBe('iframe');
		expect(node?.children[0]?.data?.hProperties?.src).toBe(
			'https://www.youtube.com/embed/2CrDKCQ3G38',
		);
	});

	test('converts pre/code elements into cindor code blocks', () => {
		const convertedNode = convertPreCodeElement({
			type: 'element',
			tagName: 'pre',
			properties: {},
			children: [
				{
					type: 'element',
					tagName: 'code',
					properties: {
						className: ['language-js'],
					},
					children: [
						{
							type: 'text',
							value: 'console.log(1);\n',
						},
					],
				},
			],
		});

		expect(convertedNode).toEqual({
			type: 'element',
			tagName: 'cindor-code-block',
			properties: {
				language: 'js',
			},
			children: [
				{
					type: 'text',
					value: 'console.log(1);\n',
				},
			],
		});
	});
});
