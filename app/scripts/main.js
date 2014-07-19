'use strict';

require.config({
	shim: {
		nprogress: {
			deps: ['jquery'],
			exports: 'nprogress'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		},
		jquery: {
			exports: '$'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		backbone: '../bower_components/backbone/backbone',
		underscore: '../bower_components/underscore/underscore',
		bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
		nprogress: '../bower_components/nprogress/nprogress',
		text: '../bower_components/requirejs-text/text',
		d3: '::/bower_components/d3/d3'
	}
});

require([
	'backbone',
	'underscore',
	'app/app',
	'util/loading'
], function (Backbone, _, App, Loading) {
	Backbone.history.start();
	Loading.start();

	var appView = new App();
	appView.setElement('#app');
	appView.render();
});
