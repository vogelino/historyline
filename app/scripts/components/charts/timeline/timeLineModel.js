_define({
	BaseModel: 'base/baseModel',
	Data: 'json!/resources/json/2000.json'
}, function(m) {
	'use strict';

	var limelineModel = function() {
		var that = {};

		that.name = 'limelineModel';

		that.construct = function() {
			return that;
		};

		that.refresh = function() {
			that.set('data', m.Data);
		};

		var inherited = m.BaseModel();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return limelineModel;
});
