export default (createdDate, basename) => {
	const month = new Date(createdDate).toLocaleDateString('en-us', {
		month: '2-digit',
	});
	const year = new Date(createdDate).toLocaleDateString('en-us', {
		year: 'numeric',
	});

	return `/${year}/${month}/${basename}`;
};
