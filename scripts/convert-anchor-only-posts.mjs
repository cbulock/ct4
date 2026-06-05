import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {
	convertSupportedHtmlToMarkdown,
	hasBalancedAnchors,
} from './lib/convert-supported-html.mjs';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const HTML_TAG_PATTERN = /<(?!!--)[^>]+>/;
const ANCHOR_OPEN_PATTERN = /<a\b[^>]*>/i;

const isAnchorOnlyCandidate = (source) => {
	const { data, content } = matter(source);

	if ((data.contentFormat ?? 'legacy') !== 'legacy') {
		return false;
	}

	if (!ANCHOR_OPEN_PATTERN.test(content)) {
		return false;
	}

	const withoutAnchors = content
		.replace(/<a\b[^>]*>/gi, '')
		.replace(/<\/a>/gi, '');

	return !HTML_TAG_PATTERN.test(withoutAnchors);
};

const setContentFormatMarkdown = (source) =>
	source.replace(/^contentFormat:\s*legacy\s*$/m, 'contentFormat: markdown');

const main = async () => {
	const fileNames = (await fs.readdir(POSTS_DIR))
		.filter((fileName) => fileName.endsWith('.md'))
		.sort();

	let updatedCount = 0;

	for (const fileName of fileNames) {
		const filePath = path.join(POSTS_DIR, fileName);
		const source = await fs.readFile(filePath, 'utf8');

		if (!isAnchorOnlyCandidate(source)) {
			continue;
		}

		const parsed = matter(source);
		const nextData = { ...parsed.data, contentFormat: 'markdown' };

		if (typeof nextData.excerpt === 'string' && hasBalancedAnchors(nextData.excerpt)) {
			nextData.excerpt = convertSupportedHtmlToMarkdown(nextData.excerpt);
		}

		const nextContent = convertSupportedHtmlToMarkdown(parsed.content);
		const convertedSource = matter.stringify(nextContent, nextData);

		if (convertedSource !== source) {
			await fs.writeFile(filePath, convertedSource.replace(/^contentFormat:\s*markdown\s*$/m, 'contentFormat: markdown'));
			updatedCount += 1;
		}
	}

	console.log(`Converted ${updatedCount} anchor-only post(s) to markdown.`);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
