import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getEntriesPerYear } from 'utils/entryData';

import EntryList from 'components/common/EntryList';

const Year = () => {
	const { year } = useParams();

	const entriesPerYear = useMemo(() => getEntriesPerYear(year), [year]);

	return (
		<>
			<Helmet>
				<title>{`${year} - Cameron's Thoughts`}</title>
			</Helmet>
			<EntryList entries={entriesPerYear} />
		</>
	);
};

export default Year;
