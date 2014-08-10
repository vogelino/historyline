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
		contentful: '../bower_components//contentful/dist/contentful.min',
		image: '../bower_components/requirejs-plugins/src/image',
		text: '../bower_components/requirejs-text/text',
		d3: '../bower_components/d3/d3',
		moment: '../bower_components/moment/moment'
	}
});

require([
	'backbone',
	'underscore',
	'app/app',
	'util/loading',
	'contentful',
	'bootstrap'
], function(Backbone, _, App, Loading, Contentful) {
	window.Api = Contentful.createClient({
		accessToken: '0b0100a3ee0b70c2d58d1144b6fa290116ec9985feb6bf981a288a52a9923b80',
		space: 'n3s84bfc1ba4'
	});
	Backbone.history.start();
	// window.evenwt = _.extend({}, Backbone.Events);
	Loading.init();
	Loading.start();

	var appView = new App();
	appView.setElement('#app');
	appView.render();
});
