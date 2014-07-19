_define({
	BaseView: 'base/BaseView',
	Template : 'text!content/content.html'
}, function(m) {
	'use strict';

	var Content = function() {
		var that = {};

		that.name = 'content';
		that.template = m.Template;

		that.construct = function() {
			that.on('view_ready', that.onViewReady);
			return that;
		};

		that.onViewReady = function() {

		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return Content;
});
