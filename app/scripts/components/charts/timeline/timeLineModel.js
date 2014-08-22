_define({
	BaseModel: 'base/baseModel',
	Data: 'json!/resources/json/2000.json',
	Moment: 'moment',
	Operators: 'util/operators'
}, function(m) {
	'use strict';

	var DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

	var limelineModel = function() {
		var that = {}, my = {};

		that.name = 'limelineModel';
		var o = m.Operators();

		that.construct = function() {
			my.setDefaults();
			return that;
		};

		my.setDefaults = function() {
			var
				defaults = {
					unit: 'days',
					range: {
						start:		m.Moment('2000-01-01 00:00:00', DATE_FORMAT),
						end:		m.Moment('2001-01-01 00:00:00', DATE_FORMAT),
						duration:	null
					}
				};

			defaults.range.duration = m.Moment.duration(
				o.dif(defaults.range.end.valueOf(), defaults.range.start.valueOf())
			);

			that.set('rangeStart',		defaults.range.start,		false);
			that.set('rangeEnd',		defaults.range.end,			false);
			that.set('rangeDuration',	defaults.range.duration,	false);
			that.set('unit',			defaults.unit,				false);
		};

		that.refresh = function() {
			var data = my.parseData(m.Data);
			that.set('data', data);
		};

		my.parseData = function(data) {
			var
				adaptedData = [],
				range = {
					start: that.get('rangeStart'),
					end:   that.get('rangeEnd')
				};

			_.each(data, function(d) {
				var
					mm				= m.Moment,
					now				= mm(),
					newData			= {};

				newData.startValue	= mm(d.startDate, DATE_FORMAT);
				newData.endValue	= d.endDate ? mm(d.endDate, DATE_FORMAT) : now;

				if (newData.endValue.isAfter(range.end)) {
					newData.goesLater = true;
				}
				if (newData.startValue.isBefore(range.start)) {
					newData.goesEarlier = true;
				}

				newData.duration = mm.duration(
					o.dif(newData.endValue.valueOf(), newData.startValue.valueOf())
				);

				newData.title = d.title;

				adaptedData.push(newData);
			});

			return adaptedData;
		};

		var inherited = m.BaseModel();
		that = _.extend(inherited, that);
		that.construct.apply(that, arguments);
		return that;
	};

	return limelineModel;
});
