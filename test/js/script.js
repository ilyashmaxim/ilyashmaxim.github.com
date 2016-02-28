(function($) {
	'use strict';

	function InfoBox(node, buttons) {
		this.$root = $(node);
		this.buttonsSkin = {data:buttons};
		this.storeLink =[];
		this.productIndex = 0;
		this.productMarginTop = 0;
		this.Box = this.buildMainHtml(this.buttonsSkin);
		this.$root.append(this.Box);
		this.addProductInfo();
		this.infoBoxEvent();
	}
	InfoBox.prototype.buildMainHtml = function(buttonsSkin) {
		var cont = _.template('<div class = "container">' +
			'<div class = "productView"></div>' +
			'<div class="naviView"><div class="detail">' +
			'<a class="show_detail">Show detail</a></div>' +
			'<% _.each(data, function(value, key, list) { %> ' +
			'<div class="btn <%=key%>">' +
			'<img class="button_bg" src="<%=value.url1%>"></img>' +
			'<img class="button_bg selected" src="<%=value.urlSelected%>"></img>' +
			'<img class="btn_ic_<%=value.position%>" src="<%=value.url2%>"></img>' +
			'<span class="text_<%=value.position%>"><%=value.contents%></span></div><%}); %></div></div>');
		return cont(buttonsSkin);
	};
	InfoBox.prototype.addProductInfo = function() {
		var _self = this;
		var $node = this.$root.find('.productView');
		$node.each(function(index, element) {
			$.getJSON('./src/info_box.json', {}, function(json) {
				var productViewData = {data:json};
				var $container = $(element);
				var cont1 = _.template('<% _.each(data, function(element, index, list) { %>'+
							'<div class="product not-active" value="<%=index%>">'+
								'<img src="src/img/<%=element.img%>"></img>'+
								'<h3 class="headerInfo"><%=element.title%></h3>'+
								'<div class="bodyInfo">'+
									'<p><%=element.description%></p>'+
									'<p><%=element.note%></p>'+
								'</div>'+
							'</div><%}); %>');
				productViewData.data.forEach(function(element, index){
					_self.storeLink[index] = element.productUrl;
				});
				var temp = cont1(productViewData);
				$container.append(temp);
				$container.find('.product').filter('[value=0]').addClass('active').removeClass('not-active');
			});
		});
	};

	InfoBox.prototype.infoBoxEvent = function() {
		var _self = this;
		var $buttonNext = $(this.Box).find('.naviView');
		var $btn = $buttonNext.find('.btn');
		$buttonNext.on('click', '.btn', _self.showProduct.bind(_self));
		$buttonNext.on('click', '.show_detail', _self.hideProduct.bind(_self));
		$buttonNext.on('click', '.btn_store', _self.linkStore.bind(_self));
		$btn.hover(_self.ligthButton.bind(_self));
	};
	InfoBox.prototype.showProduct = function(event) {
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
	InfoBox.prototype.hideProduct = function(event) {
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
	InfoBox.prototype.ligthButton = function(event) {
		var target = event.currentTarget;
		var $img = $(target).find('.button_bg');
		$img.toggleClass('selected');
		$(target).toggleClass('selected');
	};
	InfoBox.prototype.linkStore = function(event) {
		var target = event.currentTarget;
		window.location.href = this.storeLink[this.productIndex];
	};
	window.InfoBox = InfoBox;
})($);
