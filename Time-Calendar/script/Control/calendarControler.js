(function() {
	'use strict';

	function Calendar(node) {//вынести объекты в отельные файлы
		this.$node = $(node);
		this.calendarModel = new CalendarModel();
		this.calendarView = new CalendarView();
		this.buildCover();
		this.root = $(node).find('.display');
		this.calendarClock = new Clock(this.root);
		this.calendarWeekCalendar = new WeekCalendar(this.root);
		this.renderCalendarInfo();
		this.switchCalendarInfo(this.$node);
		
	}
	Calendar.prototype.buildCover = function() {
		var calendarMainCover = this.calendarView.getMainCover();
		var calendarMainData = this.calendarModel.getMainData();
		var html = Mustache.to_html(calendarMainCover, calendarMainData);
		this.$node.append(html);
	};
	Calendar.prototype.renderCalendarInfo = function(rulse) {
		var _self = this;
		this.root.html('');
		clearInterval(this.intervalClock);
		switch (rulse) {
			case 'Week':
				this.calendarWeekCalendar.renderWeek();
				break;
			case 'Day':
				this.intervalClock = setInterval(function() {
					return _self.calendarClock.renderClock();
				}, 1000);
				break;
			default:
				this.calendarWeekCalendar.renderWeek();
				break;
		}
	};
	Calendar.prototype.switchCalendarInfo = function(node) {
		var _self = this;
		var $bnt = node.find('.switcher__button');
		$bnt.on('click', function() {
			_self.renderCalendarInfo(this.textContent);
		});
	};

	window.Calendar = Calendar;
})();
