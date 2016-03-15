(function() {
	'use strict';
	var wrapper, note;

	function WeekCalendarView() {
		var initWeekTempl = function() {
			wrapper = '<center><table>{{#days}}<tr>' +
				'<td class="weekday js-weekday" value="{{dayIndex}}">{{dayName}}</td>' +
				'<td class="note"><span><div>Note:</span>{{noteInfo}}</div></td></tr>{{/days}}</table></center>';
		};
		var initNoteTempl = function() {
			note = '<center><table>' +
				'<thead "><tr><td class="weekday">{{currentDay}}</td></tr></thead>' +
				'<tbody><tr><td class="note">{{currentNote}}</td></tr></tbody>' +
				'</table></center>';
		};
		initWeekTempl();
		initNoteTempl();
		this.getWeekTempl = function() {
			return wrapper;
		};
		this.getNoteTempl = function() {
			return note;
		};
	}

	window.WeekCalendarView = WeekCalendarView;
})();