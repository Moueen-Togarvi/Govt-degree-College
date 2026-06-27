/**
 * Lightweight, dependency-free motion utilities for the admin UI.
 * Produces smooth, Framer-Motion-style entrance animations using the Web
 * Animations API + IntersectionObserver. Respects prefers-reduced-motion.
 */
import { browser } from '$app/environment';

const prefersReduced = () =>
	!browser || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export type RevealOptions = {
	delay?: number;
	y?: number;
	x?: number;
	scale?: number;
	duration?: number;
	once?: boolean;
	threshold?: number;
};

/**
 * Action: fades + slides an element into view when it enters the viewport.
 * Usage: <div use:reveal={{ delay: 120 }}> … </div>
 */
export function reveal(node: HTMLElement, opts: RevealOptions = {}) {
	const {
		delay = 0,
		y = 18,
		x = 0,
		scale = 1,
		duration = 520,
		once = true,
		threshold = 0.08
	} = opts;

	if (prefersReduced()) {
		node.style.opacity = '1';
		return {};
	}

	const hidden = { opacity: 0, transform: `translate(${x}px, ${y}px) scale(${scale})` };
	const visible = { opacity: 1, transform: 'translate(0,0) scale(1)' };

	node.style.opacity = '0';
	node.style.willChange = 'opacity, transform';

	const play = () => {
		const anim = node.animate([hidden, visible], {
			duration,
			delay,
			easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
			fill: 'both'
		});
		anim.onfinish = () => {
			node.style.opacity = '1';
			node.style.transform = 'none';
			node.style.willChange = 'auto';
		};
	};

	if (typeof IntersectionObserver === 'undefined') {
		play();
		return {};
	}

	let played = false;
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && !played) {
					played = true;
					play();
					if (once) io.disconnect();
				} else if (!entry.isIntersecting && !once) {
					played = false;
					node.style.opacity = '0';
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -6% 0px' }
	);
	io.observe(node);

	return {
		destroy() {
			io?.disconnect();
		}
	};
}

/**
 * Action: a soft press/hover micro-interaction for clickable cards.
 */
export function lift(node: HTMLElement) {
	if (prefersReduced()) return {};
	const onEnter = () => {
		node.style.transform = 'translateY(-3px)';
	};
	const onLeave = () => {
		node.style.transform = 'translateY(0)';
	};
	node.style.transition = 'transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease';
	node.addEventListener('mouseenter', onEnter);
	node.addEventListener('mouseleave', onLeave);
	return {
		destroy() {
			node.removeEventListener('mouseenter', onEnter);
			node.removeEventListener('mouseleave', onLeave);
		}
	};
}
