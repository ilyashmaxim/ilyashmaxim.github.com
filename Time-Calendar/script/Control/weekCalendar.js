(function() {
	'use strict';

	function WeekCalendar(node) {
		this.$root = node;
		this.weekCalendarModel = new WeekCalendarModel();
		this.weekCalendarView = new WeekCalendarView();		
	}

	WeekCalendar.prototype.renderWeek = function() {
		var currentDay = this.weekCalendarModel.daySet();
		var weekTempl, weekHtml, weekData;
		weekTempl = this.weekCalendarView.getWeekTempl();
		weekData = this.weekCalendarModel.getWeekData();
		weekHtml = Mustache.to_html(weekTempl, weekData);
		this.$root.append(weekHtml);
		this.$root.find('.js-weekday')
			.filter('[value=' + currentDay + ']')
			.addClass('weekday--current');
		this.dayNote = new DayNote(this.$root);
	};
	
	WeekCalendar.prototype.switchWeek = function() {
		var $bnt = this.$root.find('.js-weekday');
		$bnt.on('click', this.noteControl.renderNote.bind(this));
	};

	window.WeekCalendar = WeekCalendar;
})();