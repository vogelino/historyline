_define({
	BaseView: 'base/BaseView',
	Template : 'text!components/charts/timeline/timeline.html',
	d3: 'd3',
	Moment: 'moment',
	Operators: 'util/operators',
	Loading: 'util/Loading'
}, function(m) {
	'use strict';

	var DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

	var barchartTest = function() {
		var that = {}, my = {};

		that.name = 'barchartTest';
		that.template = m.Template;
		that.instanceId = that.name + m.Moment();
		var o = m.Operators();

		that.construct = function() {
			that.on('view_ready', that.onViewReady);
			return that;
		};

		that.onViewReady = function() {
			m.Loading.stop();
			my.createChart([
				{
					'title': 'First world war',
					'startDate': '1914-01-01 00:00:00',
					'endDate': '1918-12-31 00:00:00'
				},
				{
					'title': 'Second world war',
					'startDate': '1933-01-01 00:00:00',
					'endDate': '1945-12-31 00:00:00'
				},
				{
					'title': 'cold war',
					'startDate': '1960-01-01 00:00:00',
					'endDate': '1970-12-31 00:00:00'
				}
			]);
		};

		my.createChart = function(data) {
			var
				events,
				lines,
				barHeight = 20,
				barSpace = 4,
				borderWidth = 1,
				chartWidth = $(window).width(),
				chartHeight = $(window).outerHeight(),
				dataEnv = my.getDataEvironement(),
				dataset = my.getDataWithAdaptedUnits(data),
				columnWidth = o.quo(chartWidth, dataEnv.x),
				$chart = that.$el.find('#chart-container'),
				svg = m.d3.select($chart[0]).append('svg');

			svg.attr('width', chartWidth)
			   .attr('height', chartHeight);

			var appliedData = svg.selectAll('rect')
				.data(dataset);

			// lines
			lines = appliedData
				.enter()
				.append('rect');

			lines.attr('fill', 'lightgray');

			lines.attr('width', chartWidth).
				attr('height', borderWidth).
				attr('y', function(d, index) {
					return o.sum(
						o.pro(barHeight, index),
						o.pro(borderWidth, index)
					);
				});

			// events
			events = appliedData
				.enter()
				.append('rect');

			events.attr('width', function(d) {
				return Math.floor(o.pro(d.duration, columnWidth));
			});

			events.attr('height', barHeight);

			events.attr('x', function(d) {
				var offsetLeft = o.dif(d.startValue, dataEnv.startValue);
				return Math.floor(o.pro(offsetLeft, columnWidth));
			});

			events.attr('y', function(d, index) {
				return o.sum(
					o.pro(barHeight, index),
					o.pro(borderWidth, index),
					borderWidth
				);
			});
		};

		my.getDataEvironement = function() {
			return {
				unit: 'YYYY',
				x: 100,
				startValue: 1901,
				stopValue: 2000
			};
		};

		my.getDataWithAdaptedUnits = function(data) {
			var
				dataEnv = my.getDataEvironement(),
				adaptedData = [];

			_.each(data, function(d) {
				var
					startValue = m.Moment(d.startDate, DATE_FORMAT).
						format(dataEnv.unit),
					endValue = m.Moment(d.endDate, DATE_FORMAT).
						format(dataEnv.unit),
					duration;

				startValue = parseInt(startValue, 10);
				endValue = parseInt(endValue, 10);
				duration = endValue - startValue;

				adaptedData.push({
					startValue: startValue,
					endValue: endValue,
					duration: duration
				});
			});

			return adaptedData;
		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return barchartTest;
});
