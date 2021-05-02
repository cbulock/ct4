import styled from 'styled-components';

const STitle = styled.h1`
	margin: 0;
	padding: 0.25em;
	& > a {
		color: ${({ theme }) => theme.primary};
	}
`;

const Header = () => (
	<header>
		<STitle>
			<a href="/">Cameron&apos;s Thoughts</a>
		</STitle>
	</header>
);

export default Header;
