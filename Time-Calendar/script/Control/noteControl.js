(function() {
	'use strict';

	function DayNote(node) {
		this.$root = node;
		this.dayModel = new DayModel();
		this.dayView = new NoteCalendarView();
		this.switchWeek();
	}
	DayNote.prototype.renderDay = function(event) {
		var nodeTempl, nodeHtml, noteData;
		noteData = this.dayModel.getNoteData(event.target.textContent); //должен приходить только нужный день
		nodeTempl = this.dayView.getNoteTempl();
		nodeHtml = Mustache.to_html(nodeTempl, noteData);
		this.$root.html('').append(nodeHtml);
	};
	DayNote.prototype.switchWeek = function() {
		var $bnt = this.$root.find('.js-weekday');
		$bnt.on('click', this.renderDay.bind(this));
	};
	window.DayNote = DayNote;
})();