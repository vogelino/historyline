// original function: uberMetrics Technologies
// customized by Lucas Vogel aka Vogelino
window._define = (function () {
	'use strict';

	var get = function(modules) {
		return _.map(modules, function(value) {
			return value;
		});
	};
	var assign = function(modules, args) {
		var m = {};
		var i = 0;
		_.each(modules, function(value, key) {
			m[key] = args[i];
			i++;
		});
		return m;
	};
	return function (modules, f) {
		define(get(modules), function() {
			var m = assign(modules, arguments);
			return f(m);
		});
	};
})();
