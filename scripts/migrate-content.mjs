import fs from 'node:fs/promises';
import path from 'node:path';
import matter from './lib/frontmatter.mjs';

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');

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

const loadLegacyModule = async (relativePath) => {
	const absolutePath = path.join(ROOT_DIR, relativePath);
	const source = await fs.readFile(absolutePath, 'utf8');
	const expression = source.replace(/^export default\s+/, 'return ');

	return new Function(expression)();
};

const toRouteParts = (createdOn) => {
	const match = /^(\d{4})-(\d{2})/.exec(createdOn ?? '');

	if (!match) {
		throw new Error(`Unable to derive route parts from "${createdOn}"`);
	}

	return {
		routeYear: match[1],
		routeMonth: match[2],
	};
};

const toFileStem = (sortOrder, basename, entryId) => {
	const safeBasename = (basename || `entry_${entryId}`).replace(
		/[^a-z0-9_-]/gi,
		'_',
	);

	return `${String(sortOrder).padStart(4, '0')}-${safeBasename}-${entryId}`;
};

const normalizeCategoryId = (categoryId) =>
	categoryId && categoryId !== '0' ? categoryId : null;

const writeJson = async (relativePath, value) => {
	const absolutePath = path.join(ROOT_DIR, relativePath);
	await fs.mkdir(path.dirname(absolutePath), { recursive: true });
	await fs.writeFile(`${absolutePath}`, `${JSON.stringify(value, null, 2)}\n`);
};

const migrate = async () => {
	const entries = await loadLegacyModule(path.join('src', 'entries.js'));
	const categories = await loadLegacyModule(path.join('src', 'categories.js'));

	await fs.rm(POSTS_DIR, { recursive: true, force: true });
	await fs.mkdir(POSTS_DIR, { recursive: true });
	await fs.mkdir(DATA_DIR, { recursive: true });

	const canonicalRouteEntries = new Map();
	const duplicateRoutes = [];
	const entriesWithTextMore = [];
	const searchIndex = [];
	const zeroCategoryEntries = [];

	for (const [index, entry] of entries.entries()) {
		const sortOrder = index + 1;
		const { routeYear, routeMonth } = toRouteParts(entry.entry_created_on);
		const routeKey = `${routeYear}/${routeMonth}/${entry.entry_basename}`;
		const categoryId = normalizeCategoryId(entry.entry_category_id);
		const canonicalRouteEntryId =
			canonicalRouteEntries.get(routeKey) ?? entry.entry_id;
		const isCanonicalRouteEntry = canonicalRouteEntryId === entry.entry_id;

		if (!canonicalRouteEntries.has(routeKey)) {
			canonicalRouteEntries.set(routeKey, entry.entry_id);
		} else {
			duplicateRoutes.push({
				routeKey,
				entryId: entry.entry_id,
				canonicalRouteEntryId,
			});
		}

		if (entry.entry_text_more) {
			entriesWithTextMore.push({
				entryId: entry.entry_id,
				basename: entry.entry_basename,
			});
		}

		if (entry.entry_category_id === '0') {
			zeroCategoryEntries.push({
				entryId: entry.entry_id,
				basename: entry.entry_basename,
			});
		}

		const frontmatter = {
			sortOrder,
			entryId: entry.entry_id,
			blogId: entry.entry_blog_id,
			status: entry.entry_status,
			authorId: entry.entry_author_id,
			allowComments: entry.entry_allow_comments,
			allowPings: entry.entry_allow_pings,
			convertBreaks: entry.entry_convert_breaks,
			categoryId,
			originalCategoryId: entry.entry_category_id,
			title: entry.entry_title,
			excerpt: entry.entry_excerpt ?? '',
			keywords: entry.entry_keywords ?? '',
			createdOn: entry.entry_created_on,
			modifiedOn: entry.entry_modified_on,
			basename: entry.entry_basename,
			atomId: entry.entry_atom_id,
			weekNumber: entry.entry_week_number,
			routeYear,
			routeMonth,
			routeKey,
			canonicalRouteEntryId,
			isCanonicalRouteEntry,
			textMoreIgnored: Boolean(entry.entry_text_more),
		};

		const fileStem = toFileStem(
			sortOrder,
			entry.entry_basename,
			entry.entry_id,
		);
		const fileContents = matter.stringify(entry.entry_text ?? '', frontmatter);

		await fs.writeFile(path.join(POSTS_DIR, `${fileStem}.md`), fileContents);

		if (isCanonicalRouteEntry) {
			searchIndex.push({
				entryId: entry.entry_id,
				sortOrder,
				title: entry.entry_title,
				keywords: stripHtml(entry.entry_keywords ?? ''),
				body: stripHtml(entry.entry_text ?? ''),
				path: `/${routeYear}/${routeMonth}/${entry.entry_basename}`,
			});
		}
	}

	await writeJson(
		path.join('src', 'data', 'categories.json'),
		categories.map((category, index) => ({
			sortOrder: index + 1,
			id: category.category_id,
			label: category.category_label,
			basename: category.category_basename,
			description: category.category_description,
			parent: category.category_parent ?? null,
		})),
	);

	await writeJson(path.join('src', 'data', 'migration-manifest.json'), {
		entryCount: entries.length,
		categoryCount: categories.length,
		canonicalRouteCount: canonicalRouteEntries.size,
		duplicateRoutes,
		entriesWithTextMore,
		zeroCategoryEntries,
	});

	await writeJson(path.join('public', 'search-index.json'), searchIndex);
};

migrate().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
