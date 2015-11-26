/*$(function() {*/

(function() {
	'use strict';

	function Slider(node, data) {
		//debugger;
		this.root = node;
		this.slides = data.slice();
		this.Builder();
		this.$selfy = $('.gallery>ul');
		//var sizeI;
		//$('.classImg').eq(0).load(function() {
		//	sizeI = $(this).width();
		//});
		//$("<img/>") // Сделаем в памяти копию этой картинки, чтобы избежать проблем с CSS
		//	.attr("src", this.slides[0])
		//	.load(function() {
		//		// Здесь копия нашей картинки загружена и можно получить её размеры
		//		sizeI = this.width; // Учтите: $(this).width() не сработает
		//	});
		//this.sizeImg = sizeI;

		this.sizeImg = $('.classImg').eq(0).width();
		this.index = 0;
		this.marginStart = -this.sizeImg;
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
			$(img).attr('src', this.slides[j]).attr('value', (j));
			$(img).addClass('classImg');
			ul.appendChild(img);
		}
		conteiner.appendChild(coll2);
		this.root.appendChild(conteiner);
		$('.classImg').load(this);
	};

	Slider.prototype.SelectImg = function() {
		var _self = this;
		$('.navi').on('click', '.classLink', function(event) {
			event.preventDefault();
			var target = event.target;
			var linkIndex = $(target).attr('value');
			$('.navi').find('.active').removeClass('active');
			$(target).addClass('active');
			_self.marginStart = -(linkIndex) * _self.sizeImg;
			_self.$selfy
				.css({
					'margin-left': _self.marginStart
				});
			/*.stop();*/
			clearInterval(_self.interval);
			_self.marginStart = 0;
			setTimeout(_self.AnimateImg(), 3000);
			//_self.AnimateImg();
		});
	};
	Slider.prototype.AnimateImg = function() {
		this.index = 0;
		var duration = 800;
		// var $selfy = $('.gallery>ul');
		// var sizeImg = $('.classImg').width();
		this.interval = setInterval(Anim.bind(this), 2000);

		function Anim() {
			//debugger;
			var _self = this;
			this.$selfy.animate({
				'margin-left': _self.marginStart
			}, duration, function() {
				//_self.HoverByIndex();
				_self.marginStart -= _self.sizeImg;
				if (_self.marginStart === -(_self.sizeImg * _self.slides.length)) {
					_self.marginStart = 0;
					_self.index = 0;
					duration = 100;
				} else {
					duration = 800;
				}
			});
		}
	};

	Slider.prototype.HoverByIndex = function() {
		var _self = this;
		var nextIndex = this.index + 1;
		if (this.index === this.slides.length - 1) {
			nextIndex = 0;
		}
		$('.navi').find('[value=' + _self.index + ']').removeClass('active');
		$('.navi').find('[value=' + nextIndex + ']').addClass('active');
		this.index++;
	};
	window.Slider = Slider;
})();

/*});*/