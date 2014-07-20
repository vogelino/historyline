_define({
	BaseView: 'base/BaseView',
	Template : 'text!tests/barchartTest.html',
	d3: 'd3',
	operators: 'util/operators'
}, function(m) {
	'use strict';

	var barchartTest = function() {
		var that = {}, my = {};

		that.name = 'barchartTest';
		that.template = m.Template;
		var o = m.operators();

		that.construct = function() {
			that.on('view_ready', that.onViewReady);
			return that;
		};

		that.onViewReady = function() {
			var
				bars,
				labels,
				title,
				barWidth,
				barHeightRatio,
				chartWidth = $(window).width(),
				chartHeight = $(window).outerHeight(),
				barsSpace = 2,
				labelFontSize = 12,
				avaliableHeightDivider = 4,
				dataset = my.getRandomDataSet(50),
				$chart = that.$el.find('#chart-container'),
				svg = m.d3.select($chart[0]).append('svg'),
				scale = m.d3.scale.linear();

			svg.attr('width', chartWidth)
			   .attr('height', chartHeight);

			// Scale
			scale.domain([10, 250]);

			// Title
			title = svg.append('text').text('Barchat test');

			title.attr('font-size', '56px')
				 .attr('font-family', 'Arial');

			title.attr('x', function() {
				var
					chartHalf = o.quo(chartWidth, 2),
					textWidth = this.getComputedTextLength();
				return o.dif(chartHalf, o.quo(textWidth, 2));
			}).attr('y', function() {
				var chartHalf = o.quo(chartHeight, 2);
				return o.dif(chartHalf, o.quo(chartHalf, 2));
			});

			// Bars
			bars = svg.selectAll('rect')
				.data(dataset)
				.enter()
				.append('rect');

			barWidth = my.getRelativeBarWidth(
				chartWidth,
				dataset.length,
				barsSpace);

			barHeightRatio = my.getBarHeightRatio(
				dataset,
				chartHeight,
				avaliableHeightDivider);

			bars.attr('width', barWidth)
				.attr('height', function(d) {
					return o.pro(d, barHeightRatio);
				});

			bars.attr('x', function(d, i) {
				return o.sum(
					o.pro(i, o.sum(barWidth, barsSpace)),
					barsSpace
				);
			});

			bars.attr('y', function(d) {
				var barHeight = o.pro(d, barHeightRatio);
				barHeight = barHeight >= 0 ? barHeight : 0;
				return o.dif(chartHeight, barHeight);
			});

			bars.attr('fill', function(d) {
				var rgbValue = my.getRgbValue(d);
				return 'rgb(' + rgbValue + ', ' +
								rgbValue + ',' +
								rgbValue + ')';
			});

			// Labels
			labels = svg.selectAll('text')
				.data(dataset)
				.enter()
				.append('text');

			labels.text(function(d) {
				return d;
			});

			labels.attr('x', function(d, i) {
				var
					dText = '' + d,
					barPosition = o.sum(
						o.pro(i, o.sum(barWidth, barsSpace)),
						barsSpace),
					spaceLeft = o.dif(
						barWidth,
						o.pro(
							o.pro(labelFontSize, dText.length),
							0.6));
				return o.sum(
					barPosition,
					Math.max(o.quo(spaceLeft, 2)));
			});

			labels.attr('y', function(d) {
				var
					barHeight = o.pro(d, barHeightRatio),
					barPosition = o.dif(chartHeight, barHeight),
					spaceLeft = o.dif(barWidth, labelFontSize);
				barHeight = barHeight >= 0 ? barHeight : 0;
				return o.dif(
					barPosition,
					Math.max(o.quo(spaceLeft, 2)));
			});

			labels.attr('font-family', 'arial')
				  .attr('font-size', labelFontSize + 'px');
		};

		my.getRandomDataSet = function(length) {
			var dataset = [];
			for (var i = 0; i < length; i++) {
				var newNumber = o.pro(Math.random(), 10);
				dataset.push(Math.round(newNumber));
			}
			return dataset;
		};

		my.getRelativeBarWidth = function(totalWidth, barsAmount, margin) {
			var
				totalMargin = o.sum(
					o.pro(barsAmount, margin),
					margin),
				barWidth = o.quo(
					o.dif(totalWidth, totalMargin),
					barsAmount);
			barWidth = barWidth >= 0 ? barWidth : 0;
			return barWidth;
		};

		my.getBarHeightRatio = function(dataset, chartHeight, heightDivider) {
			var
				avaliableHeight = o.quo(chartHeight, heightDivider),
				sortedData = _.sortBy(dataset, function(num) {
					return num;
				});

			return o.quo(avaliableHeight, sortedData[sortedData.length - 1]);
		};

		my.getRgbValue = function(d) {
			return o.quo(o.sum(20, o.pro(d, 30)), 2);
		};

		var inherited = m.BaseView();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return barchartTest;
});
