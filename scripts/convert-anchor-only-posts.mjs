import fs from 'node:fs/promises';
import path from 'node:path';
import matter from './lib/frontmatter.mjs';
import {
	convertSupportedHtmlToMarkdown,
	hasBalancedAnchors,
} from './lib/convert-supported-html.mjs';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const HTML_TAG_PATTERN = /<(?!!--)[^>]+>/;
const ANCHOR_OPEN_PATTERN = /<a\b[^>]*>/i;

const isAnchorOnlyCandidate = (source) => {
	const { content } = matter(source);

	if (!ANCHOR_OPEN_PATTERN.test(content)) {
		return false;
	}

	const withoutAnchors = content
		.replace(/<a\b[^>]*>/gi, '')
		.replace(/<\/a>/gi, '');

	return !HTML_TAG_PATTERN.test(withoutAnchors);
};

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
		const nextData = { ...parsed.data };

		if (typeof nextData.excerpt === 'string' && hasBalancedAnchors(nextData.excerpt)) {
			nextData.excerpt = convertSupportedHtmlToMarkdown(nextData.excerpt);
		}

		const nextContent = convertSupportedHtmlToMarkdown(parsed.content);
		const convertedSource = matter.stringify(nextContent, nextData);

		if (convertedSource !== source) {
			await fs.writeFile(filePath, convertedSource);
			updatedCount += 1;
		}
	}

	console.log(`Converted ${updatedCount} anchor-only post(s) to markdown.`);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
