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
				},
				tooltip: {
					width: 200,
					height: 50,
					arrowSize: 10,
					padding: 20,
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
				chartWidth = my.options.chart.width,
				chartHeight = my.options.chart.height,
				dataset = my.getDataWithAdaptedUnits(data),
				$chart = that.$el.find('.chart-container');

			my.chart = m.d3.select($chart[0]).append('svg');

			my.chart.attr('width', chartWidth)
			   .attr('height', chartHeight);

			var appliedData = my.chart.selectAll('rect')
					.data(dataset);

			// rows
			my.createRows(appliedData);

			// events
			my.createEvents(appliedData);

			// labels
			my.createTimeLabels();

			// Tooltip
			my.createTooltip();
		};

		my.createRows = function(appliedData) {
			var rows = appliedData
				.enter()
				.append('rect')
				.attr('class', 'horizontal-rows');

			rows.attr('width', my.options.chart.width)
				.attr('height', function() {
					return o.sum(
						my.options.chart.bar.height,
						my.options.chart.bar.space,
						my.options.chart.borderWidth,
						my.options.chart.borderWidth
					);
				}).attr('y', my.getRowHeight);

			var lines = appliedData
					.enter()
					.append('rect')
					.attr('class', 'horizontal-rows-lines');

			lines.attr('width', my.options.chart.width)
				.attr('height', my.options.chart.borderWidth)
				.attr('y', my.getRowHeight);

			return {
				rows: rows,
				lines: lines
			};
		};

		my.getRowHeight = function(d, index) {
			index = o.sum(index, 1);
			return o.sum(
				o.pro(my.options.chart.bar.height, index),
				o.pro(my.options.chart.borderWidth, index),
				o.pro(my.options.chart.bar.space, index),
				my.options.chart.labels.space
			);
		};

		my.createEvents = function(appliedData) {
			var
				events,
				dataEnv = my.options.view,
				columnWidth = my.getColumnWidth();

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

			events.attr('height', my.options.chart.bar.height);

			events.attr('x', function(d) {
				var offsetLeft = o.dif(d.startValue, dataEnv.startValue);
				return Math.floor(o.pro(offsetLeft, columnWidth));
			});

			events.attr('y', function(d, index) {
				return o.sum(
					o.pro(my.options.chart.bar.height, index),
					o.pro(my.options.chart.borderWidth, index),
					o.pro(my.options.chart.bar.space, index),
					o.quo(my.options.chart.bar.space, 2),
					my.options.chart.borderWidth,
					my.options.chart.labels.space
				);
			});

			events.on('mouseenter', function(d) {
				my.showTooltip(this, d.title);
			});

			events.on('mouseleave', function() {
				my.hideTooltip();
			});
		};

		my.createTimeLabels = function() {
			var
				labels,
				labelsContainer;

			my.chart.append('rect')
					.attr('width', my.options.chart.width)
					.attr('height', my.options.chart.labels.space)
					.attr('x', 0)
					.attr('y', 0)
					.attr('class', 'labels-background');

			labelsContainer = my.chart.append('g')
					.attr('width', my.options.chart.width)
					.attr('height', my.options.chart.labels.space)
					.attr('x', 0)
					.attr('y', 0)
					.attr('class', 'labels-container');

			labels = my.createLabels(labelsContainer);
			my.createLabelsTexts(labels);
			my.createLabelsArrows(labels);
		};

		my.createLabelsTexts = function(labels) {
			var labelsTexts = labels.append('text');

			labelsTexts.text(function(d) {
				return d;
			});

			labelsTexts.attr('x', function() {
				return o.num($(this.parentNode).attr('x'));
			});
			labelsTexts.attr('y', function() {
				return o.num($(this.parentNode).attr('y'));
			});
			return labelsTexts;
		};

		my.createLabelsArrows = function(labels) {
			var labelsArrows = labels.append('polygon')
				.attr('class', 'labels-arrows')
				.attr('points', function() {
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
			return labelsArrows;
		};

		my.createLabels = function(labelsContainer) {
			var labels = labelsContainer.selectAll('g')
					.data(my.getXData(my.options.view))
					.enter()
					.append('g');

			labels.attr('x', function(d, index) {
				return o.pro(index, my.getColumnWidth());
			});

			labels.attr('y', function() {
				var semiHeight = o.quo(my.options.chart.labels.space, 2);
				return o.sum(semiHeight, o.quo($(this).height(), 4));
			});

			labels.attr('class', function() {
				var
					baseClass = 'time-label',
					$prev = $(my.getPreviousVisibleLabel(this)),
					prevWidth = $prev.width(),
					prevOffsetLeft = o.num($prev.attr('x')),
					prevOffsetRight = o.sum(prevOffsetLeft, prevWidth),
					offsetWithSpace = o.sum(
						prevOffsetRight,
						my.options.chart.labels.separation
					),
					thisOffsetLeft = o.num($(this).attr('x')),
					thisOffsetRight = thisOffsetLeft + $(this).width();

				if ((thisOffsetLeft === 0 || thisOffsetLeft >= offsetWithSpace) &&
					thisOffsetRight <= my.options.chart.width) {
					return baseClass;
				}
				else {
					return baseClass + ' hidden';
				}
			});

			return labels;
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
					duration,
					goesLater = false,
					goesEarlier = false,
					now = m.Moment().format(dataEnv.unit);

				startValue = m.Moment(d.startDate, DATE_FORMAT).
					format(dataEnv.unit);
				if (_.isUndefined(d.endDate) || d.endDate > dataEnv.endValue) {
					endValue = now;
					if (d.endDate > endValue) {
						goesLater = true;
					}
				}
				else {
					endValue = m.Moment(d.endDate, DATE_FORMAT).
						format(dataEnv.unit);
				}

				if (startValue < dataEnv.startValue) {
					startValue = dataEnv.startValue;
					goesEarlier = true;
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
						duration: duration,
						goesLater: goesLater,
						goesEarlier: goesEarlier
					});
				}
			});

			return adaptedData;
		};

		my.getColumnWidth = function() {
			return o.quo(
					my.options.chart.width,
					o.dif(
						my.options.view.endValue,
						my.options.view.startValue
					)
				);
		};

		my.createTooltip = function() {
			my.tooltip = my.chart.append('svg')
					.attr('class', 'timeline-tooltip')
					.style('opacity', 0);

			my.tooltip.rect = my.tooltip.append('rect')
				.attr('width', my.options.chart.tooltip.width)
				.attr('height', my.options.chart.tooltip.height)
				.attr('y', my.options.chart.tooltip.arrowSize);

			my.tooltip.arrow = my.tooltip.append('polygon')
				.attr('points', '0,0 0,' +
					my.options.chart.tooltip.arrowSize + ' ' +
					my.options.chart.tooltip.arrowSize + ',' +
					my.options.chart.tooltip.arrowSize);

			my.tooltip.text = my.tooltip.append('text')
				.attr('x', my.options.chart.tooltip.padding)
				.attr('y', o.sum(
					my.options.chart.tooltip.arrowSize,
					my.options.chart.tooltip.arrowSize,
					my.options.chart.tooltip.padding
				));
		};

		my.showTooltip = function(elem, data) {
			var
				x = o.num($(elem).attr('x')),
				barHeight = o.num($(elem).attr('height')),
				y = o.num($(elem).attr('y'));

			my.tooltip.text.text(data);

			my.tooltip
				.style('opacity', 1)
				.attr('x', x)
				.attr('y', o.sum(barHeight, y));
		};

		my.hideTooltip = function() {
			my.tooltip.style('opacity', 0);
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
