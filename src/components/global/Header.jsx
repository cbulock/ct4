import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Search from 'components/common/Search';

const SHeader = styled.header`
	padding: 0.5em 1em;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const STitle = styled.h1`
	margin: 0;
	padding-right: 1em;
	& > a {
		color: ${({ theme }) => theme.primary};
	}
`;

const SRightSide = styled.div`
	display: grid;
	grid-column-gap: 16px;
	@media all and (min-width: 576px) {
		grid-template-columns: repeat(2, max-content);
	}
`;

const Header = () => (
	<SHeader>
		<STitle>
			<Link to="/">Cameron&apos;s Thoughts</Link>
		</STitle>
		<SRightSide>
			<Search />
			<Link to="/archives">Archives</Link>
		</SRightSide>
	</SHeader>
);

export default Header;
