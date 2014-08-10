
define([
	'nprogress',
	'image!../images/faviconNormal.ico',
	'image!../images/faviconLoading.ico'
], function(NProgress, NormalFavicon, LoadingFavicon) {
	'use strict';

	var loading = {};

	// NProgress.configure({
	// 	trickleRate: 0.05,
	// 	trickleSpeed: 100
	// });

	var LINK_ID = 'LoadingFavicon';
	var LOADING_LINK = LoadingFavicon.src;
	var NORMAL_LINK = NormalFavicon.src;

	loading.init = function() {
		loading.activeLink = new loading.link(NORMAL_LINK);
		$('head').append(loading.activeLink);
	};

	loading.link = function(url) {
		var link = document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.id = LINK_ID;
		link.href = url;
		return link;
	};

	loading.start = function() {
		$('#' + LINK_ID).attr('href', LOADING_LINK);
		NProgress.start();
	};

	loading.stop = function() {
		_.delay(function() {
			$('#' + LINK_ID).attr('href', NORMAL_LINK);
		}, 500);
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
