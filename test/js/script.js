(function($) {
	'use strict';

	function InfoBox(node) {
		debugger;
		this.$root = $(node);
		this.data1 = [];
		this.Box = null;
		this.Box = this.Builder();
		this.$root.append(this.Box);
		this.GetInfo(this.AddProductInfo, this);
	}
	InfoBox.prototype.Builder = function() {
		var container = document.createElement('div');
		$(container).addClass('container');
		var naviView = document.createElement('div');
		var link = document.createElement('a');
		$(link).addClass('show_detail')
			.attr({
				href: '#'
			})
			.text('Show detail');
		var wrapper = document.createElement('div');
		$(wrapper).append(link);
		$(naviView).addClass('naviView').append(wrapper);

		var buttons = {
			btn_left: {
				url1: 'src/img/button_bg_white_left.png',
				url2: 'src/img/btn_ic_gray_left.png',
				position: 'left',
				contents: 'perv'
			},
			btn_right: {
				url1: 'src/img/button_bg_white_right.png',
				url2: 'src/img/btn_ic_gray_right.png',
				position: 'right',
				contents: 'next'
			},
			btn_store: {
				url1: 'src/img/button_bg_white_right.png',
				url2: 'src/img/btn_ic_gray_right.png',
				position: 'right',
				contents: 'Find a Store'
			}
		};
		for (var key in buttons) {
			var btnsData = buttons[key];
			var btn = document.createElement('div');
			var button_bg = document.createElement('img');
			$(button_bg).attr({
				'src': btnsData.url1,
			}).addClass('button_bg');
			var btn_ic = document.createElement('img');
			$(btn_ic).attr({
				'src': btnsData.url2,
			}).addClass('btn_ic_' + btnsData.position);
			var text = document.createElement('span');
			$(text).text(btnsData.contents)
				.addClass('text_' + btnsData.position);
			$(btn).addClass(key)
				.append(button_bg)
				.append(btn_ic)
				.append(text);
			$(naviView).append(btn);
		}

		var productView = document.createElement('div');
		$(productView).addClass('productView');
		$(container).append(productView).append(naviView);
		return container;
	};
	InfoBox.prototype.AddProductInfo = function(data, _self) {
		_self.data1 = JSON.parse(data);
		var node = _self.$('container>productView');
		for (var i = 0; i < _self.data1.length; i += 1) {
			var product = document.createElement('div');
			if (i === 0) $(product).addClass('active');
			else $(product).addClass('not-active');
			var headerInfo = document.createElement('h3');
			$(headerInfo).text(_self.data1.title)
				.addClass('headerInfo');
			var img = document.createElement('img');
			$(img).text(_self.data1.img);
			var bodyInfo = document.createElement('div')
				.addClass('bodyInfo');
			var descriptionInfo = document.createElement('p');
			$(descriptionInfo).text(_self.data1.description);
			var noteInfo = document.createElement('p');
			$(noteInfo).text(_self.data1.note);
			$(bodyInfo).append(descriptionInfo).append(noteInfo);
			$(product).append(img)
				.append(headerInfo)
				.append(bodyInfo);
			$(node).append(product);
		}
	};

	InfoBox.prototype.GetInfo = function(callback, _self) {
		var request = new XMLHttpRequest();
		var READY_STATE = 4;
		request.open('get', './src/info_box.json');
		request.onreadystatechange = function() {
			if (request.readyState === READY_STATE) {
				callback(request.responseText, _self);
			}
		};
		request.send();
	};
	InfoBox.prototype.InfoBoxEvent = function() {};
	window.InfoBox = InfoBox;
})($);