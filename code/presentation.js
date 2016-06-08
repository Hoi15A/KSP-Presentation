(function() {
	// DOM ready

	// Current slide, start at first slide, 0
	var current = 0;
	var previous = current;
	var jeb = document.getElementById("jeb");
	var slides = document.querySelectorAll(".slide");
	var slides_count = slides.length;
	var scroll_time_ms = 2000;
	var sidebar = document.getElementById("sidebar");
	var sidebar_button = document.getElementById("sidebar_button");
	var slide_count = document.getElementsByClassName("slide").length;
	var status_bar = document.getElementById("status");
	var status_slide = document.getElementById("status_slide");

	// Video variable
	var videos = document.getElementsByClassName("vid");


	window.onload = function() {
		var status_height = status_bar.offsetHeight;
		status_slide.textContent = (current + 1) + "/" + slide_count;
		sidebar.style.top = status_height + "px";
		sidebar_button.style.top = status_height + "px";
		sidebar.style.display = "none"; // Sidebar hidden on load
		jeb.style.opacity = 1;
		generateSidebar();
		pauseAllVideos();
	}

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

	sidebar_button.onclick = function() {
		var sb_display = sidebar.style.display;
		sidebar.style.display = sb_display == "none" ? "" : "none";
		sidebar_button.style.right = sidebar.style.display == "none" ? "0" : "1.5vw";
	}

	function generateSidebar() {
		var sidebar_total_height = sidebar.offsetHeight;
		for(var i = 0; i < slide_count; i++) {
			var newDiv = document.createElement("div");
			var heightPercent = 100 / slide_count;
			newDiv.className = "sidebar_element";
			newDiv.style = "height: " + heightPercent + "%";
			newDiv.textContent = i + 1;
			newDiv.onclick = function () {
				var nextUp = parseInt(this.textContent) - 1;
				if(nextUp > current) {
					current = nextUp - 1;
					scrollNext();
				} else if(nextUp < current) {
					current = nextUp + 1;
					scrollPrevious();
				}

			}
			sidebar.appendChild(newDiv);
		}
	}

	function scrollNext() {
		current = current < slides_count - 1 ? current + 1 : current;
		scroll();
	}

	function scrollPrevious() {
		current = current > 0 ? current - 1 : current;
		scroll();
	}

	function instructionsIn() {
		var elems = document.getElementsByClassName("instructions");
		for(var i = 0; i < elems.length; i++) {
			if(i % 2 == 0)
				elems[i].className = "instructions animated bounceInLeft";
			else
				elems[i].className = "instructions animated bounceInRight";
		}
	}

	function instructionsOut() {
		var elems = document.getElementsByClassName("instructions");
		for(var i = 0; i < elems.length; i++) {
			if(i % 2 == 0)
				elems[i].className = "instructions animated bounceOutLeft";
			else
				elems[i].className = "instructions animated bounceOutRight";
		}
	}

	function scroll() {
		if(previous != current) {
			status_slide.textContent = (current + 1) + "/" + slide_count;
			// Special cases
			if(current == 0) {
				// Bring back instructions
				instructionsIn();
			} else {
				// Second slide, instructions not needed now
				instructionsOut();
			}
			// Slide changed
			// Animate next slide
			slides[current].className = "slide animated zoomIn";
			slides[previous].className = "slide slide_exit animated fadeOut";

			// Scroll to next slide
			$('html, body').animate({
    			scrollTop: slides[current].offsetTop
    		}, scroll_time_ms);
			previous = current;
			pauseAllVideos();
			playVideosOnCurrentSlide();
		}
	}

	function playVideosOnCurrentSlide() {
 		var currentVideos = slides[current].getElementsByTagName("video");
		for(var i = 0; i < currentVideos.length; i++) {
			currentVideos[i].play();
		}
	}

	function pauseAllVideos() {
		for(var i = 0; i < videos.length; i++) {
			videos[i].pause();
		}
	}

}) ();
