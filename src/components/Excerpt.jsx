import PropTypes from 'prop-types';
import styled from 'styled-components';
import getEntryPath from 'utils/getEntryPath';
import formatEntryContent from 'utils/formatEntryContent';

const SContainer = styled.div`
	margin: 1em auto;
	padding: 1em;
	border: 1px solid;
	max-width: 800px;
`;

const Excerpt = ({ entry }) => {
	const {
		entry_id: id,
		entry_title: title,
		entry_excerpt: excerpt,
		entry_created_on: createdDate,
		entry_basename: basename,
	} = entry;

	return (
		<SContainer key={id}>
			<h3>
				<a href={getEntryPath(createdDate, basename)}>{title}</a>
			</h3>
			<p>{formatEntryContent(excerpt)}</p>
		</SContainer>
	);
};

Excerpt.propTypes = {
	entry: PropTypes.shape({
		entry_id: PropTypes.number.isRequired,
		entry_title: PropTypes.string.isRequired,
		entry_excerpt: PropTypes.string.isRequired,
		entry_created_on: PropTypes.string.isRequired,
		entry_basename: PropTypes.string.isRequired,
	}).isRequired,
};

export default Excerpt;
