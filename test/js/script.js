(function($) {
	'use strict';

	function InfoBox(node) {
		debugger;
		this.$root = $(node);
		var buttonsSkin = {
					btn_left: {
						url1: 'src/img/button_bg_white_left.png',
						urlSelected:'src/img/button_bg_orange_left.png',
						url2: 'src/img/btn_ic_gray_left.png',
						position: 'left',
						contents: 'Perv'
					},
					btn_right: {
						url1: 'src/img/button_bg_white_right.png',
						urlSelected:'src/img/button_bg_orange_right.png',
						url2: 'src/img/btn_ic_gray_right.png',
						position: 'right',
						contents: 'Next'
					},
					btn_store: {
						url1: 'src/img/button_bg_white_store.png',
						urlSelected:'src/img/button_bg_orange_store.png',
						url2: 'src/img/btn_ic_gray_right.png',
						position: 'right',
						contents: 'Find a Store'
					}
				};
		this.productIndex = 1;
		this.productMarginTop = 0;
		this.Box = this.Builder(buttonsSkin);
		this.$root.append(this.Box);
		this.AddProductInfo();
		this.InfoBoxEvent();
	}
	InfoBox.prototype.Builder = function(buttonsSkin) {
		
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
		for (var key in buttonsSkin) {
			var btnsData = buttonsSkin[key];
			var btn = document.createElement('div');
			var button_bg = document.createElement('img');
			$(button_bg).attr({
				'src': btnsData.url1,
			}).addClass('button_bg');
			var button_bg_selected = document.createElement('img');
			$(button_bg_selected).attr({
				'src': btnsData.urlSelected,
			}).addClass('button_bg selected');
			var btn_ic = document.createElement('img');
			$(btn_ic).attr({
				'src': btnsData.url2,
			}).addClass('btn_ic_' + btnsData.position);
			var text = document.createElement('span');
			$(text).text(btnsData.contents)
				.addClass('text_' + btnsData.position);
			$(btn).addClass('btn ' + key)
				.append(button_bg)
				.append(button_bg_selected)
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
		var $btn = $buttonNext.find('.btn');
		$buttonNext.on('click', '.btn', _self.ShowProduct.bind(_self));
		$buttonNext.on('click', '.show_detail', _self.HideProduct.bind(_self));
		$btn.hover(_self.LigthButton.bind(_self));
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

	InfoBox.prototype.HideProduct = function(event) {
		var _self = this;
		var target = event.currentTarget;
		var $product = $('.product').filter('[value=' + this.productIndex + ']');
		var curentText = target.text;
		var newText = 'Hide detail';
		if (this.productMarginTop === 0) this.productMarginTop -= 200;
		else this.productMarginTop = 0;
		$product.animate({
				'margin-top': _self.productMarginTop
			}, 400, function() {
				replaceText();
		});
		function replaceText (){
			if (curentText !== newText) curentText = newText;
			else curentText = 'Show detail';
			$(target).text(curentText);
		}
	};
	InfoBox.prototype.LigthButton = function(event) {
		var target = event.currentTarget;
		var $img = $(target).find('.button_bg');
		$img.toggleClass('selected');
		$(target).toggleClass('selected');
	};

	window.InfoBox = InfoBox;
})($);