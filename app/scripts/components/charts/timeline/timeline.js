_define({
	BaseView: 'base/BaseView',
	Template : 'text!components/charts/timeline/timeline.html',
	d3: 'd3',
	Moment: 'moment',
	Operators: 'util/operators',
	Loading: 'util/Loading'
}, function(m) {
	'use strict';

	var timeline = function() {
		var that = {}, my = {};

		that.name = 'timeline';
		that.template = m.Template;
		that.instanceId = that.name + m.Moment();
		var o = m.Operators();

		my.options = {
			chart: {
				width: 500,
				height: 500,
				bar: {
					height: 20,
					space: 4,
					borderRadius: 2,
					minWidth: 10
				},
				borderWidth: 1,
				labels: {
					space: 30,
					separation: 50,
					arrowSize: 5
				},
				tooltip: {
					width: 200,
					height: 50,
					arrowSize: 10
				}
			}
		};

		that.construct = function() {
			// that.on('view_ready', that.onViewReady);
			return that;
		};

		that.render = function() {
			that.renderComponent();
			var model = that.getModel();

			if (model) {
				var
					chartWidth,
					chartHeight,
					data   = model.get('data'),
					$chart = that.$el.find('.chart-container');

				$chart.html('');

				my.options.chart.width	= $chart.innerWidth();
				chartWidth				= my.options.chart.width;
				chartHeight				= my.options.chart.height;

				my.chart = m.d3.select($chart[0]).append('svg');

				my.chart.attr('width', chartWidth)
						.attr('height', chartHeight);

				var appliedData = my.chart.selectAll('rect').data(data);

				// rows
				my.createRows(appliedData);

				// events
				my.createEvents(appliedData);

				// labels
				my.createTimeLabels();

				// Tooltip
				my.createTooltip();
			}
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
				startViewValue = that.getModel().get('rangeStart'),
				unit = that.getModel().get('unit'),
				columnWidth = my.getColumnWidthByUnit(unit);

			events = appliedData
				.enter()
				.append('rect')
				.attr('class', 'time-event');

			events.attr('width', function(d) {
				var
					minWidth = my.options.chart.bar.minWidth,
					width = Math.floor(o.pro(d.duration.as(unit), columnWidth));
				return width >= minWidth ? width : minWidth;
			});

			events.attr('ry', my.options.chart.bar.borderRadius);
			events.attr('rx', my.options.chart.bar.borderRadius);

			events.attr('height', my.options.chart.bar.height);

			events.attr('x', function(d) {
				var
					valueDuration = o.dif(d.startValue.valueOf(), startViewValue.valueOf()),
					offsetLeft = m.Moment.duration(valueDuration).as(unit);
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

			events.on('mouseover', function(d) {
				my.showTooltip(this, d.title);
			});

			events.on('mouseout', function() {
				my.hideTooltip();
			});
		};

		my.createTimeLabels = function() {
			var
				labels,
				labelsContainer;

			labelsContainer = my.chart.append('rect')
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
				.attr('points', function() {
					var
						parentX = o.num($(this.parentNode).attr('x')),
						parentY = o.num($(this.parentNode).attr('y')),
						parentHeight = o.num($(this.parentNode).height()),
						aS = my.options.chart.labels.arrowSize,
						aS3 = o.pro(aS, 3),
						aS2 = o.pro(aS, 2),
						p1Y = o.sum(parentHeight, parentY),
						p1X = o.sum(parentX, aS),
						point1 = p1X + ',' + o.sum(p1Y, aS2),
						point2 = parentX + ',' + o.sum(p1Y, aS3),
						point3 = o.sum(p1X, aS) + ',' + o.sum(p1Y, aS3);

					return point1 + ' ' + point2 + ' ' + point3;
				})
				.attr('class', function() {
					var
						points = $(this).attr('points').split(' '),
						pointLeft = points[1],
						pointLeftPos = pointLeft.split(','),
						pointLeftX = o.num(pointLeftPos[0]),
						pointRight = points[2],
						pointRightPos = pointRight.split(','),
						pointRightX = o.num(pointRightPos[0]),
						maxPosX = my.options.chart.width;

					if (pointLeftX < 0 || pointRightX > maxPosX) {
						return 'labels-arrows hidden';
					}
					return 'labels-arrows';
				});
			return labelsArrows;
		};

		my.getGroupPos = function(elem) {
			var g = m.d3.select(elem);
			return {
				x: m.d3.transform(g.attr('transform')).translate[0],
				y: m.d3.transform(g.attr('transform')).translate[0]
			};
		};

		my.createLabels = function(labelsContainer) {
			var labels = labelsContainer.selectAll('g')
					.data(my.getXData())
					.enter()
					.append('g');

			labels.attr('x', function(d, index) {
				var
					duration = that.getModel().get('rangeDuration'),
					unitObject = my.getUnitObjectForDuration(duration);
				return o.pro(index, my.getColumnWidthByUnit(unitObject.unit)) ||
					my.options.chart.labels.arrowSize;
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

				if ((thisOffsetLeft === my.options.chart.labels.arrowSize ||
						thisOffsetLeft >= offsetWithSpace) &&
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

		my.getXData = function() {
			var
				newData = [],
				duration = that.getModel().get('rangeDuration'),
				unitObject = my.getUnitObjectForDuration(duration),
				length = Math.floor(duration.as(unitObject.unit));

			for (var i = 0; i < length; i++) {
				var label;
				if (unitObject.unit === 'M') {
					label = m.Moment.months(i);
				}
				else {
					label = o.sum(i, 1).toString();
					label = label.length === 1 ? '0' + label : label;
					label = m.Moment(label, unitObject.unit).
						format(unitObject.format);
				}
				newData.push(label);
			}
			return newData;
		};

		my.getUnitObjectForDuration = function(duration) {
			var
				unit	= 'y',
				format	= 'YYYY',
				years	= Math.floor(duration.asYears()),
				months	= Math.floor(duration.asMonths()),
				days	= Math.floor(duration.asDays());

			if (years <= 1) {
				unit = 'M';
				format = 'MMMM';

				if (months <= 1) {
					unit = 'd';
					format = 'D MMMM';

					if (days <= 1) {
						unit = 'h';
						format = 'Ha';
					}
				}
			}
			return {
				unit: unit,
				fromat: format
			};
		};

		my.getColumnWidthByUnit = function(unit) {
			return o.quo(
					my.options.chart.width,
					that.getModel().get('rangeDuration').as(unit)
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
				.text('dummyText')
				.attr('x', my.getTooltipTextXPosition)
				.attr('y', my.getTooltipTextYPosition);
		};

		my.getTooltipTextYPosition = function() {
			var
				tooltipHalf = o.quo(my.options.chart.tooltip.height, 2),
				thisHalf;
			tooltipHalf = o.sum(tooltipHalf, my.options.chart.tooltip.arrowSize);
			thisHalf = o.quo(o.num($(this).height()), 4);
			return o.sum(tooltipHalf, thisHalf);
		};

		my.getTooltipTextXPosition = function() {
			return o.quo(my.options.chart.tooltip.height, 2);
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

		my.refresh = function() {
			that.render();

			var debouncedResize = _.debounce(function() {
				that.render();
			}, 200);
			$(window).resize(debouncedResize);
		};

		that.setModel = function(model) {
			my.model = model;
			my.model.on('change', my.refresh);
			my.model.refresh();
		};

		that.getModel = function() {
			return my.model;
		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return timeline;
});
