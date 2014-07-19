
define([
	'nprogress'
], function(NProgress) {
	'use strict';

	var loading = {};

	// NProgress.configure({
	// 	trickleRate: 0.05,
	// 	trickleSpeed: 100
	// });

	loading.start = function() {
		NProgress.start();
	};

	loading.stop = function() {
		NProgress.done();
	};

	loading.inc = function() {
		NProgress.inc();
	};

	loading.set = function(value) {
		NProgress.set(value);
	};

	return loading;
});
