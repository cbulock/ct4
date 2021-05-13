import styled from 'styled-components';

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

const Header = () => (
	<SHeader>
		<STitle>
			<a href="/">Cameron&apos;s Thoughts</a>
		</STitle>
		<a href="/archives">Archives</a>
	</SHeader>
);

export default Header;
