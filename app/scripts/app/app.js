_define({
	BaseView: '../base/BaseView',
	Template: 'text!app/app.html',
	Loading: 'util/loading',
	Content: 'components/charts/timeline/timeline',
	Moment: 'moment',
	InlineNotification: 'util/inlineNotification/inlineNotification',
	Header: 'components/header/header'
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
				header: new m.Header(),
				content: new m.Content(),
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
