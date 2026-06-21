import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { convertSupportedHtmlToMarkdown } from './lib/convert-supported-html.mjs';

const ROOT_DIR = process.cwd();

const main = async () => {
	const [, , ...providedPaths] = process.argv;

	if (providedPaths.length === 0) {
		throw new Error('Usage: node scripts/convert-br-posts.mjs <post-file> [post-file ...]');
	}

	for (const providedPath of providedPaths) {
		const filePath = path.isAbsolute(providedPath)
			? providedPath
			: path.join(ROOT_DIR, providedPath);
		const source = await fs.readFile(filePath, 'utf8');
		const parsed = matter(source);
		const nextData = { ...parsed.data };

		if (typeof nextData.excerpt === 'string' && nextData.excerpt) {
			nextData.excerpt = convertSupportedHtmlToMarkdown(nextData.excerpt);
		}

		const nextContent = convertSupportedHtmlToMarkdown(parsed.content);
		const nextSource = matter.stringify(nextContent, nextData);

		await fs.writeFile(filePath, nextSource);
	}

	console.log(`Converted ${providedPaths.length} br post(s) to markdown.`);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
