define([
	'underscore',
	'../base/BaseView',
	'text!app/app.html'
], function(_, BaseView, Template) {
	'use strict';

	var App = function() {
		var that = {};

		that.name = 'App';
		that.template = Template;

		that.construct = function() {
			// original function: uberMetrics Technologies
			// customized by Lucas Vogel aka Vogelino
			window._define = (function() {
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

			that.on('view_ready', that.onViewReady);
			return that;
		};

		that.render = function() {
			that.renderComponent();
			that.triggerChildren('after_render');
			that.trigger('view_ready');
		};

		that.onViewReady = function() {
			
		};

		var inherited = new BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return App;
});
