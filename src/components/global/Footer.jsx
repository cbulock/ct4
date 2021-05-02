import styled from 'styled-components';

const SContent = styled.p`
	margin: 4px auto 0;
	background-color: ${({ theme }) => theme.secondary};
	color: ${({ theme }) => theme.offWhite};
	width: fit-content;
	padding: 0.75em;
	border-radius: 8px 8px 0 0;
`;

const Footer = () => (
	<footer>
		<SContent>©2003-2021 Cameron Bulock</SContent>
	</footer>
);

export default Footer;
