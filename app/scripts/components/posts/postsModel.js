_define({
	BaseModel: 'base/BaseModel',
	Moment: 'moment'
}, function(m) {
	'use strict';

	var postsModel = function() {
		var that = {};

		that.name = 'postsModel';
		that.instanceId = that.name + m.Moment();

		that.construct = function() {
			that.defaults = {
				id: 1,
				type: 'post',
				slug: '',
				url: '',
				title: 'Post title',
				content: 'Post content',
				excerpt: 'Post excerpt',
				date: '',
				modified: ''
			};
			return that;
		};

		var inherited = m.BaseModel();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return postsModel;
});
