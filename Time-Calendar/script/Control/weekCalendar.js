(function() {
	'use strict';

	function WeekCalendar(node) {
		this.$root = node;
		this.weekCalendarModel = new WeekCalendarModel();
		this.weekCalendarView = new WeekCalendarView();
		this.dayModel = new DayModel();
	}

	WeekCalendar.prototype.renderWeek = function() {
		var currentDay = this.weekCalendarModel.daySet();
		var weekTempl, weekHtml, weekData, noteData;
		var _self = this;
		weekTempl = this.weekCalendarView.getWeekTempl();
		weekData = this.weekCalendarModel.getWeekData();
		weekHtml = Mustache.to_html(weekTempl, weekData);
		this.$root.append(weekHtml);
		this.$root.find('.js-weekday')
			.filter('[value=' + currentDay + ']')
			.addClass('weekday--current');
		noteData = this.dayModel.getNoteData();
		noteData.forEach(function(item, i, arr) {
			var dayNotes = new DayNote(_self.$root, item);
			var dayNoteHtml = dayNotes.renderDay();
		});
	};

	window.WeekCalendar = WeekCalendar;
})();