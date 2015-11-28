"use strict";
(function() {
	function Timer(elem) {
		this.root = elem;
		this.secondmeter = this.BuildHtml();
		this.root.appendChild(this.secondmeter);
		this.MouseEventAdd();
		this.KeyEventAdd();
		this.timeNow = null;
		this.timeValue = 0;
		this.btnStart;
		this.btnLap;
		this.btnReset;
		this.timeTable;
	}
	Timer.prototype.BuildHtml = function() {
		// debugger;
		var conteiner = document.createElement('div');
		conteiner.classList.add('container');
		var row = document.createElement('div');
		row.classList.add('row');
		conteiner.appendChild(row);
		var col = document.createElement('div');
		col.classList.add('col-xs-4');
		row.appendChild(col);
		var col1 = document.createElement('div');
		col1.classList.add('col-xs-4');
		col1.classList.add('stopwatch-controls');
		row.appendChild(col1);
		var btnGroup = document.createElement('div');
		btnGroup.classList.add('btn-group');
		btnGroup.classList.add('btn-group-lg');
		col1.appendChild(btnGroup);
		this.btnStart = document.createElement('button');
		this.btnStart.classList.add('btn');
		this.btnStart.classList.add('btn-primary');
		this.btnStart.textContent = 'Start';
		btnGroup.appendChild(this.btnStart);
		this.btnLap = document.createElement('button');
		this.btnLap.classList.add('btn');
		this.btnLap.classList.add('btn-info');
		this.btnLap.textContent = 'Lap';
		btnGroup.appendChild(this.btnLap);
		this.btnReset = document.createElement('button');
		this.btnReset.classList.add('btn');
		this.btnReset.classList.add('btn-danger');
		this.btnReset.textContent = 'Reset';
		col1.appendChild(this.btnReset);
		this.timeTable = document.createElement('h2');
		this.timeTable.classList.add('stopwatch-curretn');
		this.timeTable.innerHTML = '<span>00:00:00:000</span>';
		col.appendChild(this.timeTable);
		this.stopwatchLaps = document.createElement('div');
		this.stopwatchLaps.classList.add('stopwatch-laps');
		col.appendChild(this.stopwatchLaps);
		return conteiner;
	};
	Timer.prototype.BuildNewLap = function() {
		var alertBox = document.createElement('div');
		alertBox.classList.add('alert');
		alertBox.classList.add('alert-info');
		alertBox.textContent = this.timeTable.textContent;
		var label = document.createElement('span');
		label.classList.add('label');
		label.classList.add('label-danger');
		label.textContent = 'x';
		alertBox.appendChild(label);
		this.stopwatchLaps.appendChild(alertBox);
	};
	Timer.prototype.DeleteLap = function(event) {
		var target = event.target;
		if (target.classList.contains("label-danger"))
			this.stopwatchLaps.removeChild(target.parentNode);
	};
	Timer.prototype.ResetLap = function() {
		//var lapList = this.stopwatchLaps.childNodes;
		while (this.stopwatchLaps.childNodes.length > 0) {
			var i = 0;
			this.stopwatchLaps.removeChild(this.stopwatchLaps.childNodes[i]);
			console.log(this.stopwatchLaps.childNodes.length > 0);
		}
		console.log('we are heare');
		this.TimeStop();
		this.timeValue = null;
		this.timeTable.textContent = "00:00:00:000";
	};
	// Timer.prototype.StartTimeTable = function() {
	// 	this.startTime = new Date().getTime();
	// };
	Timer.prototype.TimeGenerator = function() {
		this.timeValue += 100;
		// if (!this.timeValue) {
		//var currentTime = new Date().getTime();
		// 	this.timeValue = currentTime - this.startTime;
		// } else {
		// 	this.timeValue = this.timeValue - this.startTime;
		// }
		//this.timeValue = currentTime - this.startTime;
		this.TimeFormat();
	};
	Timer.prototype.TimeFormat = function() {
		var t = this.timeValue;
		var ms = t % 1000;
		t -= ms;
		ms = Math.floor(ms / 10);
		t = Math.floor(t / 1000);
		var s = t % 60;
		t -= s;
		t = Math.floor(t / 60);
		var m = t % 60;
		t -= m;
		t = Math.floor(t / 60);
		var h = t % 60;
		if (h < 10) h = '0' + h;
		if (m < 10) m = '0' + m;
		if (s < 10) s = '0' + s;
		if (ms < 10) ms = '0' + ms;
		this.timeTable.textContent = h + ':' + m + ':' + s + '.' + ms;
	};
	Timer.prototype.TimeRun = function() {
		if (!this.timeNow) {
			//this.StartTimeTable();
			this.timeNow = setInterval(
				this.TimeGenerator.bind(this), 100);
		} else {
			this.TimeStop();
		}
	};
	Timer.prototype.TimeStop = function() {
		clearInterval(this.timeNow);
		this.timeNow = null;
	};
	Timer.prototype.MouseEventAdd = function() {
		this.btnStart.addEventListener('click', this.TimeRun.bind(this));
		this.btnLap.addEventListener('click', this.BuildNewLap.bind(this));
		this.btnReset.addEventListener('click', this.ResetLap.bind(this));
		this.stopwatchLaps.addEventListener('click', this.DeleteLap.bind(this));
	};
	Timer.prototype.KeyEventAdd = function() {
		var _this = this;
		this.secondmeter.addEventListener('mouseenter', function(event) {
			Timer.lastActive = _this;
		});
		document.addEventListener('keypress', function(event) {
			if (Timer.lastActive === _this) {
				if (event.keyCode === 115)
					_this.TimeRun();
				if (event.keyCode === 108)
					_this.BuildNewLap();
				if (event.keyCode === 114)
					_this.ResetLap();
			}
		});
	};
	window.Timer = Timer;
})();