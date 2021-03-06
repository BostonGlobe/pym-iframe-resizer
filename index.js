import pym from 'pym.js'

const rafTimeout = (callback) => setTimeout(callback, 1000 / 60)

// rAF polyfill
const raf = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	rafTimeout

let pymChild = null

export default function setupPym({ id = 'globe-graphic-container', resizeEvent }) {

	// grab the iframe graphic's container
	const container = document.getElementById(id)

	// do we have a container?
	if(container) {

		// convenience variable
		const height = { previous: 0, current: 0 }

		const pollHeight = () => {

			// set current.height to the container's actual height
			height.current = container.offsetHeight

			// if current.height is different than current.previous,
			if(height.current !== height.previous) {

				// set current.previous to the actual height RIGHT NOW
				height.previous = height.current

				// and notify pym
				pymChild.sendHeight()
			}

			// loop this forever with rAF
			raf(pollHeight)
		}

		pymChild = pym.Child({ renderCallback: resizeEvent })

		// start polling height
		pollHeight()
	}

	return pymChild
}
