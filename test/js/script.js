(function($) {
	'use strict';

	function InfoBox(node, buttons) {
		this.$root = $(node);
		this.buttonsSkin = buttons;
		this.storeLink =[];
		this.productIndex = 0;
		this.productMarginTop = 0;
		this.Box = this.Builder(buttonsSkin);
		this.$root.append(this.Box);
		this.AddProductInfo();
		this.InfoBoxEvent();
	}
	InfoBox.prototype.Builder = function(buttonsSkin) {
		var buttonsSkin = buttonsSkin;
		var cont = '<div class = "container">' +
			'<div class = "productView"></div>' +
			'<div class="naviView"><div class="detail">' +
			'<a class="show_detail">Show detail</a></div>' +
			'<% _.each(buttonsSkin, function(value, key, list) { %> ' +
			'<div class="btn <%=key%>">' +
			'<img class="button_bg" src="<%=value.url1%>"></img>' +
			'<img class="button_bg selected" src="<%=value.urlSelected%>"></img>' +
			'<img class="btn_ic_<%=value.position%>" src="<%=value.url2%>"></img>' +
			'<span class="text_<%=value.position%>"><%=value.contents%></span></div><%}); %></div></div>';
		return _.template(cont, buttonsSkin);
	};
	InfoBox.prototype.AddProductInfo = function() {
		var _self = this;
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
						value: i
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
					_self.storeLink[i] = json[i].productUrl;
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
		$buttonNext.on('click', '.btn_store', _self.LinkStore.bind(_self));
		$btn.hover(_self.LigthButton.bind(_self));
	};
	InfoBox.prototype.ShowProduct = function(event) {
		var target = event.currentTarget;
		var $products = $(this.Box).find('.product');
		var $activeImg;
		var $nextImg;
		var slideCount = $products.length - 1;
		if (this.productIndex > slideCount) this.productIndex = 0;
		if (this.productIndex < 0) this.productIndex = slideCount;
		$activeImg = $products.filter('[value=' + this.productIndex + ']');
		if ($(target).hasClass('btn_right')) {
			if (this.productIndex === slideCount) {
				$nextImg = $products.filter('[value=' + 0 + ']');
			} else {
				$nextImg = $products.filter('[value=' + (this.productIndex + 1) + ']');
			}
			this.productIndex += 1;
			Show();
		} else if ($(target).hasClass('btn_left')) {
			if (this.productIndex === 0) {
				$nextImg = $products.filter('[value=' + slideCount + ']');
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
	InfoBox.prototype.LinkStore = function(event) {
		var target = event.currentTarget;
		window.location.href = this.storeLink[this.productIndex];
	};
	window.InfoBox = InfoBox;
})($);
