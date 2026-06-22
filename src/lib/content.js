import fs from 'node:fs';
import path from 'node:path';
import { getCollection } from 'astro:content';
import { cleanEntryBasename, getEntryPath } from './routes';

const CATEGORIES_PATH = path.join(process.cwd(), 'src', 'data', 'categories.json');

let cachedEntriesPromise;
let cachedCategories;

const sortEntries = (left, right) => left.sortOrder - right.sortOrder;

const decodeHtmlEntities = (value) =>
	value
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

const getExcerptPreview = (value = '', maxLength = 240) => {
	const text = stripHtml(value);

	if (!text || text.length <= maxLength) {
		return text;
	}

	const shortened = text.slice(0, maxLength);
	const boundaryIndex = shortened.lastIndexOf(' ');

	return `${shortened.slice(0, boundaryIndex > 0 ? boundaryIndex : maxLength)}...`;
};

const formatShortDate = (createdOn) =>
	new Date(createdOn).toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});

const normalizeEntry = (entry) => {
	const data = entry.data;
	const routeYear = String(data.routeYear);
	const routeMonth = String(data.routeMonth).padStart(2, '0');

	return {
		...data,
		routeYear,
		routeMonth,
		_contentEntry: entry,
		body: entry.body,
		basename: data.basename,
		categoryId: data.categoryId ?? null,
		id: entry.id,
		path: getEntryPath({
			...data,
			routeYear,
			routeMonth,
		}),
	};
};

const readEntries = async () => {
	if (cachedEntriesPromise) {
		return cachedEntriesPromise;
	}

	cachedEntriesPromise = getCollection('posts')
		.then((entries) => entries.map(normalizeEntry).sort(sortEntries))
		.catch((error) => {
			cachedEntriesPromise = undefined;
			throw error;
		});

	return cachedEntriesPromise;
};

const readCategories = () => {
	if (cachedCategories) {
		return cachedCategories;
	}

	cachedCategories = JSON.parse(fs.readFileSync(CATEGORIES_PATH, 'utf8'));

	return cachedCategories;
};

const getAllEntries = async () => readEntries();

const getCanonicalEntries = async () => {
	const routeMap = new Map();

	for (const entry of await getAllEntries()) {
		if (!routeMap.has(entry.routeKey)) {
			routeMap.set(entry.routeKey, entry);
		}
	}

	return [...routeMap.values()];
};

const getEntryByRoute = async (year, month, entryBasename) => {
	const routeKey = `${year}/${month}/${cleanEntryBasename(entryBasename)}`;

	return (await getCanonicalEntries()).find((entry) => entry.routeKey === routeKey);
};

const getEntryYears = async () =>
	[...new Set((await getCanonicalEntries()).map((entry) => entry.routeYear))].sort();

const getEntriesForYear = async (year) =>
	(await getCanonicalEntries()).filter((entry) => entry.routeYear === year);

const getCategories = () => readCategories();

const getCategoryByBasename = (categoryBasename) =>
	getCategories().find((category) => category.basename === categoryBasename);

const getCategoryById = (categoryId) =>
	getCategories().find((category) => category.id === categoryId);

const getEntriesForCategory = async (categoryId) =>
	(await getCanonicalEntries()).filter((entry) => entry.categoryId === categoryId);

export {
	formatShortDate,
	getAllEntries,
	getCanonicalEntries,
	getCategories,
	getCategoryByBasename,
	getCategoryById,
	getEntriesForCategory,
	getEntryByRoute,
	getEntriesForYear,
	getEntryPath,
	getEntryYears,
	getExcerptPreview,
};
