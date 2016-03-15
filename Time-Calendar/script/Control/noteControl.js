(function(){
	'use strict';
	function NoteCalendarControler() {
		this.noteView = new NoteCalendarView();
	}
	NoteCalendarControler.prototype.renderNote = function(event) {
		var target = event.target.parentNode;
		var noteData = {
			currentDay: target.firstChild.textContent,
			currentNote: target.lastChild.textContent
		};
		var nodeTempl, nodeHtml;
		nodeTempl = this.noteControl.noteView.getNoteTempl();
		nodeHtml = Mustache.to_html(nodeTempl, noteData);
		this.$root.html('').append(nodeHtml);
	};
	window.NoteCalendarControler = NoteCalendarControler;
})();