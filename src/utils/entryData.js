import entries from 'entries';

const entryData = entries.map((entry) => {
	const {
		entry_basename: basename,
		entry_category_id: categoryId,
		entry_created_on: createdDate,
		entry_id: id,
		entry_keywords: keywords,
		entry_text: text,
		entry_title: title,
	} = entry;
	const month = new Date(createdDate).toLocaleDateString('en-us', {
		month: '2-digit',
	});
	const year = new Date(createdDate).toLocaleDateString('en-us', {
		year: 'numeric',
	});
	return { basename, categoryId, id, keywords, month, text, title, year };
});

const entryYears = [...new Set(entryData.map((e) => e.year))].sort();

const getEntriesPerYear = (year) =>
	entryData.filter((entry) => entry.year === year);

const getEntriesPerCategory = (categoryId) =>
	entryData.filter((entry) => entry.categoryId === categoryId);

const getEntriesPerSearch = (term) => {
	const searchTerm = term.toLowerCase();

	const byKeyword = entryData.filter((entry) =>
		entry.keywords?.toLowerCase().includes(searchTerm),
	);
	const byTitle = entryData.filter((entry) =>
		entry.title?.toLowerCase().includes(searchTerm),
	);
	const byText = entryData.filter((entry) =>
		entry.text?.toLowerCase().includes(searchTerm),
	);

	const results = [...byKeyword, ...byTitle, ...byText];

	// remove duplicate results
	return results.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
};

export default entryData;
export {
	entryYears,
	getEntriesPerYear,
	getEntriesPerCategory,
	getEntriesPerSearch,
};
