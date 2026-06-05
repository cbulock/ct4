import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
	hasJavascriptAnchors,
	hasOnlyPlainParagraphTags,
} from './lib/convert-supported-html.mjs';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const HTML_TAG_PATTERN = /<(?!!--)[^>]+>/;

const stripSupportedTags = (value = '') =>
	value
		.replace(/<a\b[^>]*>/gi, '')
		.replace(/<\/a>/gi, '')
		.replace(/<img\b[^>]*>/gi, '')
		.replace(/<(i|em)\b[^>]*>/gi, '')
		.replace(/<\/(i|em)>/gi, '')
		.replace(/<p\b[^>]*>/gi, '')
		.replace(/<\/p>/gi, '');

const hasParagraphs = (value = '') => /<p\b|<\/p>/i.test(value);

const main = () => {
	const [, , providedLimit] = process.argv;
	const limit = Number.isFinite(Number(providedLimit)) ? Number(providedLimit) : 20;
	const fileNames = fs
		.readdirSync(POSTS_DIR)
		.filter((fileName) => fileName.endsWith('.md'))
		.sort();

	const candidates = fileNames
		.map((fileName) => {
			const filePath = path.join(POSTS_DIR, fileName);
			const source = fs.readFileSync(filePath, 'utf8');
			const { data, content } = matter(source);
			const excerpt = String(data.excerpt ?? '');

			return {
				fileName,
				data,
				content,
				excerpt,
			};
		})
		.filter((post) => (post.data.contentFormat ?? 'legacy') === 'legacy')
		.filter((post) => hasParagraphs(post.content) || hasParagraphs(post.excerpt))
		.filter((post) => hasOnlyPlainParagraphTags(post.content))
		.filter((post) => hasOnlyPlainParagraphTags(post.excerpt))
		.filter((post) => !hasJavascriptAnchors(post.content))
		.filter((post) => !hasJavascriptAnchors(post.excerpt))
		.filter((post) => !HTML_TAG_PATTERN.test(stripSupportedTags(post.content)))
		.filter((post) => !HTML_TAG_PATTERN.test(stripSupportedTags(post.excerpt)))
		.map((post) => ({
			filePath: `content/posts/${post.fileName}`,
			title: post.data.title,
			paragraphCount: (post.content.match(/<p\b/gi) || []).length,
			anchorCount: (post.content.match(/<a\b/gi) || []).length,
			imageCount: (post.content.match(/<img\b/gi) || []).length,
			italicCount: (post.content.match(/<(i|em)\b/gi) || []).length,
		}));

	console.log(
		JSON.stringify(
			{
				count: candidates.length,
				candidates: candidates.slice(0, limit),
			},
			null,
			2,
		),
	);
};

main();
