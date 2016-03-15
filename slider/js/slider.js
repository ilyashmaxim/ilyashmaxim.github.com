(function($) {
	'use strict';

	function Slider(node, data) {
		this.$root = $(node);
		this.slides = data.slice();
		this.buildHtml();
		this.$imgConteiner = this.$root.find('.holder');
		this.$listMenu = this.$root.find('.navi');
		this.sizeImg = null;
		this.slideIndex = null;
		this.duration = null;
		this.marginStart = null;
		this.timing = null;
		this.interval = null;
		this.sliderEvents();
		this.animateSlider();
	}
	Slider.prototype.buildHtml = function() {
		var temp = '<div class="conteiner">' +
			'<div class="coll navi">' +
			'<% _.each(this,function(element, index, list){ %>' +
			'<a class="classLink" href="#" value="<%= index %>"></a>' +
			'<% }); %>' +
			'</div>' +
			'<div class="coll gallery">' +
			'<div class="holder">' +
			'<% _.each(this,function(element, index, list){ %>' +
			'<img class="classImg" src="<%= element %>" value="<%= index %>"></img>' +
			'<% }); %>' +
			'</div>' +
			'</div>' +
			'</div>';
		var triangle = this.createTriange();
		var html = _.bind(_.template(temp, this.slides), this.slides);
		$(html).find('.classLink').filter('[value="0"]').addClass('active').append(triangle);
		this.$root.append(html);
	};
	Slider.prototype.setStartValue = function() {
		this.sizeImg = this.$root.find('.classImg').eq(0).width();
		if (this.sizeImg !== 540) this.sizeImg = 540;
		// $('.classImg').load(function() {
		// 	this.sizeImg = $(this).width();
		// });
		this.slideIndex = -1;
		this.duration = 800;
		this.marginStart = 0;
	};
	Slider.prototype.sliderEvents = function() {
		var _self = this;
		this.$listMenu.on('click', '.classLink', this.selectImg.bind(this));
		//this.$listMenu.on('mouseenter mouseleave','.classLink', function() {
		//	$(this).toggleClass("hoverS");
		//});
	};
	Slider.prototype.selectImg = function(event) {
		var _self = this;
		this.$imgConteiner.stop(true, true);
		clearTimeout(this.timing);
		clearInterval(this.interval);
		var target = event.target;
		var linkIndex = $(target).attr('value');
		this.lightListElem(linkIndex);
		this.marginStart = -(linkIndex) * this.sizeImg;
		this.$imgConteiner
			.css({
				'margin-left': _self.marginStart
			});
		this.timing = setTimeout(this.animateSlider.bind(this), 3000);
	};
	Slider.prototype.animateSlider = function() {
		this.setStartValue();
		this.interval = setInterval(this.animation.bind(this), 2000);
	};
	Slider.prototype.animation = function() {
		var _self = this;
		this.$imgConteiner.animate({
			'margin-left': _self.marginStart
		}, this.duration, this.shiftImg.bind(this));
	};
	Slider.prototype.shiftImg = function() {
		this.lightListElem();
		this.marginStart -= this.sizeImg;
		if (this.marginStart === -(this.sizeImg * this.slides.length)) {
			this.marginStart = 0;
			this.duration = 100;
		} else {
			this.duration = 800;
		}
	};
	Slider.prototype.lightListElem = function(index) {
		var triangle = this.createTriange();
		this.$listMenu.find('.triangle').remove();
		if (this.slideIndex === this.slides.length) this.slideIndex = 0;
		var nextIndex = index || this.slideIndex + 1;
		if (nextIndex === this.slides.length) nextIndex = 0;
		this.$listMenu.find('.active').removeClass('active');
		this.$listMenu.find('[value=' + nextIndex + ']').addClass('active').append(triangle);
		this.slideIndex++;
	};
	Slider.prototype.createTriange = function() {
		var triangle = document.createElement('div');
		$(triangle).addClass('triangle');
		return triangle;
	};
	window.Slider = Slider;
})($);
