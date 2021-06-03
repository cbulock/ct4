import styled from 'styled-components';

const SContent = styled.p`
	margin: 4px auto 0;
	background-color: ${({ theme }) => theme.secondary};
	color: ${({ theme }) => theme.offWhite};
	width: fit-content;
	font-weight: 500;
	padding: 0.75em;
	border-radius: 8px 8px 0 0;
`;

const currentYear = new Date().getFullYear();

const Footer = () => (
	<footer>
		<SContent>{`©2003-${currentYear} Cameron Bulock`}</SContent>
	</footer>
);

export default Footer;
