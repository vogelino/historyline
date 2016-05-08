import React from 'react';
import { Router } from 'react-router';

export default class Root extends React.Component {
	get content () {
		return (
			<Router history={this.props.history}>
				{this.props.routes}
			</Router>
		);
	}

	render () {
		return (
			<main>
				{this.content}
			</main>
		);
	}
}

Root.propTypes = {
	history: React.PropTypes.object,
	routes: React.PropTypes.element.isRequired
};
