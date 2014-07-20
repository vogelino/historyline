_define({}, function() {
	'use strict';

	var BaseModel = function() {
		var that = {};

		that.name = 'baseModel';

		that.construct = function() {

		};

		var Model = Backbone.Model.extend(that);
		that = new Model();
		that.construct.apply(that, arguments);
		return that;
	};

	return BaseModel;
});
