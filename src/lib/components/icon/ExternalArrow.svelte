<span aria-hidden="true" class="block size-4 shrink-0 overflow-hidden">
	<span class="external-arrow icon-[material-symbols--arrow-outward] block size-full"></span>
</span>

<style>
	@keyframes wrap-arrow {
		0% {
			transform: translate(0) scale(100%);
		}
		49% {
			transform: translate(100%, -100%) scale(25%);
		}
		50% {
			transform: translate(-100%, 100%) scale(25%);
		}
		100% {
			transform: translate(0) scale(100%);
		}
	}

	:global(a:hover) .external-arrow {
		animation: wrap-arrow 300ms cubic-bezier(0.45, 0, 0.55, 1);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(a:hover) .external-arrow {
			animation: none;
		}
	}
</style>
