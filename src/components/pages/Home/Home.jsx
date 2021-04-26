import entries from 'entries';

import Excerpt from 'components/Excerpt';

const NUMBER_OF_POSTS = 5;

const Home = () => {
	const recentEntries = entries.slice(1).slice(-NUMBER_OF_POSTS).reverse();

	return (
		<>
			{recentEntries.map((entry) => (
				<Excerpt entry={entry} />
			))}
		</>
	);
};

export default Home;
