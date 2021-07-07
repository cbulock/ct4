import PropTypes from 'prop-types';

const EntryList = ({ entries }) => (
	<>
		{entries.map((entry) => (
			<div key={entry.id}>
				<a href={`/${entry.year}/${entry.month}/${entry.basename}`}>
					{entry.title}
				</a>
			</div>
		))}
	</>
);

EntryList.propTypes = {
	entries: PropTypes.arrayOf([
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			year: PropTypes.number.isRequired,
			month: PropTypes.number.isRequired,
			basename: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}),
	]).isRequired,
};

export default EntryList;
