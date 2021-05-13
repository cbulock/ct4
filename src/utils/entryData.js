import entries from 'entries';

const entryData = entries.map((entry) => {
	const {
		entry_basename: basename,
		entry_created_on: createdDate,
		entry_id: id,
		entry_title: title,
	} = entry;
	const month = new Date(createdDate).toLocaleDateString('en-us', {
		month: '2-digit',
	});
	const year = new Date(createdDate).toLocaleDateString('en-us', {
		year: 'numeric',
	});
	return { basename, id, month, title, year };
});

const entryYears = [...new Set(entryData.map((e) => e.year))].sort();

const getEntriesPerYear = (year) =>
	entryData.filter((entry) => entry.year === year);

export default entryData;
export { entryYears, getEntriesPerYear };
