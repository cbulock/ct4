import fs from 'node:fs/promises';
import path from 'node:path';
import matter from './lib/frontmatter.mjs';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const SEARCH_INDEX_PATH = path.join(ROOT_DIR, 'public', 'search-index.json');

const decodeHtmlEntities = (value = '') =>
	String(value)
		.replace(/&nbsp;/gi, ' ')
		.replace(/&amp;/gi, '&')
		.replace(/&lt;/gi, '<')
		.replace(/&gt;/gi, '>')
		.replace(/&quot;/gi, '"')
		.replace(/&#39;|&apos;/gi, "'");

const stripHtml = (value = '') =>
	decodeHtmlEntities(
		String(value)
			.replace(/<br\s*\/?>/gi, ' ')
			.replace(/<\/p>|<\/div>|<\/li>|<\/h[1-6]>/gi, ' ')
			.replace(/<[^>]+>/g, ' '),
	)
		.replace(/\s+/g, ' ')
		.trim();

const sortEntries = (left, right) => Number(left.sortOrder) - Number(right.sortOrder);

const loadEntries = async () => {
	const fileNames = (await fs.readdir(POSTS_DIR))
		.filter((fileName) => fileName.endsWith('.md'))
		.sort();

	const entries = await Promise.all(
		fileNames.map(async (fileName) => {
			const filePath = path.join(POSTS_DIR, fileName);
			const source = await fs.readFile(filePath, 'utf8');
			const { data, content } = matter(source);

			return {
				...data,
				body: content,
			};
		}),
	);

	return entries.sort(sortEntries);
};

const buildSearchIndex = (entries) => {
	const canonicalRouteKeys = new Set();

	return entries.flatMap((entry) => {
		if (canonicalRouteKeys.has(entry.routeKey)) {
			return [];
		}

		canonicalRouteKeys.add(entry.routeKey);

		return [
			{
				entryId: entry.entryId,
				sortOrder: Number(entry.sortOrder),
				title: entry.title,
				keywords: stripHtml(entry.keywords ?? ''),
				body: stripHtml(entry.body ?? ''),
				path: `/${entry.routeYear}/${entry.routeMonth}/${entry.basename}`,
			},
		];
	});
};

const main = async () => {
	const entries = await loadEntries();
	const searchIndex = buildSearchIndex(entries);

	await fs.mkdir(path.dirname(SEARCH_INDEX_PATH), { recursive: true });
	await fs.writeFile(
		SEARCH_INDEX_PATH,
		`${JSON.stringify(searchIndex, null, 2)}\n`,
	);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
