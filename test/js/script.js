(function($) {
	'use strict';

	function InfoBox(node) {
		debugger;
		this.$root = $(node);
		this.data1=[];
		this.Box = null;
		this.titleInfoBox = {};
		this.descriptionInfoBox = {};
		this.noteInfoBox = {};
		this.productUrlInfoBox = {};
		this.Box = this.GetInfo(this.Builder, this);
	}
	InfoBox.prototype.Builder = function(data, node) {
		this.data1 = JSON.parse(data);
		var container=createElement('div');
		$(conteiner).addClass('conteiner');

		console.log(this.data1);
		return container;
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