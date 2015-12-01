(function($) {
	'use strict';

	function Slider(node, data) {
		this.$root = $(node);
		this.slides = data.slice();
		this.Builder();
		this.$imgConteiner = this.$root.find('.holder');
		this.$listMenu = this.$root.find('.navi');
		this.sizeImg = null;
		this.slideIndex = null;
		this.duration = null;
		this.marginStart = null;
		this.timing = null;
		this.interval = null;
		this.AnimateImg();
		this.SelectImg();
	}
	Slider.prototype.Builder = function() {
		var conteiner = document.createElement('div');
		$(conteiner).addClass('conteiner');
		var coll1 = document.createElement('div');
		$(coll1).addClass('coll navi');
		for (var i = 0; i < this.slides.length; i++) {
			var link = document.createElement('a');
			$(link).addClass('classLink').attr({
				"href": "#",
				"value": (i)
			});
			if (i === 0) {
				var triangle = this.CreateTriange();
				$(link).addClass('active').append(triangle);
			}
			coll1.appendChild(link);
		}
		conteiner.appendChild(coll1);
		var coll2 = document.createElement('div');
		$(coll2).addClass('coll gallery');
		var holder = document.createElement('div');
		$(holder).addClass('holder');
		coll2.appendChild(holder);
		for (var j = 0; j < this.slides.length; j++) {
			var img = document.createElement('img');
			$(img).attr({
				'src': this.slides[j],
				'value': (j)
			}).addClass('classImg');
			holder.appendChild(img);
		}
		conteiner.appendChild(coll2);
		this.$root.append(conteiner);
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
	Slider.prototype.SelectImg = function() {
		var _self = this;
		this.$listMenu.on('click', '.classLink', function(event) {
			_self.$imgConteiner.stop(true, true);
			clearTimeout(_self.timing);
			clearInterval(_self.interval);
			var target = event.target;
			var linkIndex = $(target).attr('value');
			_self.HoverByIndex(linkIndex);
			_self.marginStart = -(linkIndex) * _self.sizeImg;
			_self.$imgConteiner
				.css({
					'margin-left': _self.marginStart
				});
			_self.timing = setTimeout(_self.AnimateImg.bind(_self), 3000);
		});
		this.$listMenu.on('mouseenter mouseleave','.classLink', function() {
			$(this).toggleClass("hoverS");
		});
	};
	Slider.prototype.AnimateImg = function() {
		this.setStartValue();
		this.interval = setInterval(this.ShiftImg.bind(this), 2000);
	};
	Slider.prototype.ShiftImg = function() {
		var _self = this;
		this.$imgConteiner.animate({
			'margin-left': _self.marginStart
		}, this.duration, function() {
			_self.HoverByIndex();
			_self.marginStart -= _self.sizeImg;
			if (_self.marginStart === -(_self.sizeImg * _self.slides.length)) {
				_self.marginStart = 0;
				_self.duration = 100;
			} else {
				_self.duration = 800;
			}
		});
	};
	Slider.prototype.HoverByIndex = function(index) {
		var triangle = this.CreateTriange();
		this.$listMenu.find('.triangle').remove();
		if (this.slideIndex === this.slides.length) this.slideIndex = 0;
		var nextIndex = index || this.slideIndex + 1;
		if (nextIndex === this.slides.length) nextIndex = 0;
		this.$listMenu.find('.active').removeClass('active');
		this.$listMenu.find('[value=' + nextIndex + ']').addClass('active').append(triangle);
		this.slideIndex++;
	};
	Slider.prototype.CreateTriange = function() {
		var triangle = document.createElement('div');
		$(triangle).addClass('triangle');
		return triangle;
	};
	window.Slider = Slider;
})($);
