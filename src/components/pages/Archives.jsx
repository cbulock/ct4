import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { entryYears } from 'utils/entryData';
import categories from 'categories';

const SColumns = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Archives = () => (
	<>
		<Helmet>
			<title>Archives - Cameron&apos;s Thoughts</title>
		</Helmet>
		<h2>Archives</h2>
		<SColumns>
			<div>
				<h3>By Year</h3>
				{entryYears
					.map((year) => (
						<h3 key={year}>
							<a href={`/${year}`}>{year}</a>
						</h3>
					))
					.reverse()}
			</div>
			<div>
				<h3>By Category</h3>
				{categories
					.sort((a, b) => {
						const { category_label: labelA } = a;
						const { category_label: labelB } = b;
						if (labelA < labelB) {
							return -1;
						}
						if (labelA > labelB) {
							return 1;
						}
						return 0;
					})
					.map((category) => {
						const {
							category_id: id,
							category_basename: basename,
							category_label: label,
						} = category;
						return (
							<h3 key={id}>
								<a href={`/cat/${basename}`}>{label}</a>
							</h3>
						);
					})}
			</div>
		</SColumns>
	</>
);

export default Archives;
