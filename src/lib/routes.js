const cleanEntryBasename = (entryBasename = '') =>
	entryBasename.replace(/\.html$/, '');

const getEntryPath = (entry, { legacyHtml = false } = {}) => {
	const suffix = legacyHtml ? '.html' : '';

	return `/${entry.routeYear}/${entry.routeMonth}/${entry.basename}${suffix}`;
};

export { cleanEntryBasename, getEntryPath };
