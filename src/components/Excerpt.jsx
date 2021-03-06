import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import getEntryPath from 'utils/getEntryPath';
import formatEntryContent from 'utils/formatEntryContent';

const STitle = styled.h3`
	& > a {
		color: ${({ theme }) => theme.offWhite};
	}
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
		<Fragment key={id}>
			<STitle>
				<Link to={getEntryPath(createdDate, basename)}>{title}</Link>
			</STitle>
			<p>{formatEntryContent(excerpt)}</p>
		</Fragment>
	);
};

Excerpt.propTypes = {
	entry: PropTypes.shape({
		entry_id: PropTypes.string.isRequired,
		entry_title: PropTypes.string.isRequired,
		entry_excerpt: PropTypes.string.isRequired,
		entry_created_on: PropTypes.string.isRequired,
		entry_basename: PropTypes.string.isRequired,
	}).isRequired,
};

export default Excerpt;
