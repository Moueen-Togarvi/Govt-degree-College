import { browser } from '$app/environment';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

let pluginsRegistered = false;

export function ensureGsap() {
	if (browser && !pluginsRegistered) {
		gsap.registerPlugin(ScrollTrigger);
		pluginsRegistered = true;
	}

	return gsap;
}

export function prefersReducedMotion() {
	if (!browser) return true;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isStackCandidate(element: HTMLElement, minPanelHeight: number) {
	if (element.dataset.stackSkip === 'true') return false;
	if (element.dataset.stackPanel === 'true') return true;
	if (element.tagName !== 'SECTION') return false;
	return element.offsetHeight >= minPanelHeight;
}

export function setupStickyStack(
	root: HTMLElement,
	{
		topOffset = 108,
		minPanelHeight = 280
	}: {
		topOffset?: number;
		minPanelHeight?: number;
	} = {}
) {
	if (!browser || prefersReducedMotion() || window.innerWidth < 1024) {
		return () => {};
	}

	const gsapInstance = ensureGsap();
	const candidates = Array.from(root.children).filter(
		(child): child is HTMLElement =>
			child instanceof HTMLElement && isStackCandidate(child, minPanelHeight)
	);

	if (candidates.length < 2) {
		return () => {};
	}

	const triggerHandles: Array<{ kill: () => void }> = [];
	const wrappedPanels = candidates.map((panel) => {
		const shell = document.createElement('div');
		shell.className = 'stack-shell';
		panel.before(shell);
		shell.appendChild(panel);
		panel.classList.add('stack-panel');
		panel.style.setProperty('--stack-top', `${topOffset}px`);
		return { panel, shell };
	});

	wrappedPanels.forEach(({ panel, shell }, index) => {
		shell.style.setProperty('--stack-shell-height', index === wrappedPanels.length - 1 ? '115vh' : '140vh');
		panel.style.zIndex = String(wrappedPanels.length - index);
		panel.style.transformOrigin = 'top center';

		if (index > 0) {
			triggerHandles.push(
				ScrollTrigger.create({
					trigger: shell,
					start: 'top bottom-=80',
					end: `top top+=${topOffset + 32}`,
					scrub: true,
					animation: gsapInstance.fromTo(
						panel,
						{ yPercent: 10, scale: 0.985 },
						{ yPercent: 0, scale: 1, ease: 'none' }
					)
				})
			);
		}

		if (index < wrappedPanels.length - 1) {
			triggerHandles.push(
				ScrollTrigger.create({
					trigger: wrappedPanels[index + 1].shell,
					start: 'top bottom-=80',
					end: `top top+=${topOffset + 48}`,
					scrub: true,
					animation: gsapInstance.to(panel, {
						scale: 0.965,
						yPercent: -4,
						ease: 'none'
					})
				})
			);
		}
	});

	ScrollTrigger.refresh();

	return () => {
		triggerHandles.forEach((trigger) => trigger.kill());

		wrappedPanels.forEach(({ panel, shell }) => {
			panel.classList.remove('stack-panel');
			panel.style.removeProperty('--stack-top');
			panel.style.removeProperty('z-index');
			panel.style.removeProperty('transform-origin');
			gsapInstance.set(panel, { clearProps: 'transform' });
			shell.before(panel);
			shell.remove();
		});

		ScrollTrigger.refresh();
	};
}
