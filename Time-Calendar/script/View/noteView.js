(function() {
	'use strict';
	var note;

	function NoteCalendarView() {

		var initNoteTempl = function() {
			note = '<center><table>' +
				'<thead "><tr><td class="weekday">{{dayName}}</td></tr></thead>' +
				'<tbody>{{#noteInfo}}<tr><td class="note">{{note}}</td></tr>{{/noteInfo}}</tbody>' +
				'</table></center>';
		};
		initNoteTempl();

		this.getNoteTempl = function() {
			return note;
		};
	}

	window.NoteCalendarView = NoteCalendarView;
})();