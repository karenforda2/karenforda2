(!function() {
	'use strict';

	function init() {
		$('.navigation--item a').on('click', function(e) {
			var elementID = $(this).attr('href');
			e.preventDefault();
			scrollToCoord(elementID);
		});
	}

	function scrollToCoord(element) {
		var scrollInt = null;
		var elPosition = $(element).offset().top - 20;
		var body = document.body;
		var	html = document.documentElement;
		var lastScrollY = 0;
		var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

		// if element is short, and the document cannot be scrolled to the actual element, then set scroll position to scroll as low as is possible
		if (elPosition + window.innerHeight > docHeight) {
			elPosition = docHeight - window.innerHeight;
		}

		// continue scroll incrementally, until reaching the final element position
		scrollInt = window.setInterval(function() {
			var curY = window.scrollY || window.pageYOffset;
			var step = Math.ceil((elPosition - curY) / 10);			

			if (curY < elPosition) {
				window.scrollTo(0, curY + step);

			} else {
				window.scrollTo(0, elPosition);
				window.clearInterval(scrollInt);
				$(window).off('scroll');
				scrollInt = null;
			}
		}, 16);

		$(window).on('scroll', function() {
			var currentScrollY = window.scrollY || window.pageYOffset;
			if (currentScrollY < lastScrollY) {
				window.clearInterval(scrollInt);
				$(window).off('scroll');
			} 	
			lastScrollY = currentScrollY;		
		});
	}

	init();
}());