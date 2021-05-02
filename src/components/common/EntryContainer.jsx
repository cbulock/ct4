import PropTypes from 'prop-types';
import styled from 'styled-components';

const SContainer = styled.div`
	padding: 1em 0;
	background-color: ${({ theme }) => theme.primary};
`;

const SEntry = styled.div`
	margin: 1em auto;
	max-width: 800px;
	color: ${({ theme }) => theme.offWhite};
	& a {
		color: ${({ theme }) => theme.secondary};
	}
`;

const EntryContainer = ({ children }) => (
	<SContainer>
		<SEntry>{children}</SEntry>
	</SContainer>
);

EntryContainer.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default EntryContainer;
