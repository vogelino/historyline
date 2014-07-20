_define({
	BaseView: 'base/BaseView',
	Template: 'text!components/posts/postView.html',
	Moment: 'moment'
}, function(m) {
	'use strict';

	var postView = function() {
		var that = {};

		that.name = 'postView';
		that.instanceId = that.name + m.Moment();
		that.template = m.Template;

		that.construct = function() {
			that.on('view_ready', that.onViewReady);
			return that;
		};

		that.getTemplateData = function() {
			return that.getModel().attributes;
		};

		that.onViewReady = function() {

		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return postView;
});
