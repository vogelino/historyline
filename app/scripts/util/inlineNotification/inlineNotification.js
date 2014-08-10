_define({
	BaseView: 'base/BaseView',
	Template : 'text!util/inlineNotification/inlineNotification.html'
}, function(m) {
	'use strict';

	var AUTOCLOSE_DELAY = 5000;

	var InlineNotification = function() {
		var that = {}, my = {};

		that.name = 'InlineNotification';
		that.template = m.Template;

		my.defaults = {
			'type': 'danger',
			'autoClose': true,
			'title': 'Error',
			'message': 'An error occured',
			'visible': true
		};

		my.provisoryData = {};

		that.construct = function() {
			window.inlineNotif = that;
			return that;
		};

		that.getTemplateData = function() {
			return my.provisoryData;
		};

		that.show = function(options) {
			my.provisoryData = _.extend(my.defaults, options);
			that.renderComponent();
			if (my.provisoryData.autoClose) {
				_.delay(function() {
					my.provisoryData.visible = false;
					that.renderComponent();
					my.provisoryData.visible = true;
				}, AUTOCLOSE_DELAY);
			}
		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return InlineNotification;
});
