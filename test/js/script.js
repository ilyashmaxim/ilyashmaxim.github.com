(function($) {
	'use strict';

	function InfoBox(node) {
		debugger;
		this.$root = $(node);
		this.imgInfoBox = [];
		this.titleInfoBox = [];
		this.descriptionInfoBox = [];
		this.noteInfoBox = [];
		this.productUrlInfoBox = [];
		this.GetInfo(this.Builder, this);
	}
	InfoBox.prototype.Builder = function(data, node) {
		var data1 = data;
		console.log(data1);
	};

	InfoBox.prototype.GetInfo = function(callback, node) {
		var request = new XMLHttpRequest();
		var READY_STATE = 4;
		request.open('get', './src/info_box.json');
		request.onreadystatechange = function() {
			if (request.readyState === READY_STATE) {
				callback(request.responseText, node);
			}
		};
		request.send();
	};
	InfoBox.prototype.InfoBoxEvent = function() {};
	window.InfoBox = InfoBox;
})($);