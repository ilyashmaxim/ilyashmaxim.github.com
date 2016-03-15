(function() {
	'use strict';

	function WeekCalendar(node) {
		this.$root = node;
		this.WeekCalendarModel = new WeekCalendarModel();
		this.WeekCalendarView = new WeekCalendarView();
		this.noteControl = new NoteCalendarControler();
	}

	WeekCalendar.prototype.renderWeek = function() {
		var currentDay = this.WeekCalendarModel.daySet();
		var weekTempl, weekHtml, weekData;
		weekTempl = this.WeekCalendarView.getWeekTempl();
		weekData = this.WeekCalendarModel.getWeekData();
		weekHtml = Mustache.to_html(weekTempl, weekData);
		this.$root.append(weekHtml);
		this.$root.find('.js-weekday')
			.filter('[value=' + currentDay + ']')
			.addClass('weekday--current');
		this.switchWeek();
	};
	
	WeekCalendar.prototype.switchWeek = function() {
		var $bnt = this.$root.find('.js-weekday');
		$bnt.on('click', this.noteControl.renderNote.bind(this));
	};

	window.WeekCalendar = WeekCalendar;
})();