(function() {
	'use strict';

	function WeekCalendarModel() {
		var wrapperData;
		var initWeekData = function() {
			wrapperData = {
				days: [{
					dayName: 'Monday',
					noteInfo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod' +
						'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,' +
						'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' +
						'consequat.',
					dayIndex: '0'
				}, {
					dayName: 'Tuesday',
					noteInfo: 'Lorem ipsum',
					dayIndex: '1'
				}, {
					dayName: 'Wednesday',
					noteInfo: 'Lorem ipsum',
					dayIndex: '2'
				}, {
					dayName: 'Thursday',
					noteInfo: 'Lorem ipsum',
					dayIndex: '3'
				}, {
					dayName: 'Friday',
					noteInfo: 'Lorem ipsum',
					dayIndex: '4'
				}, {
					dayName: 'Saturday',
					noteInfo: 'Lorem ipsum',
					dayIndex: '5'
				}, {
					dayName: 'Sunday',
					noteInfo: 'Lorem ipsum',
					dayIndex: '6'
				}]
			};
		};
		initWeekData();
		this.getWeekData = function() {
			return wrapperData;
		};
	}

	WeekCalendarModel.prototype.daySet = function() {
		var currentDate = new Date();
		var currentDay = currentDate.getDay();
		if (currentDay === 0) currentDay = 6;
		else currentDay -= 1;
		return currentDay;
	};

	window.WeekCalendarModel = WeekCalendarModel;
})();