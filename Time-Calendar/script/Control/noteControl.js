(function() {
	'use strict';

	function DayNote(node, model) {
		this.$root = node;
		this.dayModel = model;
		this.dayView = new NoteCalendarView();
		this.nodeHtml;
		this.switchWeek();
	}
	DayNote.prototype.renderDay = function(event) {
		var nodeTempl, nodeHtml, noteData;
		noteData = this.dayModel;
		nodeTempl = this.dayView.getNoteTempl();
		this.nodeHtml = Mustache.to_html(nodeTempl, noteData);
	};
	DayNote.prototype.appendNote = function() {
		this.$root.html('').append(this.nodeHtml);
	};
	DayNote.prototype.switchWeek = function() {
		var $bnt = this.$root.find('.js-weekday').filter('[value=' + this.dayModel.dayIndex + ']');
		$bnt.on('click', this.appendNote.bind(this));
	};
	window.DayNote = DayNote;
})();