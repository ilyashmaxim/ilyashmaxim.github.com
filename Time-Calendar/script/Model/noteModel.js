(function() {
	'use strict';

	function DayModel(node) {
		var dayData;
		var initNoteData = function() {
			dayData = [{
				dayName: 'Monday',
				dayIndex: '0',
				noteInfo: [{
					note: 'Lorem ipsum'
				}, {
					note: 'La-la-la Lo-lo-lo'
				}]
			}, {
				dayName: 'Tuesday',
				dayIndex: '1',
				noteInfo: [{
					note: 'Lorem ipsum'
				}]
			}, {
				dayName: 'Wednesday',
				dayIndex: '2',
				noteInfo: [{
					note: 'Lorem ipsum'
				}]
			}, {
				dayName: 'Thursday',
				dayIndex: '3',
				noteInfo: [{
					note: 'Lorem ipsum'
				}]
			}, {
				dayName: 'Friday',
				dayIndex: '4',
				noteInfo: [{
					note: 'Lorem ipsum'
				}]
			}, {
				dayName: 'Saturday',
				dayIndex: '5',
				noteInfo: [{
					note: 'Lorem ipsum'
				}]
			}, {
				dayName: 'Sunday',
				dayIndex: '6',
				noteInfo: [{
					note: 'Lorem ipsum'
				}]
			}];
		};
		initNoteData();

		this.getNoteData = function() {
			return dayData;
		};
	}
	window.DayModel = DayModel;
})();