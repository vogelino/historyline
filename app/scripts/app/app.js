_define({
	BaseView: '../base/BaseView',
	Template: 'text!app/app.html',
	Loading: 'util/loading',
	WordpressTest: 'tests/wordpressTest',
	Moment: 'moment',
	InlineNotification: 'util/inlineNotification/inlineNotification'
}, function(m) {
	'use strict';

	var App = function() {
		var that = {};

		that.name = 'App';
		that.instanceId = that.name + m.Moment();
		that.template = m.Template;

		that.construct = function() {
			that.on('view_ready', that.onViewReady);

			that.children = {
				content: new m.WordpressTest(),
				inlineNotification: new m.InlineNotification()
			};
			return that;
		};

		that.render = function() {
			that.renderComponent();
			that.triggerChildren('after_render');
			that.trigger('view_ready');
		};

		var inherited = new m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return App;
});
