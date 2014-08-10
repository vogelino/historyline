_define({}, function() {
	'use strict';

	var operators = function() {
		var that = {};

		that.sum = function() {
			var numbers = 0;
			if (arguments.length > 1) {
				numbers = arguments;
			} else if (arguments.length === 1 &&
					   _.isArray(arguments[0])) {
				numbers = arguments[0];
			}
			return _.reduce(numbers, function(memo, num) {
				return memo + num;
			});
		};

		that.pro = function() {
			var numbers = 0;
			if (arguments.length > 1) {
				numbers = arguments;
			} else if (arguments.length === 1 &&
					   _.isArray(arguments[0])) {
				numbers = arguments[0];
			}
			return _.reduce(numbers, function(memo, num) {
				return memo * num;
			});
		};

		that.dif = function() {
			var numbers = 0;
			if (arguments.length > 1) {
				numbers = arguments;
			} else if (arguments.length === 1 &&
					   _.isArray(arguments[0])) {
				numbers = arguments[0];
			}
			return _.reduce(numbers, function(memo, num) {
				return memo - num;
			});
		};

		that.quo = function() {
			var numbers = 0;
			if (arguments.length > 1) {
				numbers = arguments;
			} else if (arguments.length === 1 &&
					   _.isArray(arguments[0])) {
				numbers = arguments[0];
			}
			return _.reduce(numbers, function(memo, num) {
				return memo / num;
			});
		};

		that.num = function(number) {
			return parseInt(number, 10);
		};

		return that;
	};

	return operators;
});
