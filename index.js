var AnimationFrame = require('animation-frame');
var pym = require('pym.js');

// russell's special sauce
var specialSauce = function(onPymParentResize) {

	'use strict';
	var pymChild = null;

	var init = function() {
		setupPym();
	};

	var setupPym = function() {

		// grab the iframe graphic's container
		var container = document.getElementById('globe-graphic-container');

		// do we have a container?
		if(container) {

			// convenience variable
			var height = {previous: 0, current: 0};
			
			var pollHeight = function() {

				// set current.height to the container's actual height
				height.current = container.offsetHeight;

				// if current.height is different than current.previous,
				if(height.current !== height.previous) {

					// set current.previous to the actual height RIGHT NOW
					height.previous = height.current;

					// and notify pym
					pymChild.sendHeight();
				}

				// loop this forever with rAF
				requestAnimationFrame(pollHeight);
			};

			pymChild = pym.Child({ renderCallback: onPymParentResize });

			// start polling height
			pollHeight();
		}
	};

	// start the whole thing for reals
	init();
};

// start the whole thing
module.exports = specialSauce;