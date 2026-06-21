import path from 'node:path';
import { existsSync } from 'node:fs';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

const ATTRIBUTE_PATTERN =
	/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
const IMAGE_PATTERN = /<img\b([^>]*)\/?>/gi;
const ANCHOR_PATTERN = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
const BOLD_PATTERN = /<b\b([^>]*)>([\s\S]*?)<\/b>/gi;
const STRONG_PATTERN = /<strong\b([^>]*)>([\s\S]*?)<\/strong>/gi;
const CODE_PATTERN = /<code\b([^>]*)>([\s\S]*?)<\/code>/gi;
const ITALIC_PATTERN = /<(i|em)\b[^>]*>([\s\S]*?)<\/\1>/gi;
const FOOTER_NOTE_PATTERN = /<(p|div)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
const PARAGRAPH_PATTERN = /<p\b([^>]*)>([\s\S]*?)<\/p>/gi;
const PRE_PATTERN = /<pre\b([^>]*)>([\s\S]*?)<\/pre>/gi;
const UNORDERED_LIST_PATTERN = /<ul\b([^>]*)>([\s\S]*?)<\/ul>/gi;
const ORDERED_LIST_PATTERN = /<ol\b([^>]*)>([\s\S]*?)<\/ol>/gi;
const LIST_ITEM_PATTERN = /<li\b([^>]*)>([\s\S]*?)<\/li>/gi;
const BLOCKQUOTE_PATTERN = /<blockquote\b([^>]*)>([\s\S]*?)<\/blockquote>/gi;
const H4_PATTERN = /<h4\b([^>]*)>([\s\S]*?)<\/h4>/gi;
const Q_PATTERN = /<q\b([^>]*)>([\s\S]*?)<\/q>/gi;
const BREAK_PATTERN = /<br\s*\/?>/i;
const SINGLE_BREAK_PATTERN = /\s*<br\s*\/?>\s*/i;
const MULTI_BREAK_PATTERN = /(?:\s*<br\s*\/?>\s*){2,}/gi;
const LOCAL_IMAGE_HOST_PATTERN = /^https?:\/\/(?:www\.)?cbulock\.com(\/images\/.+)$/i;

const decodeHtmlEntities = (value = '') =>
	String(value)
		.replace(/&nbsp;/gi, ' ')
		.replace(/&amp;/gi, '&')
		.replace(/&lt;/gi, '<')
		.replace(/&gt;/gi, '>')
		.replace(/&quot;/gi, '"')
		.replace(/&#39;|&apos;|&#039;/gi, "'");

const getAttributes = (source = '') => {
	const attributes = {};

	for (const match of source.matchAll(ATTRIBUTE_PATTERN)) {
		attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
	}

	return attributes;
};

const hasClass = (value = '', className) =>
	String(value)
		.split(/\s+/u)
		.filter(Boolean)
		.includes(className);

const escapeMarkdownLabel = (value) =>
	value.replace(/\\/g, '\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]');

const escapeMarkdownUrl = (value) =>
	value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

const escapeMarkdownTitle = (value) =>
	value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const toMarkdownImage = (src, alt = '', title = '') => {
	const safeAlt = escapeMarkdownLabel(alt.trim());
	const safeSrc = escapeMarkdownUrl(src.trim());

	if (title) {
		return `![${safeAlt}](${safeSrc} "${escapeMarkdownTitle(title.trim())}")`;
	}

	return `![${safeAlt}](${safeSrc})`;
};

const toMarkdownLink = (href, label, title = '') => {
	const safeHref = escapeMarkdownUrl(href.trim());

	if (!label.trim()) {
		return href;
	}

	if (title) {
		return `[${label}](${safeHref} "${escapeMarkdownTitle(title.trim())}")`;
	}

	return `[${label}](${safeHref})`;
};

const throwIfMissingLocalImage = (absoluteImagePath, sourcePath) => {
	if (!existsSync(absoluteImagePath)) {
		throw new Error(`Local image not found for markdown conversion: ${sourcePath}`);
	}
};

const normalizeImageSource = (src) => {
	const hostMatch = LOCAL_IMAGE_HOST_PATTERN.exec(src);

	if (hostMatch) {
		return hostMatch[1];
	}

	return src;
};

const shouldDropTrackingPixel = (attributes, src) => {
	const width = String(attributes.width ?? '').trim();
	const height = String(attributes.height ?? '').trim();

	return /assoc-amazon\.com/i.test(src) && width === '1' && height === '1';
};

const trimBlankLines = (value = '') =>
	String(value).replace(/^\s*\n/u, '').replace(/\n\s*$/u, '');

const dedentCodeBlock = (value = '') => {
	const lines = String(value).split('\n');
	const indents = lines
		.filter((line) => line.trim())
		.map((line) => {
			const match = line.match(/^[\t ]*/u);
			return match ? match[0].length : 0;
		});

	if (indents.length === 0) {
		return value;
	}

	const minIndent = Math.min(...indents);

	if (minIndent === 0) {
		return value;
	}

	return lines.map((line) => line.slice(minIndent)).join('\n');
};

const getBacktickFence = (value = '', minimumLength = 3) => {
	const runs = Array.from(String(value).matchAll(/`+/g), (match) => match[0].length);
	return '`'.repeat(Math.max(minimumLength, (runs.length ? Math.max(...runs) : 0) + 1));
};

const hasNestedHtmlMarkup = (value = '') => /<(?!br\s*\/?>)[^>]+>/i.test(value);

const normalizeCodeBlockContent = (value = '') => {
	if (hasNestedHtmlMarkup(value)) {
		return null;
	}

	const normalized = dedentCodeBlock(
		trimBlankLines(
			decodeHtmlEntities(String(value).replace(/\r\n?/g, '\n').replace(/<br\s*\/?>/gi, '\n')),
		),
	);

	return normalized.trim() ? normalized : '';
};

const normalizeInlineCodeContent = (value = '') => {
	if (/<[^>]+>/i.test(value)) {
		return null;
	}

	const normalized = decodeHtmlEntities(String(value)).trim();

	return normalized || '';
};

const renderFencedCodeBlock = (value = '') => {
	const fence = getBacktickFence(value, 3);
	return `\n\n${fence}\n${value}\n${fence}\n\n`;
};

const renderInlineCode = (value = '') => {
	const fence = getBacktickFence(value, 1);
	const padded = /^[\s`]|[\s`]$/u.test(value) ? ` ${value} ` : value;
	return `${fence}${padded}${fence}`;
};

const isMarkdownImageLine = (value = '') => /^!\[[\s\S]*\]\([\s\S]+\)$/.test(value.trim());

const isMarkdownLinkLine = (value = '') =>
	/^\[[\s\S]+\]\([\s\S]+\)$/.test(value.trim()) && !isMarkdownImageLine(value);

const endsWithSentencePunctuation = (value = '') => /[.!?]["')\]]*$/u.test(value.trim());

const hasContinuationFormatting = (lines) => {
	const textLines = lines.filter(
		(line) => !isMarkdownImageLine(line) && !isMarkdownLinkLine(line),
	);

	if (textLines.length < 3) {
		return false;
	}

	const continuationLines = textLines.filter(
		(line) => !endsWithSentencePunctuation(line),
	).length;

	return continuationLines / textLines.length >= 0.5;
};

const renderListItems = (items) =>
	items
		.map((lines) => {
			const [firstLine, ...rest] = lines;

			if (!firstLine) {
				return '';
			}

			if (rest.length === 0) {
				return `- ${firstLine}`;
			}

			return `- ${firstLine}\n  ${rest.join(' ')}`;
		})
		.filter(Boolean)
		.join('\n');

const splitBreakChunks = (source = '') =>
	source
		.replace(/\r\n?/g, '\n')
		.split(MULTI_BREAK_PATTERN)
		.map((chunk) =>
			chunk
				.split(SINGLE_BREAK_PATTERN)
				.map((line) => line.trim())
				.filter(Boolean),
		)
		.filter((chunk) => chunk.length > 0);

const renderTextLines = (lines) => {
	if (lines.length === 0) {
		return '';
	}

	if (
		lines.some(isMarkdownImageLine) ||
		hasContinuationFormatting(lines) ||
		(lines.length === 2 &&
			isMarkdownLinkLine(lines[0]) &&
			!isMarkdownLinkLine(lines[1]) &&
			!isMarkdownImageLine(lines[1]))
	) {
		return lines.join('\n');
	}

	if (lines.length === 1) {
		return lines[0];
	}

	return lines.join('\n\n');
};

const renderSingleBreakChunk = (lines) => {
	if (lines.length === 0) {
		return '';
	}

	if (lines.every(isMarkdownLinkLine) && lines.length >= 2) {
		return renderListItems(lines.map((line) => [line]));
	}

	for (let index = 1; index <= lines.length - 2; index += 1) {
		const trailingLines = lines.slice(index);

		if (trailingLines.length >= 2 && trailingLines.every(isMarkdownLinkLine)) {
			const intro = renderTextLines(lines.slice(0, index));
			const list = renderListItems(trailingLines.map((line) => [line]));

			return [intro, list].filter(Boolean).join('\n\n');
		}
	}

	return renderTextLines(lines);
};

const isBreakListChunk = (lines) =>
	lines.length >= 1 &&
	isMarkdownLinkLine(lines[0]) &&
	lines.every((line) => !isMarkdownImageLine(line));

const renderBreakSeparatedContentToMarkdown = (source = '') => {
	if (!BREAK_PATTERN.test(source)) {
		return source.trim();
	}

	const chunks = splitBreakChunks(source);
	const rendered = [];

	for (let index = 0; index < chunks.length; ) {
		const chunk = chunks[index];
		const nextChunk = chunks[index + 1];
		const introChunk =
			chunk.length === 1 && /:\s*$/u.test(chunk[0]) && nextChunk && isBreakListChunk(nextChunk);

		if (introChunk) {
			let listEnd = index + 1;

			while (listEnd < chunks.length && isBreakListChunk(chunks[listEnd])) {
				listEnd += 1;
			}

			const listChunks = chunks.slice(index + 1, listEnd);

			if (listChunks.length >= 2) {
				rendered.push(`${chunk[0]}\n\n${renderListItems(listChunks)}`);
				index = listEnd;
				continue;
			}
		}

		if (isBreakListChunk(chunk)) {
			let listEnd = index;

			while (listEnd < chunks.length && isBreakListChunk(chunks[listEnd])) {
				listEnd += 1;
			}

			const listChunks = chunks.slice(index, listEnd);

			if (listChunks.length >= 2) {
				rendered.push(renderListItems(listChunks));
				index = listEnd;
				continue;
			}
		}

		rendered.push(renderSingleBreakChunk(chunk));
		index += 1;
	}

	return rendered.filter(Boolean).join('\n\n').trim();
};

const convertImagesToMarkdown = (source) =>
	source.replace(IMAGE_PATTERN, (match, attributeSource) => {
		const attributes = getAttributes(attributeSource);
		const src = attributes.src;

		if (!src) {
			return match;
		}

		const normalizedSrc = normalizeImageSource(src);

		if (shouldDropTrackingPixel(attributes, normalizedSrc)) {
			return '';
		}

		if (normalizedSrc.startsWith('/')) {
			const absoluteImagePath = path.join(
				PUBLIC_DIR,
				normalizedSrc.replace(/^\//, ''),
			);

			if (!path.normalize(absoluteImagePath).startsWith(PUBLIC_DIR)) {
				throw new Error(
					`Refusing to convert suspicious local image path: ${normalizedSrc}`,
				);
			}

			throwIfMissingLocalImage(absoluteImagePath, normalizedSrc);
		}

		return toMarkdownImage(
			normalizedSrc,
			attributes.alt ?? '',
			attributes.title ?? '',
		);
	});

const convertAnchorsToMarkdown = (source) =>
	source.replace(ANCHOR_PATTERN, (match, attributeSource, content) => {
		const attributes = getAttributes(attributeSource);
		const href = attributes.href;

		if (!href) {
			return match;
		}

		if (/^\s*javascript:/i.test(href)) {
			return match;
		}

		const label = content.replace(/\s+/g, ' ').trim();

		if (!label) {
			return href;
		}

		if (label.startsWith('![')) {
			const safeHref = escapeMarkdownUrl(href.trim());

			if (attributes.title) {
				return `[${label}](${safeHref} "${escapeMarkdownTitle(attributes.title.trim())}")`;
			}

			return `[${label}](${safeHref})`;
		}

		return toMarkdownLink(
			href,
			escapeMarkdownLabel(label),
			attributes.title ?? '',
		);
	});

const convertItalicsToMarkdown = (source) =>
	source.replace(ITALIC_PATTERN, (_match, _tagName, content) => {
		const normalized = content.trim();

		if (!normalized) {
			return '';
		}

		return `*${normalized}*`;
	});

const convertBoldsToMarkdown = (source) =>
	source.replace(BOLD_PATTERN, (match, attributeSource, content) => {
		if (attributeSource.trim()) {
			return match;
		}

		const normalized = content.trim();

		if (!normalized) {
			return '';
		}

		return `**${normalized}**`;
	});

const convertStrongsToMarkdown = (source) =>
	source.replace(STRONG_PATTERN, (match, attributeSource, content) => {
		if (attributeSource.trim()) {
			return match;
		}

		const normalized = content.trim();

		if (!normalized) {
			return '';
		}

		return `**${normalized}**`;
	});

const convertQuotesToMarkdown = (source) =>
	source.replace(Q_PATTERN, (match, attributeSource, content) => {
		if (attributeSource.trim()) {
			return match;
		}

		const normalized = convertBreakAwareInlineContentToMarkdown(content.trim());

		if (!normalized) {
			return '';
		}

		return `"${normalized}"`;
	});

const convertCodeToMarkdown = (source) =>
	source.replace(CODE_PATTERN, (match, attributeSource, content) => {
		if (attributeSource.trim()) {
			return match;
		}

		if (/<br\s*\/?>|\r?\n/i.test(content)) {
			const normalized = normalizeCodeBlockContent(content);
			return normalized === null ? match : renderFencedCodeBlock(normalized);
		}

		const normalized = normalizeInlineCodeContent(content);
		return normalized === null ? match : renderInlineCode(normalized);
	});

const convertInlineSupportedHtmlToMarkdown = (source = '') =>
	convertCodeToMarkdown(
		convertQuotesToMarkdown(
			convertStrongsToMarkdown(
				convertBoldsToMarkdown(
					convertItalicsToMarkdown(
						convertAnchorsToMarkdown(convertImagesToMarkdown(source)),
					),
				),
			),
		),
	);

const convertPreformattedBlocksToMarkdown = (source) =>
	source.replace(PRE_PATTERN, (match, attributeSource, content) => {
		if (attributeSource.trim()) {
			return match;
		}

		const normalized = normalizeCodeBlockContent(content);
		return normalized === null ? match : renderFencedCodeBlock(normalized);
	});

const convertBreakAwareInlineContentToMarkdown = (source = '') =>
	renderBreakSeparatedContentToMarkdown(convertInlineSupportedHtmlToMarkdown(source));

const convertFooterNotesToMarkdown = (source) =>
	source.replace(FOOTER_NOTE_PATTERN, (match, _tagName, attributeSource, content) => {
		const attributes = getAttributes(attributeSource);

		if (!hasClass(attributes.class, 'footer_note')) {
			return match;
		}

		const normalized = convertBreakAwareInlineContentToMarkdown(content.trim());

		if (!normalized) {
			return '';
		}

		return `\n\n:::footer-note\n${normalized}\n:::\n\n`;
	});

const convertUnorderedListsToMarkdown = (source) =>
	source.replace(UNORDERED_LIST_PATTERN, (match, attributeSource, content) => {
		if (attributeSource.trim()) {
			return match;
		}

		const items = [];
		let matchedContent = '';

		for (const listItemMatch of content.matchAll(LIST_ITEM_PATTERN)) {
			const [, itemAttributes, itemContent] = listItemMatch;

			if (itemAttributes.trim()) {
				return match;
			}

			items.push(convertBreakAwareInlineContentToMarkdown(itemContent.trim()));
			matchedContent += listItemMatch[0];
		}

		const unmatchedContent = content.replace(LIST_ITEM_PATTERN, '').trim();

		if (items.length === 0 || matchedContent.trim() === '' || unmatchedContent !== '') {
			return match;
		}

		return `\n\n${items.map((item) => `- ${item}`).join('\n')}\n\n`;
	});

const convertOrderedListsToMarkdown = (source) =>
	source.replace(ORDERED_LIST_PATTERN, (match, attributeSource, content) => {
		if (attributeSource.trim()) {
			return match;
		}

		const items = [];
		let matchedContent = '';

		for (const listItemMatch of content.matchAll(LIST_ITEM_PATTERN)) {
			const [, itemAttributes, itemContent] = listItemMatch;

			if (itemAttributes.trim()) {
				return match;
			}

			items.push(convertBreakAwareInlineContentToMarkdown(itemContent.trim()));
			matchedContent += listItemMatch[0];
		}

		const unmatchedContent = content.replace(LIST_ITEM_PATTERN, '').trim();

		if (items.length === 0 || matchedContent.trim() === '' || unmatchedContent !== '') {
			return match;
		}

		return `\n\n${items.map((item, index) => `${index + 1}. ${item}`).join('\n')}\n\n`;
	});

const convertParagraphsToMarkdown = (source) =>
	source
		.replace(PARAGRAPH_PATTERN, (match, attributeSource, content) => {
			if (attributeSource.trim()) {
				return match;
			}

			const normalized = convertBreakAwareInlineContentToMarkdown(content.trim());

			if (!normalized) {
				return '\n\n';
			}

			return `\n\n${normalized}\n\n`;
		})
		.replace(/\n{3,}/g, '\n\n')
		.trim();

const convertHeadingsToMarkdown = (source) =>
	source.replace(H4_PATTERN, (match, attributeSource, content) => {
		if (attributeSource.trim()) {
			return match;
		}

		const normalized = convertBreakAwareInlineContentToMarkdown(content.trim());

		if (!normalized) {
			return '';
		}

		return `\n\n#### ${normalized}\n\n`;
	});

const convertSupportedBlockChildrenToMarkdown = (source = '') =>
	convertParagraphsToMarkdown(
		convertOrderedListsToMarkdown(
			convertUnorderedListsToMarkdown(
				convertHeadingsToMarkdown(convertPreformattedBlocksToMarkdown(convertFooterNotesToMarkdown(source))),
			),
		),
	);

const convertBlockquotesToMarkdown = (source) =>
	source.replace(BLOCKQUOTE_PATTERN, (match, attributeSource, content) => {
		if (attributeSource.trim()) {
			return match;
		}

		const normalized = convertSupportedBlockChildrenToMarkdown(content).trim();

		if (!normalized) {
			return '';
		}

		const quoted = normalized
			.split('\n')
			.map((line) => (line ? `> ${line}` : '>'))
			.join('\n');

		return `\n\n${quoted}\n\n`;
	});

const convertSupportedHtmlToMarkdown = (value = '') =>
	renderBreakSeparatedContentToMarkdown(
		convertInlineSupportedHtmlToMarkdown(
			convertParagraphsToMarkdown(
				convertBlockquotesToMarkdown(convertSupportedBlockChildrenToMarkdown(value)),
			),
		),
	)
		.replace(/\n{3,}/g, '\n\n')
		.trim();

const hasBalancedAnchors = (value = '') => {
	const openCount = (value.match(/<a\b[^>]*>/gi) || []).length;
	const closeCount = (value.match(/<\/a>/gi) || []).length;

	return openCount === closeCount;
};

const hasOnlyPlainParagraphTags = (value = '') =>
	![...value.matchAll(/<p\b([^>]*)>/gi)].some((match) => match[1].trim());

const hasOnlyPlainListTags = (value = '') =>
	![...value.matchAll(/<(ul|li)\b([^>]*)>/gi)].some((match) => match[2].trim());

const hasOnlyPlainBlockquoteTags = (value = '') =>
	![...value.matchAll(/<blockquote\b([^>]*)>/gi)].some((match) => match[1].trim());

const hasOnlyPlainBoldTags = (value = '') =>
	![...value.matchAll(/<b\b([^>]*)>/gi)].some((match) => match[1].trim());

const hasOnlyPlainH4Tags = (value = '') =>
	![...value.matchAll(/<h4\b([^>]*)>/gi)].some((match) => match[1].trim());

const hasOnlyPlainCodeTags = (value = '') =>
	![...value.matchAll(CODE_PATTERN)].some(
		([, attributes, content]) =>
			attributes.trim() ||
			((/<br\s*\/?>|\r?\n/i.test(content)
				? normalizeCodeBlockContent(content)
				: normalizeInlineCodeContent(content)) === null),
	);

const hasOnlyPlainPreTags = (value = '') =>
	![...value.matchAll(PRE_PATTERN)].some(
		([, attributes, content]) =>
			attributes.trim() || normalizeCodeBlockContent(content) === null,
	);

const hasJavascriptAnchors = (value = '') =>
	/<a\b[^>]*href\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|\s*javascript:[^\s>]+)/i.test(
		value,
	);

export {
	convertSupportedHtmlToMarkdown,
	hasBalancedAnchors,
	hasJavascriptAnchors,
	hasOnlyPlainBlockquoteTags,
	hasOnlyPlainBoldTags,
	hasOnlyPlainCodeTags,
	hasOnlyPlainH4Tags,
	hasOnlyPlainListTags,
	hasOnlyPlainParagraphTags,
	hasOnlyPlainPreTags,
};
