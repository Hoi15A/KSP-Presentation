(function() {
	// DOM ready	

	// Current slide, start at first slide, 0
	var current = 0;
	var previous = current;
	var slides = document.querySelectorAll(".slide");
	var slides_count = slides.length;
	var scroll_time_ms = 1500;

	window.onbeforeunload = function() {
		window.scrollTo(0,0);
	};

	// Handle clicks
	document.getElementById("previous").onclick = scrollPrevious;
	document.getElementById("next").onclick = scrollNext;

	// Handle up down / left right keypresses
	document.onkeydown = function(ev) {
		ev = ev || window.event;
		var key = ev.keyCode;
		previous = current;

		switch(key) {
			// Next slide with bounds check
			case 40:
			case 39:
				scrollNext();
				break;

			// Previous slide
			case 38:
			case 37:
				scrollPrevious();
				break;
		}
	}

	function scrollNext() {
		current = current < slides_count - 1 ? current + 1 : current;
		scroll();
	}

	function scrollPrevious() {
		current = current > 0 ? current - 1 : current;;
		scroll();
	}

	function scroll() {
		// Slide changed
		if(current != previous) {
			// Animate next slide
			slides[current].className = "slide animated zoomIn";
			slides[previous].className = "slide slide_exit animated fadeOut";

			// Scroll to next slide
			$('html, body').animate({
	    		scrollTop: slides[current].offsetTop
	    	}, scroll_time_ms);
		}
	}

}) ();
