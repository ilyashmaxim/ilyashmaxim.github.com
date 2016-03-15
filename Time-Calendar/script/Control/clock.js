(function() {
	'use strict';
	function Clock(node) {
		this.root = node;
		this.ClockModel = new ClockModel();
	}
	Clock.prototype.renderClock = function() {
		var currentTimeMs = this.ClockModel.timeSet();
		var currentTimeFormat = this.ClockModel.clockData(currentTimeMs);
		$(this.root).text(currentTimeFormat);
	};
	window.Clock = Clock;
})();