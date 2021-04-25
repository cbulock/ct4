import { Fragment } from 'react';
import parse from 'html-react-parser';
import entries from 'entries';

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

				const month = new Date(createdDate).toLocaleDateString('en-us', {
					month: '2-digit',
				});
				const year = new Date(createdDate).toLocaleDateString('en-us', {
					year: 'numeric',
				});
				return (
					<Fragment key={id}>
						<h3>
							<a href={`/${year}/${month}/${basename}`}>{title}</a>
						</h3>
						{parse(excerpt)}
					</Fragment>
				);
			})}
		</>
	);
};

export default Home;
