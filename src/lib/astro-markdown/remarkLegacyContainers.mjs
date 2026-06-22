import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

const YOUTUBE_EMBED_ATTRIBUTES = {
	title: 'YouTube video player',
	loading: 'lazy',
	allow:
		'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
	referrerpolicy: 'strict-origin-when-cross-origin',
	allowfullscreen: true,
};

const markdownFragmentParser = unified().use(remarkParse);

const parseMarkdownFragment = (content) => markdownFragmentParser.parse(content).children;

const getNodeSource = (node, source) => {
	const startOffset = node.position?.start?.offset;
	const endOffset = node.position?.end?.offset;

	if (typeof startOffset !== 'number' || typeof endOffset !== 'number') {
		return null;
	}

	return source.slice(startOffset, endOffset);
};

const parseLegacyMarkdownBlock = (source) => {
	const footerMatch = source.match(/^:::footer-note(?:\s+.*)?\r?\n([\s\S]*?)\r?\n:::\s*$/u);

	if (footerMatch) {
		return {
			type: 'legacyContainer',
			data: {
				hName: 'div',
				hProperties: {
					className: ['footer_note'],
				},
			},
			children: parseMarkdownFragment(footerMatch[1]),
		};
	}

	const youtubeMatch = source.match(/^:::youtube\s+([A-Za-z0-9_-]{11})\r?\n:::\s*$/u);

	if (youtubeMatch) {
		return {
			type: 'legacyContainer',
			data: {
				hName: 'div',
				hProperties: {
					className: ['youtube-embed'],
				},
			},
			children: [
				{
					type: 'legacyEmbed',
					data: {
						hName: 'iframe',
						hProperties: {
							src: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
							...YOUTUBE_EMBED_ATTRIBUTES,
						},
					},
					children: [],
				},
			],
		};
	}

	return null;
};

const transformLegacyMarkdownBlocks = (tree, source) => {
	visit(tree, 'paragraph', (node, index, parent) => {
		if (!parent || typeof index !== 'number') {
			return;
		}

		const nodeSource = getNodeSource(node, source);

		if (!nodeSource || !nodeSource.startsWith(':::')) {
			return;
		}

		const replacementNode = parseLegacyMarkdownBlock(nodeSource);

		if (!replacementNode) {
			return;
		}

		parent.children[index] = replacementNode;
	});
};

const remarkLegacyContainers = () => (tree, file) => {
	transformLegacyMarkdownBlocks(tree, String(file.value ?? ''));
};

export {
	YOUTUBE_EMBED_ATTRIBUTES,
	parseLegacyMarkdownBlock,
	remarkLegacyContainers,
	transformLegacyMarkdownBlocks,
};
