(function() {
	'use strict';
	var wrapperData;

	function CalendarModel() {

		var setMainData = function() {
			wrapperData = {
				buttots: ["Week", "Day"]
			};
		};

		setMainData();

		this.getMainData = function() {
			return wrapperData;
		};
	}

	window.CalendarModel = CalendarModel;
})();