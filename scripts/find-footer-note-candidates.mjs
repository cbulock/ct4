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
const FOOTER_NOTE_PATTERN =
	/<(p|div)\b[^>]*class\s*=\s*(?:"[^"]*\bfooter_note\b[^"]*"|'[^']*\bfooter_note\b[^']*')[^>]*>[\s\S]*?<\/\1>/gi;

const stripSupportedTags = (value = '') =>
	value
		.replace(FOOTER_NOTE_PATTERN, (match) =>
			match
				.replace(/<(p|div)\b[^>]*>/i, '')
				.replace(/<\/(p|div)>$/i, ''),
		)
		.replace(/<a\b[^>]*>/gi, '')
		.replace(/<\/a>/gi, '')
		.replace(/<img\b[^>]*>/gi, '')
		.replace(/<(i|em)\b[^>]*>/gi, '')
		.replace(/<\/(i|em)>/gi, '')
		.replace(/<p\b[^>]*>/gi, '')
		.replace(/<\/p>/gi, '');

const hasFooterNotes = (value = '') => FOOTER_NOTE_PATTERN.test(value);
const resetFooterNotePattern = () => {
	FOOTER_NOTE_PATTERN.lastIndex = 0;
};

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
		.filter((post) => {
			const result = hasFooterNotes(post.content) || hasFooterNotes(post.excerpt);
			resetFooterNotePattern();
			return result;
		})
		.filter((post) => hasOnlyPlainParagraphTags(stripSupportedTags(post.content)))
		.filter((post) => hasOnlyPlainParagraphTags(stripSupportedTags(post.excerpt)))
		.filter((post) => !hasJavascriptAnchors(post.content))
		.filter((post) => !hasJavascriptAnchors(post.excerpt))
		.filter((post) => !HTML_TAG_PATTERN.test(stripSupportedTags(post.content)))
		.filter((post) => !HTML_TAG_PATTERN.test(stripSupportedTags(post.excerpt)))
		.map((post) => ({
			filePath: `content/posts/${post.fileName}`,
			title: post.data.title,
			footerNoteCount: (post.content.match(/\bfooter_note\b/gi) || []).length,
			paragraphCount: (post.content.match(/<p\b/gi) || []).length,
			anchorCount: (post.content.match(/<a\b/gi) || []).length,
			imageCount: (post.content.match(/<img\b/gi) || []).length,
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
