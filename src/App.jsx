import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from 'components/GlobalStyle';

import HomePage from 'components/pages/Home';
import EntryPage from 'components/pages/Entry';

const App = () => (
	<>
		<GlobalStyle />
		<h1>
			<a href="/">Cameron&apos;s Thoughts</a>
		</h1>
		<Router>
			<Switch>
				<Route path="/:year/:month/:entryBasename">
					<EntryPage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
		</Router>
		<footer>©2003-2021 Cameron Bulock</footer>
	</>
);

export default App;
