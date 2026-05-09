<section class="relative overflow-hidden bg-white py-8 lg:py-10">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="relative mx-auto h-16 max-w-6xl overflow-hidden rounded-full">
			<div class="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/18 to-transparent"></div>
			<div class="beam-arc absolute left-0 top-1/2 h-10 w-48 -translate-y-1/2 rounded-full"></div>
		</div>
	</div>
</section>

<style>
	.beam-arc {
		background:
			radial-gradient(circle at center, rgba(247, 148, 29, 0.78) 0%, rgba(247, 148, 29, 0.38) 32%, rgba(247, 148, 29, 0.08) 60%, transparent 72%);
		filter: blur(1px);
		animation: beam-travel 5.8s linear infinite;
	}

	.beam-arc::before {
		content: "";
		position: absolute;
		inset: 50% 8% auto 8%;
		height: 2px;
		transform: translateY(-50%);
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.95), transparent);
		box-shadow: 0 0 18px rgba(247, 148, 29, 0.55);
	}

	@keyframes beam-travel {
		0% {
			transform: translate3d(-12rem, -50%, 0);
			opacity: 0;
		}

		10% {
			opacity: 1;
		}

		90% {
			opacity: 1;
		}

		100% {
			transform: translate3d(calc(100% + 12rem), -50%, 0);
			opacity: 0;
		}
	}
</style>
