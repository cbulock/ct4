import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getIdFromBasename, getCategoryById } from 'utils/categoryData';
import { getEntriesPerCategory } from 'utils/entryData';

import EntryList from 'components/common/EntryList';

const Category = () => {
	const { categoryBasename } = useParams();

	const categoryId = getIdFromBasename(categoryBasename);
	const categoryData = getCategoryById(categoryId);

	const entriesPerCategory = useMemo(() => getEntriesPerCategory(categoryId), [
		categoryId,
	]);

	return (
		<>
			<Helmet>
				<title>{`${categoryData?.category_label} - Cameron's Thoughts`}</title>
			</Helmet>
			<EntryList entries={entriesPerCategory} />
		</>
	);
};

export default Category;
