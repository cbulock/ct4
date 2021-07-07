import categories from 'categories';

const getCategoryById = (id) =>
	categories.find((cat) => id === cat.category_id);

const getIdFromBasename = (basename) =>
	categories.find((cat) => basename === cat.category_basename)?.category_id;

export { getCategoryById, getIdFromBasename };
export default categories;
