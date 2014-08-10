_define({
	BaseView: 'base/BaseView',
	Template : 'text!components/charts/timeline/timeline.html',
	d3: 'd3',
	Moment: 'moment',
	Operators: 'util/operators',
	Loading: 'util/Loading'
}, function(m) {
	'use strict';

	var DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

	var timeline = function() {
		var that = {}, my = {};

		that.name = 'timeline';
		that.template = m.Template;
		that.instanceId = that.name + m.Moment();
		var o = m.Operators();

		that.dummyData = [{
			'title': 'Life',
			'startDate': '1993-06-21 00:00:00'
		},
		{
			'title': 'Chile',
			'startDate': '1994-01-01 00:00:00',
			'endDate': '1997-12-31 00:00:00'
		},
		{
			'title': 'Primary school',
			'startDate': '1998-01-01 00:00:00',
			'endDate': '2000-12-31 00:00:00'
		},
		{
			'title': 'Secondary school',
			'startDate': '2000-01-01 00:00:00',
			'endDate': '2008-12-31 00:00:00'
		},
		{
			'title': 'Eracom',
			'startDate': '2008-01-01 00:00:00',
			'endDate': '2012-12-31 00:00:00'
		},
		{
			'title': 'Graf Miville intership',
			'startDate': '2009-01-01 00:00:00',
			'endDate': '2010-12-31 00:00:00'
		},
		{
			'title': '7sky intership',
			'startDate': '2011-01-01 00:00:00',
			'endDate': '2012-12-31 00:00:00'
		},
		{
			'title': 'uberMetrics intership',
			'startDate': '2012-01-01 00:00:00',
			'endDate': '2013-12-31 00:00:00'
		},
		{
			'title': 'uberMetrics',
			'startDate': '2013-01-01 00:00:00'
		}];

		my.options = {
			chart: {
				width: o.dif($(window).width(), 20),
				height: o.dif($(window).outerHeight(), 70),
				bar: {
					height: 20,
					space: 4,
					borderRadius: 2,
					minWidth: 5
				},
				borderWidth: 1,
				labels: {
					space: 30,
					separation: 50
				}
			},
			view: {
				unit: 'YYYY',
				startValue: 1991,
				endValue: 2014
			}
		};

		that.construct = function() {
			// that.on('view_ready', that.onViewReady);
			return that;
		};

		that.onViewReady = function() {
			my.createChart(that.data);
			my.createChart(that.dummyData);
		};

		my.createChart = function(data) {
			var
				events,
				labels,
				labelsContainer,
				lines,
				labelsArrows,
				labelsTexts,
				barHeight = my.options.chart.bar.height,
				barSpace = my.options.chart.bar.space,
				borderWidth = my.options.chart.borderWidth,
				labelsSpace = my.options.chart.labels.space,
				labelsSeparation = my.options.chart.labels.separation,
				chartWidth = my.options.chart.width,
				chartHeight = my.options.chart.height,
				dataEnv = my.options.view,
				dataset = my.getDataWithAdaptedUnits(data),
				columnWidth = o.quo(
					chartWidth,
					o.dif(dataEnv.endValue, dataEnv.startValue)
				),
				$chart = that.$el.find('.chart-container'),
				svg = m.d3.select($chart[0]).append('svg');

			svg.attr('width', chartWidth)
			   .attr('height', chartHeight);

			var appliedData = svg.selectAll('rect')
				.data(dataset);

			// lines
			lines = appliedData
				.enter()
				.append('rect')
				.attr('class', 'horizontal-lines');

			lines.attr('fill', 'lightgray');

			lines.attr('width', chartWidth).
				attr('height', borderWidth).
				attr('y', function(d, index) {
					index = o.sum(index, 1);
					return o.sum(
						o.pro(barHeight, index),
						o.pro(borderWidth, index),
						o.pro(barSpace, index),
						labelsSpace
					);
				});

			// events
			events = appliedData
				.enter()
				.append('rect')
				.attr('class', 'time-event');

			events.attr('width', function(d) {
				var
					minWidth = my.options.chart.bar.minWidth,
					width = Math.floor(o.pro(d.duration, columnWidth));
				return width >= minWidth ? width : minWidth;
			});

			events.attr('ry', my.options.chart.bar.borderRadius);
			events.attr('rx', my.options.chart.bar.borderRadius);

			events.attr('height', barHeight);

			events.attr('x', function(d) {
				var offsetLeft = o.dif(d.startValue, dataEnv.startValue);
				return Math.floor(o.pro(offsetLeft, columnWidth));
			});

			events.attr('y', function(d, index) {
				return o.sum(
					o.pro(barHeight, index),
					o.pro(borderWidth, index),
					o.pro(barSpace, index),
					o.quo(barSpace, 2),
					borderWidth,
					labelsSpace
				);
			});

			events.on('mouseenter', function(d) {
				my.showTooltip(this, d.title);
			});

			// labels
			svg.append('rect')
					.attr('width', chartWidth)
					.attr('height', labelsSpace)
					.attr('x', 0)
					.attr('y', 0)
					.attr('class', 'labels-background');

			labelsContainer = svg.append('g')
					.attr('width', chartWidth)
					.attr('height', labelsSpace)
					.attr('x', 0)
					.attr('y', 0)
					.attr('class', 'labels-container');

			labels = labelsContainer.selectAll('g')
				.data(my.getXData(dataEnv))
				.enter()
				.append('g');

			labelsTexts = labels.append('text');
			labelsArrows = labels.append('polygon')
				.attr('class', 'labels-arrows');

			labelsTexts.text(function(d) {
				return d;
			});

			labels.attr('x', function(d, index) {
				return o.pro(index, columnWidth);
			});

			labels.attr('y', function() {
				var semiHeight = o.quo(labelsSpace, 2);
				return o.sum(semiHeight, o.quo($(this).height(), 4));
			});

			labelsTexts.attr('x', function() {
				return o.num($(this.parentNode).attr('x'));
			});
			labelsTexts.attr('y', function() {
				return o.num($(this.parentNode).attr('y'));
			});

			labels.attr('class', function() {
				var
					baseClass = 'time-label',
					$prev = $(my.getPreviousVisibleLabel(this)),
					prevWidth = $prev.width(),
					prevOffsetLeft = o.num($prev.attr('x')),
					prevOffsetRight = o.sum(prevOffsetLeft, prevWidth),
					offsetWithSpace = o.sum(prevOffsetRight, labelsSeparation),
					thisOffsetLeft = o.num($(this).attr('x')),
					thisOffsetRight = thisOffsetLeft + $(this).width();

				if ((thisOffsetLeft === 0 || thisOffsetLeft >= offsetWithSpace) &&
					thisOffsetRight <= chartWidth) {
					return baseClass;
				}
				else {
					return baseClass + ' hidden';
				}
			});

			labelsArrows.attr('points', function() {
				var
					parentX = o.num($(this.parentNode).attr('x')),
					parentY = o.num($(this.parentNode).attr('y')),
					parentHeight = o.num($(this.parentNode).height()),
					point1Y = o.sum(parentHeight, parentY),
					point1 = parentX + ',' + o.sum(point1Y, 10),
					point2 = o.dif(parentX, 5) + ',' + o.sum(point1Y, 15),
					point3 = o.sum(parentX, 5) + ',' + o.sum(point1Y, 15);

				return point1 + ' ' + point2 + ' ' + point3;
			});
		};

		my.getPreviousVisibleLabel = function(label) {
			var prev = label.previousElementSibling;
			if ($(prev).attr('class') === 'time-label') {
				return prev;
			}
			else if ($(prev).attr('class') === 'time-label hidden') {
				return my.getPreviousVisibleLabel(prev);
			}
			return label;
		};

		my.getXData = function(dataEnv) {
			var
				newData = [],
				length = o.dif(dataEnv.endValue, dataEnv.startValue);
			newData.push(dataEnv.startValue);
			for (var i = 0; i < length; i++) {
				newData.push(dataEnv.startValue + i);
			}
			return newData;
		};

		my.getDataWithAdaptedUnits = function(data) {
			var
				dataEnv = my.options.view,
				adaptedData = [];

			_.each(data, function(d) {
				var
					startValue,
					endValue,
					duration;

				startValue = m.Moment(d.startDate, DATE_FORMAT).
					format(dataEnv.unit);
				if (_.isUndefined(d.endDate)) {
					endValue = m.Moment().format(dataEnv.unit);
				}
				else {
					endValue = m.Moment(d.endDate, DATE_FORMAT).
						format(dataEnv.unit);
				}

				startValue = parseInt(startValue, 10);
				endValue = parseInt(endValue, 10);
				duration = endValue - startValue;

				if (startValue >= dataEnv.startValue &&
					endValue <= dataEnv.endValue) {
					adaptedData.push({
						title: d.name,
						startValue: startValue,
						endValue: endValue,
						duration: duration
					});
				}
			});

			return adaptedData;
		};

		my.showTooltip = function(elem, data) {

		};

		that.setData = function(data) {
			that.data = data;
			my.createChart(that.data);
		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return timeline;
});
