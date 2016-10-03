/* global document */
/* global window */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/reducers';
import App from './components/App';

const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
