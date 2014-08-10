_define({
	BaseView: 'base/BaseView',
	Template : 'text!pages/content/content.html',
	Timeline: 'components/charts/timeline/timeline',
	Moment: 'moment',
	Loading: 'util/loading'
}, function(m) {
	'use strict';

	var content = function() {
		var that = {}, my = {};

		that.name = 'content';
		that.instanceId = that.name + m.Moment();
		that.template = m.Template;

		that.children = {
			timeline: new m.Timeline()
		};

		that.construct = function() {
			that.on('view_ready', that.onViewReady);
			return that;
		};

		that.onViewReady = function() {
			that.fetch().always(function() {
				m.Loading.stop();
			});
		};

		that.fetch = function() {
			console.log('fetch.start');
			var
				$dfdSingleEvents = $.Deferred(),
				$dfdDurationEvents = $.Deferred(),
				$dfdTotal = $.Deferred();

			window.Api.entries({
				'content_type': '2svEnQffpKYo0we00YEmkg'
			}).then(function(response) {
				var cleanedResponse = my.parseResponse(response);
				$dfdSingleEvents.resolve(cleanedResponse);
			}, function(error) {
				$dfdSingleEvents.reject(error);
			});

			window.Api.entries({
				'content_type': '4YRFiMRvKEUIKamUk0Gauo'
			}).then(function(response) {
				var cleanedResponse = my.parseResponse(response);
				$dfdDurationEvents.resolve(cleanedResponse);
			}, function(error) {
				$dfdDurationEvents.reject(error);
			});

			$.when($dfdSingleEvents, $dfdDurationEvents)
				.done(function(res1, res2) {
					var cleanedResponse = _.union(res1, res2);
					that.children.timeline.setData(cleanedResponse);
					window.inlineNotif.show({
						type: 'success',
						title: 'success',
						message: 'Api reached successfully'
					});
					console.log('fetch.done');
					$dfdTotal.resolve();
				}).fail(function(error) {
					window.inlineNotif.show({
						message: error.message
					});
					$dfdTotal.reject();
				});
			return $dfdTotal.promise();
		};

		my.parseResponse = function(response) {
			return _.map(response, function(data) {
				return data.fields;
			});
		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return content;
});
