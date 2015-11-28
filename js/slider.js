(function($) {
	'use strict';

	function Slider(node, data) {
		this.root = node;
		this.slides = data.slice();
		this.Builder();
		this.$imgConteiner = $('.gallery>ul');
		this.sizeImg = null;
		this.index = null;
		this.duration = null;
		this.marginStart = null;
		this.interval = null;
		this.setStartValue();
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
			if (i === 0) $(link).addClass('active');
			coll1.appendChild(link);
		}
		conteiner.appendChild(coll1);
		var coll2 = document.createElement('div');
		$(coll2).addClass('coll gallery');
		var ul = document.createElement('ul');
		coll2.appendChild(ul);
		for (var j = 0; j < this.slides.length; j++) {
			var img = document.createElement('img');
			$(img).attr({
				'src': this.slides[j],
				'value': (j)
			}).addClass('classImg');
			var li = document.createElement('li');
			ul.appendChild(li);
			li.appendChild(img);
		}
		conteiner.appendChild(coll2);
		this.root.appendChild(conteiner);
	};
	Slider.prototype.setStartValue = function() {
		this.sizeImg = $('.classImg').eq(0).width();
		if (this.sizeImg !== 540) this.sizeImg = 540;
		// $('.classImg').load(function() {
		// 	this.sizeImg = $(this).width();
		// });
		this.index = 0;
		this.duration = 800;
		this.marginStart = -this.sizeImg;
	};
	Slider.prototype.SelectImg = function() {
		var _self = this;
		$('.navi').on('click', '.classLink', function(event) {
			var target = event.target;
			var linkIndex = $(target).attr('value');
			$('.navi').find('.active').removeClass('active');
			$(target).addClass('active');
			_self.marginStart = -(linkIndex) * _self.sizeImg;
			_self.$imgConteiner
				.css({
					'margin-left': _self.marginStart
				});
			clearInterval(_self.interval);
			_self.marginStart = 0;
			_self.index = -1;
			setTimeout(_self.AnimateImg.bind(_self), 3000);
		});
	};
	Slider.prototype.AnimateImg = function() {
		this.interval = setInterval(this.ShiftImg.bind(this), 2000);
	};
	Slider.prototype.ShiftImg = function() {
		//debugger;
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
	Slider.prototype.HoverByIndex = function() {
		//debugger;
		//var currentIndex = index||this.index;
		if (this.index === this.slides.length) this.index = 0;
		var nextIndex = this.index + 1;
		if (nextIndex === this.slides.length) nextIndex = 0;
		$('.navi').find('.active').removeClass('active');
		$('.navi').find('[value=' + nextIndex + ']').addClass('active');
		this.index++;
	};
	window.Slider = Slider;
})($);
