import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypeCindorCodeBlocks } from './astro-markdown/rehypeCindorCodeBlocks.mjs';
import { remarkLegacyContainers } from './astro-markdown/remarkLegacyContainers.mjs';

const decodeHtmlEntities = (value) =>
	String(value)
		.replace(/&nbsp;/gi, ' ')
		.replace(/&lt;/gi, '<')
		.replace(/&gt;/gi, '>')
		.replace(/&quot;/gi, '"')
		.replace(/&#39;|&apos;/gi, "'")
		.replace(/&amp;/gi, '&');

const stripHtml = (value = '') =>
	decodeHtmlEntities(
		String(value)
			.replace(/<br\s*\/?>/gi, ' ')
			.replace(/<\/p>|<\/div>|<\/li>|<\/h[1-6]>/gi, ' ')
			.replace(/<[^>]+>/g, ' '),
	)
		.replace(/\s+/g, ' ')
		.trim();

const renderMarkdownFragmentToHtml = async (value = '') => {
	if (!value) {
		return '';
	}

	const file = await unified()
		.use(remarkParse)
		.use(remarkLegacyContainers)
		.use(remarkRehype)
		.use(rehypeCindorCodeBlocks)
		.use(rehypeStringify)
		.process(value);

	return String(file);
};

const getExcerptPreview = async (value = '', maxLength = 240) => {
	const text = stripHtml(await renderMarkdownFragmentToHtml(value));

	if (!text || text.length <= maxLength) {
		return text;
	}

	const shortened = text.slice(0, maxLength);
	const boundaryIndex = shortened.lastIndexOf(' ');

	return `${shortened.slice(0, boundaryIndex > 0 ? boundaryIndex : maxLength)}...`;
};

export { getExcerptPreview };
