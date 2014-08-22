_define({
	BaseView: 'base/BaseView',
	Template : 'text!pages/content/content.html',
	TimelineView: 'components/charts/timeline/timeline',
	TimelineModel: 'components/charts/timeline/timelineModel',
	Moment: 'moment',
	Loading: 'util/loading'
}, function(m) {
	'use strict';

	var content = function() {
		var that = {}, my = {};

		that.name = 'content';
		that.instanceId = that.name + m.Moment();
		that.template = m.Template;
		that.children = {};

		that.construct = function() {
			that.on('view_ready', that.onViewReady);
			my.initChildren();
			return that;
		};

		my.initChildren = function() {
			var
				timelineView = new m.TimelineView(),
				timelineModel = new m.TimelineModel();

			that.on('after_render', function() {
				that.children.timeline.setModel(timelineModel);
			});

			that.children = {
				timeline: timelineView
			};
		};

		that.onViewReady = function() {
			m.Loading.stop();
		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return content;
});
