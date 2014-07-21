_define({
	BaseView: 'base/BaseView',
	Post: 'components/posts/postView',
	Moment: 'moment'
}, function(m) {
	'use strict';

	var postsView = function() {
		var that = {};

		that.name = 'postsView';
		that.instanceId = that.name + m.Moment();
		that.template = ' ';
		that.children = {};

		that.construct = function() {
			return that;
		};

		that.getSubView = function() {
			return new m.Post();
		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return postsView;
});
