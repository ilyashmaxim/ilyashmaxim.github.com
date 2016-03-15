(function() {
	'use strict';

	function Timer(elem) {
		this.root = elem;
		this.secondmeter = this.BuildHtml();
		this.root.appendChild(this.secondmeter);
		this.btnStart = this.secondmeter.querySelector('.btn-primary');
		this.btnLap = this.secondmeter.querySelector('.btn-info');
		this.btnReset = this.secondmeter.querySelector('.btn-danger');
		this.timeTable = this.secondmeter.querySelector('.stopwatch-curretn');
		this.stopwatchLaps = this.secondmeter.querySelector('.stopwatch-laps');
		this.timeNow = null;
		this.timeValue = 0;
		this.startTime = 0;
		this.pastTime = 0;
		this.MouseEventAdd();
		this.KeyEventAdd();
	}
	Timer.prototype.BuildHtml = function() {
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
		var start = document.createElement('button');
		start.classList.add('btn');
		start.classList.add('btn-primary');
		start.textContent = 'Start';
		btnGroup.appendChild(start);
		var lap = document.createElement('button');
		lap.classList.add('btn');
		lap.classList.add('btn-info');
		lap.textContent = 'Lap';
		btnGroup.appendChild(lap);
		var reset = document.createElement('button');
		reset.classList.add('btn');
		reset.classList.add('btn-danger');
		reset.textContent = 'Reset';
		col1.appendChild(reset);
		var table = document.createElement('h2');
		table.classList.add('stopwatch-curretn');
		table.innerHTML = '<span>00:00:00:000</span>';
		col.appendChild(table);
		var lapsConteiner = document.createElement('div');
		lapsConteiner.classList.add('stopwatch-laps');
		col.appendChild(lapsConteiner);
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
		while (this.stopwatchLaps.childNodes.length > 0) {
			var i = 0;
			this.stopwatchLaps.removeChild(this.stopwatchLaps.childNodes[i]);
		}
		this.TimeStop();
		this.pastTime = 0;
		this.timeValue = null;
		this.timeTable.textContent = "00:00:00:000";
	};
	Timer.prototype.StartTimeTable = function() {
		this.startTime = new Date().getTime();
	};
	Timer.prototype.TimeGenerator = function() {
		var currentTime = new Date().getTime();
		this.pastTime += currentTime - this.startTime;
		this.timeValue = this.pastTime;
		this.startTime = currentTime;
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
			this.StartTimeTable();
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