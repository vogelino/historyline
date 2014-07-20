define(['underscore', 'jquery'], function(_, $) {
	'use strict';

	var request = function() {
		var
			that = {},
			my = {},
			API_HOST = 'http://localhost:8888/vogelifixwp/api/';

		that.new = function(callName, options) {
			var
				$dfd = $.Deferred(),
				optionsStrings,
				inlineOptions = '',
				completeUrl;

			if (options) {
				optionsStrings = _.map(options, function(value, key) {
					key.replace(/([A-Z])/g, function(transformed) {
						return '_' + transformed.toLowerCase();
					});
					return key + '=' + value;
				});
				inlineOptions = optionsStrings.join('&');
			}

			completeUrl = API_HOST + '?json=' + callName +
				'&' + inlineOptions;

			$.ajax({
				url: completeUrl,
				dataType: 'json'
			})
			.done(function(response) {
				var normalizedResponse = my.normalizeResponse(response);
				$dfd.resolve(normalizedResponse);
			})
			.fail(function(error) {
				console.error(error);
				$dfd.reject(error);
			});

			return $dfd.promise();
		};

		my.normalizeResponse = function(response) {
			var normalizedResponse = {};
			_.each(response, function(val, key) {
				var newKey = _.isString(key) ? my.toCamel(key) : key;
				if (_.isObject(val)) {
					normalizedResponse[newKey] =
						my.normalizeResponse(val);
				}
				else {
					normalizedResponse[newKey] = val;
				}
			});
			return normalizedResponse;
		};

		my.toCamel = function(word) {
			var newWord = word.toString();
			return newWord.replace(/(\_[a-z])/g, function($1) {
				return $1.toUpperCase().replace('_' , '');
			});
		};

		return that;
	};

	return request;
});
