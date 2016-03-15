(function() {
	'use strict';

	function CalendarView() {
		var wrapper;

		var setMainCover = function() {
			wrapper = '<div class="switcher">' +
				'{{#buttots}}<div class="switcher__button">{{.}}</div>{{/buttots}}</div>' +
				'<div class="display"></div>';
		};
		setMainCover();

		this.getMainCover = function() {
			return wrapper;
		};

	}

	window.CalendarView = CalendarView;
})();