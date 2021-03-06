import PropTypes from 'prop-types';
import styled from 'styled-components';

const SContainer = styled.div`
	padding: 1em 0;
	background-color: ${({ theme }) => theme.primary};
`;

const SEntry = styled.div`
	margin: 1em auto;
	padding: 0 0.5em;
	max-width: 800px;
	color: ${({ theme }) => theme.offWhite};
	& a {
		color: ${({ theme }) => theme.links};
	}
`;

const PageContainer = ({ children }) => (
	<SContainer>
		<SEntry>{children}</SEntry>
	</SContainer>
);

PageContainer.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default PageContainer;
