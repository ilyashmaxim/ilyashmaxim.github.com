(function(){
	'use strict';
	function DayModel(node) {
		var dayData;
		var initNoteData = function() {
			dayData = {
				Monday: {
					dayName: 'Monday',
					noteInfo: [{
						note: 'Lorem ipsum'
					}, {
						note: 'La-la-la Lo-lo-lo'
					}]
				},
				Tuesday: {
					dayName: 'Tuesday',
					noteInfo: [{
						note: 'Lorem ipsum'
					}]
				},
				Wednesday: {
					dayName: 'Wednesday',
					noteInfo: [{
						note: 'Lorem ipsum'
					}]
				},
				Thursday: {
					dayName: 'Thursday',
					noteInfo: [{
						note: 'Lorem ipsum'
					}]
				},
				Friday: {
					dayName: 'Friday',
					noteInfo: [{
						note: 'Lorem ipsum'
					}]
				},
				Saturday: {
					dayName: 'Saturday',
					noteInfo: [{
						note: 'Lorem ipsum'
					}]
				},
				Sunday: {
					dayName: 'Sunday',
					noteInfo: [{
						note: 'Lorem ipsum'
					}]
				}
			};
		};
		initNoteData();
		this.getNoteData = function(key) {
			return dayData[key];
		};
	}
	window.DayModel = DayModel;
})();