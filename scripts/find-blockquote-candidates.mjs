import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
	hasJavascriptAnchors,
	hasOnlyPlainBlockquoteTags,
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
		.replace(
			/<(p|div)\b[^>]*class\s*=\s*(?:"[^"]*\bfooter_note\b[^"]*"|'[^']*\bfooter_note\b[^']*')[^>]*>/gi,
			'',
		)
		.replace(/<\/(p|div)>/gi, '')
		.replace(/<p\b[^>]*>/gi, '')
		.replace(/<\/p>/gi, '')
		.replace(/<ul\b[^>]*>/gi, '')
		.replace(/<\/ul>/gi, '')
		.replace(/<li\b[^>]*>/gi, '')
		.replace(/<\/li>/gi, '')
		.replace(/<blockquote\b[^>]*>/gi, '')
		.replace(/<\/blockquote>/gi, '');

const hasBlockquotes = (value = '') => /<blockquote\b|<\/blockquote>/i.test(value);

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
		.filter((post) => hasBlockquotes(post.content) || hasBlockquotes(post.excerpt))
		.filter((post) => hasOnlyPlainBlockquoteTags(post.content))
		.filter((post) => hasOnlyPlainBlockquoteTags(post.excerpt))
		.filter((post) => !hasJavascriptAnchors(post.content))
		.filter((post) => !hasJavascriptAnchors(post.excerpt))
		.filter((post) => !HTML_TAG_PATTERN.test(stripSupportedTags(post.content)))
		.filter((post) => !HTML_TAG_PATTERN.test(stripSupportedTags(post.excerpt)))
		.map((post) => ({
			filePath: `content/posts/${post.fileName}`,
			title: post.data.title,
			blockquoteCount: (post.content.match(/<blockquote\b/gi) || []).length,
			anchorCount: (post.content.match(/<a\b/gi) || []).length,
			imageCount: (post.content.match(/<img\b/gi) || []).length,
			listCount: (post.content.match(/<li\b/gi) || []).length,
			paragraphCount: (post.content.match(/<p\b/gi) || []).length,
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
