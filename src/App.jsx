import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import EntryPage from 'components/pages/Entry';

const App = () => (
	<>
		<h1>Cameron&apos;s Thoughts</h1>
		<Router>
			<Switch>
				<Route path="/:year/:month/:entryBasename">
					<EntryPage />
				</Route>
			</Switch>
		</Router>
		<footer>©2003-2021 Cameron Bulock</footer>
	</>
);

export default App;
