import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { cleanEntryBasename, getEntryPath } from './routes';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const CATEGORIES_PATH = path.join(process.cwd(), 'src', 'data', 'categories.json');

let cachedEntries;
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

const readEntries = () => {
	if (cachedEntries) {
		return cachedEntries;
	}

	const entries = fs
		.readdirSync(POSTS_DIR)
		.filter((fileName) => fileName.endsWith('.md'))
		.sort()
		.map((fileName) => {
			const filePath = path.join(POSTS_DIR, fileName);
			const source = fs.readFileSync(filePath, 'utf8');
			const { data, content } = matter(source);

			return {
				...data,
				body: content,
				basename: data.basename,
				categoryId: data.categoryId ?? null,
				path: getEntryPath(data),
			};
		})
		.sort(sortEntries);

	cachedEntries = entries;

	return entries;
};

const readCategories = () => {
	if (cachedCategories) {
		return cachedCategories;
	}

	cachedCategories = JSON.parse(fs.readFileSync(CATEGORIES_PATH, 'utf8'));

	return cachedCategories;
};

const getAllEntries = () => readEntries();

const getCanonicalEntries = () => {
	const routeMap = new Map();

	for (const entry of getAllEntries()) {
		if (!routeMap.has(entry.routeKey)) {
			routeMap.set(entry.routeKey, entry);
		}
	}

	return [...routeMap.values()];
};

const getEntryByRoute = (year, month, entryBasename) => {
	const routeKey = `${year}/${month}/${cleanEntryBasename(entryBasename)}`;

	return getCanonicalEntries().find((entry) => entry.routeKey === routeKey);
};

const getEntryYears = () =>
	[...new Set(getCanonicalEntries().map((entry) => entry.routeYear))].sort();

const getEntriesForYear = (year) =>
	getCanonicalEntries().filter((entry) => entry.routeYear === year);

const getCategories = () => readCategories();

const getCategoryByBasename = (categoryBasename) =>
	getCategories().find((category) => category.basename === categoryBasename);

const getCategoryById = (categoryId) =>
	getCategories().find((category) => category.id === categoryId);

const getEntriesForCategory = (categoryId) =>
	getCanonicalEntries().filter((entry) => entry.categoryId === categoryId);

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
