import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import CoreLayout from '../layouts/CoreLayout';
import App from '../containers/App';

export default (
	<Router>
		<Route path='/' component={CoreLayout}>
			<IndexRoute component={App} />
		</Route>
	</Router>
);
