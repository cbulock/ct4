import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { describe, expect, test } from 'vitest';
import { convertPreCodeElement } from './lib/astro-markdown/rehypeCindorCodeBlocks.mjs';
import {
	isLegacyProseBreakParagraph,
	parseLegacyMarkdownBlock,
	remarkLegacyContainers,
} from './lib/astro-markdown/remarkLegacyContainers.mjs';

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

	test('detects long prose hard-break paragraphs but leaves short intentional breaks alone', () => {
		const proseTree = unified()
			.use(remarkParse)
			.parse(
				`This is a long legacy prose line that should become its own paragraph once the migration cleanup runs because it is clearly body copy and not a short subtitle.  \nThis is another long prose line that should also become its own paragraph because it continues the article in the same old convert-breaks style.`,
			);
		const shortTree = unified().use(remarkParse).parse('**You Are 35% Normal**  \n*(Occasionally Normal)*');

		expect(isLegacyProseBreakParagraph(proseTree.children[0])).toBe(true);
		expect(isLegacyProseBreakParagraph(shortTree.children[0])).toBe(false);
	});

	test('rewrites long hard-break prose into multiple paragraph nodes', () => {
		const tree = unified()
			.use(remarkParse)
			.parse(
				`This is a long legacy prose line that should become its own paragraph once the migration cleanup runs because it is clearly body copy and not a short subtitle.  \nThis is another long prose line that should also become its own paragraph because it continues the article in the same old convert-breaks style.`,
			);

		remarkLegacyContainers()(tree, { value: '' });

		expect(tree.children).toHaveLength(2);
		expect(tree.children.every((node) => node.type === 'paragraph')).toBe(true);
		expect(tree.children.some((node) => node.children.some((child) => child.type === 'break'))).toBe(false);
	});
});
