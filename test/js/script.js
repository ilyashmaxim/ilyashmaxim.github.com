(function($) {
	'use strict';

	function InfoBox(node) {
		debugger;
		this.$root = $(node);
		this.productIndex = 1;
		this.Box = this.Builder();
		this.$root.append(this.Box);
		this.AddProductInfo();
		this.InfoBoxEvent();
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
	InfoBox.prototype.AddProductInfo = function() {
		var $node = this.$root.find('.productView');
		$node.each(function(index, element) {
			$.getJSON('./src/info_box.json', {}, function(json) {
				var $container = $(element);
				var activeClass;
				for (var i = 0; i < json.length; i += 1) {
					var product = document.createElement('div');
					if (i === 0) activeClass = 'product active';
					else activeClass = 'product not-active';
					$(product).addClass(activeClass).attr({
						value: i + 1
					});
					var headerInfo = document.createElement('h3');
					$(headerInfo).text(json[i].title)
						.addClass('headerInfo');
					var img = document.createElement('img');
					$(img).attr({
						src: 'src/img/' + json[i].img
					});
					var bodyInfo = document.createElement('div');
					var descriptionInfo = document.createElement('p');
					$(descriptionInfo).text(json[i].description);
					var noteInfo = document.createElement('p');
					$(noteInfo).text(json[i].note);
					$(bodyInfo).addClass('bodyInfo')
						.append(descriptionInfo)
						.append(noteInfo);
					$(product).append(img)
						.append(headerInfo)
						.append(bodyInfo);
					$container.append(product);
				}
			});
		});
	};

	InfoBox.prototype.InfoBoxEvent = function() {
		var _self = this;
		var $buttonNext = $(this.Box).find('.naviView');
		$buttonNext.on('click', 'div', _self.ShowProduct.bind(_self));
	};
	InfoBox.prototype.ShowProduct = function(event) {
		var target = event.currentTarget;
		var $products = $(this.Box).find('.product');
		var $activeImg;
		var $nextImg;
		if (this.productIndex > $products.length) this.productIndex = 1;
		if (this.productIndex < 1) this.productIndex = $products.length;
		$activeImg = $products.filter('[value=' + this.productIndex + ']');
		if ($(target).hasClass('btn_right')) {
			if (this.productIndex === $products.length) {
				$nextImg = $products.filter('[value=' + 1 + ']');
			} else {
				$nextImg = $products.filter('[value=' + (this.productIndex + 1) + ']');
			}
			this.productIndex += 1;
			Show();
		} else if ($(target).hasClass('btn_left')) {
			if (this.productIndex === 1) {
				$nextImg = $products.filter('[value=' + $products.length + ']');
			} else {
				$nextImg = $products.filter('[value=' + (this.productIndex - 1) + ']');
			}
			this.productIndex -= 1;
			Show();
		} else {
			this.productIndex = this.productIndex;
		}
		function Show() {
			$('.productView').animate(800, function() {
				$activeImg.addClass('not-active').removeClass('active');
				$nextImg.addClass('active').removeClass('not-active');
			});
		}
	};
	window.InfoBox = InfoBox;
})($);