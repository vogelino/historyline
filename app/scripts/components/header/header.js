_define({
	BaseView: 'base/BaseView',
	Template : 'text!components/header/header.html'
}, function(m) {
	'use strict';

	var Header = function() {
		var that = {};

		that.name = 'Header';
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

	return Header;
});
