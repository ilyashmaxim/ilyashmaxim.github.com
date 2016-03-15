(function() {
	'use strict';
	var wrapper;

	function WeekCalendarView() {
		var initWeekTempl = function() {
			wrapper = '<center><table>{{#days}}<tr>' +
				'<td class="weekday js-weekday" value="{{dayIndex}}">{{dayName}}</td>' +
				'<td class="note"><span><div>Note:</span>{{noteInfo}}</div></td></tr>{{/days}}</table></center>';
		};
		
		initWeekTempl();
		this.getWeekTempl = function() {
			return wrapper;
		};
	}

	window.WeekCalendarView = WeekCalendarView;
})();