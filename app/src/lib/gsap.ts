import { browser } from '$app/environment';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let pluginsRegistered = false;
let lenisInstance: Lenis | null = null;

export function ensureGsap() {
	if (browser && !pluginsRegistered) {
		gsap.registerPlugin(ScrollTrigger);
		pluginsRegistered = true;
	}

	return gsap;
}

export function initLenis() {
	if (!browser) return null;
	
	if (!lenisInstance) {
		lenisInstance = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
			infinite: false,
		});

		lenisInstance.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenisInstance?.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);
	}

	return lenisInstance;
}

export function prefersReducedMotion() {
	if (!browser) return true;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * A simple SplitText alternative for basic character/word splitting.
 */
export function splitText(element: HTMLElement, type: 'chars' | 'words' = 'chars') {
	if (!element) return [];
	const text = element.innerText;
	element.innerHTML = '';
	
	if (type === 'chars') {
		return text.split('').map(char => {
			const span = document.createElement('span');
			span.style.display = 'inline-block';
			span.innerText = char === ' ' ? '\u00A0' : char;
			element.appendChild(span);
			return span;
		});
	} else {
		return text.split(' ').map(word => {
			const span = document.createElement('span');
			span.style.display = 'inline-block';
			span.innerText = word + '\u00A0';
			element.appendChild(span);
			return span;
		});
	}
}

