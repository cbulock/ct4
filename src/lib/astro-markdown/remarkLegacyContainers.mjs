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

const splitChildrenOnBreaks = (children = []) => {
	const segments = [];
	let currentSegment = [];

	for (const child of children) {
		if (child.type === 'break') {
			segments.push(currentSegment);
			currentSegment = [];
			continue;
		}

		currentSegment.push(child);
	}

	segments.push(currentSegment);

	return segments.filter((segment) => segment.length > 0);
};

const getTextFromNode = (node) => {
	if (!node) {
		return '';
	}

	if (typeof node.value === 'string') {
		return node.value;
	}

	if (Array.isArray(node.children)) {
		return node.children.map(getTextFromNode).join('');
	}

	return '';
};

const getSegmentText = (segment) =>
	segment
		.map(getTextFromNode)
		.join('')
		.replace(/\s+/g, ' ')
		.trim();

const isLegacyProseBreakParagraph = (node) => {
	const breakCount = node.children.filter((child) => child.type === 'break').length;

	if (breakCount === 0) {
		return false;
	}

	const segments = splitChildrenOnBreaks(node.children);

	if (segments.length < 2) {
		return false;
	}

	const segmentTexts = segments.map(getSegmentText).filter(Boolean);

	if (segmentTexts.length !== segments.length) {
		return false;
	}

	const totalLength = segmentTexts.reduce((sum, text) => sum + text.length, 0);

	return breakCount >= 2 || (segmentTexts.every((text) => text.length >= 48) && totalLength >= 160);
};

const expandLegacyProseBreakParagraphs = (tree) => {
	visit(tree, 'paragraph', (node, index, parent) => {
		if (!parent || typeof index !== 'number' || !isLegacyProseBreakParagraph(node)) {
			return;
		}

		const segments = splitChildrenOnBreaks(node.children);

		parent.children.splice(
			index,
			1,
			...segments.map((segment) => ({
				type: 'paragraph',
				children: segment,
			})),
		);
	});
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
	expandLegacyProseBreakParagraphs(tree);
};

export {
	YOUTUBE_EMBED_ATTRIBUTES,
	expandLegacyProseBreakParagraphs,
	getSegmentText,
	isLegacyProseBreakParagraph,
	parseLegacyMarkdownBlock,
	remarkLegacyContainers,
	splitChildrenOnBreaks,
	transformLegacyMarkdownBlocks,
};
