(function() {
	'use strict';
	function ClockModel() {

	}

	ClockModel.prototype.clockData = function(timeMs) {
		var datte = new Date(timeMs);
		var h = datte.getHours();
		var m = datte.getMinutes();
		var s = datte.getSeconds();
		if (h < 10) h = '0' + h;
		if (m < 10) m = '0' + m;
		if (s < 10) s = '0' + s;
		return "" + h + ':' + m + ':' + s + "";
	};
	ClockModel.prototype.timeSet = function() {
		var currentTime;
		currentTime = Date.now();
		return currentTime;
	};

	window.ClockModel = ClockModel;
})();