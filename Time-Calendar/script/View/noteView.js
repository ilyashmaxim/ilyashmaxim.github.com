(function() {
	'use strict';
	var note;

	function NoteCalendarView() {

		var initNoteTempl = function() {
			note = '<center><table>' +
				'<thead "><tr><td class="weekday">{{currentDay}}</td></tr></thead>' +
				'<tbody><tr><td class="note">{{currentNote}}</td></tr></tbody>' +
				'</table></center>';
		};
		initNoteTempl();

		this.getNoteTempl = function() {
			return note;
		};
	}

	window.NoteCalendarView = NoteCalendarView;
})();