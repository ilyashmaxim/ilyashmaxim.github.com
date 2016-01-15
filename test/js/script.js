(function($) {
	'use strict';

	function InfoBox(node) {
		debugger;
		this.$root = $(node);
		this.data1 = [];
		this.Box = null;
		this.titleInfoBox = {};
		this.descriptionInfoBox = {};
		this.noteInfoBox = {};
		this.productUrlInfoBox = {};
		this.GetInfo(this.Builder, this);
		console.log(this.Box);
	}
	InfoBox.prototype.Builder = function(data, _self) {
		_self.data1 = JSON.parse(data);
		var container = document.createElement('div');
		$(container).addClass('container');

		console.log(_self.data1);
		return container;
	};

	InfoBox.prototype.GetInfo = function(callback, _self) {
		var request = new XMLHttpRequest();
		var READY_STATE = 4;
		request.open('get', './src/info_box.json');
		request.onreadystatechange = function() {
			if (request.readyState === READY_STATE) {
				_self.Box = callback(request.responseText, _self);
			}
		};
		request.send();
	};
	InfoBox.prototype.InfoBoxEvent = function() {};
	window.InfoBox = InfoBox;
})($);