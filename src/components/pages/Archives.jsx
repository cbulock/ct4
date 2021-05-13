import { Helmet } from 'react-helmet';
import { entryYears } from 'utils/entryData';

const Archives = () => (
	<>
		<Helmet>
			<title>Archives - Cameron&apos;s Thoughts</title>
		</Helmet>
		<h2>Archives</h2>
		{entryYears.map((year) => (
			<h3 key={year}>
				<a href={`/${year}`}>{year}</a>
			</h3>
		))}
	</>
);

export default Archives;
