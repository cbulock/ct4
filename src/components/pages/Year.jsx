import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getEntriesPerYear } from 'utils/entryData';

const Year = () => {
	const { year } = useParams();

	const entriesPerYear = useMemo(() => getEntriesPerYear(year), [year]);

	return (
		<>
			<Helmet>
				<title>{`${year} - Cameron's Thoughts`}</title>
			</Helmet>
			{entriesPerYear.map((entry) => (
				<div key={entry.id}>
					<a href={`/${entry.year}/${entry.month}/${entry.basename}`}>
						{entry.title}
					</a>
				</div>
			))}
		</>
	);
};

export default Year;
