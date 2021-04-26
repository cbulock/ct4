import { Fragment } from 'react';
import entries from 'entries';
import getEntryPath from 'utils/getEntryPath';
import formatEntryContent from 'utils/formatEntryContent';

const NUMBER_OF_POSTS = 5;

const Home = () => {
	const recentEntries = entries.slice(1).slice(-NUMBER_OF_POSTS).reverse();

	return (
		<>
			{recentEntries.map((entry) => {
				const {
					entry_id: id,
					entry_title: title,
					entry_excerpt: excerpt,
					entry_created_on: createdDate,
					entry_basename: basename,
				} = entry;

				return (
					<Fragment key={id}>
						<h3>
							<a href={getEntryPath(createdDate, basename)}>{title}</a>
						</h3>
						<p>{formatEntryContent(excerpt)}</p>
					</Fragment>
				);
			})}
		</>
	);
};

export default Home;
