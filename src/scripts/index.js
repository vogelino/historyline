/* global document */
/* global window */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage';
import { createStore, compose } from 'redux';
import reducers from './redux/reducers';
import App from './components/App';

const enhancer = compose(
	persistState([
		'visualization',
		'ui',
		'filters'
	], {
		key: 'historylineLocalStorage'
	}),
	window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(reducers, enhancer);

render(
	<Provider store={store}>
		<App />
	</Provider>,
		document.getElementById('root')
	);
