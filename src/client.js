/* global document */
import React from 'react';
import { render } from 'react-dom';
import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import routes from './routes';
import Root from './containers/Root';

const appHistory = useRouterHistory(createBrowserHistory);
render(
	<Root history={appHistory} routes={routes} />,
	document.getElementById('root')
);
