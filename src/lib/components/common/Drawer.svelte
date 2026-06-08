<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let show = false;
	export let className = '';
	export let onClose = () => {};

	let modalElement = null;
	let mounted = false;

	let dragStartY = 0;
	let dragY = 0;
	let isDragging = false;

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && isTopModal()) {
			show = false;
		}
	};

	const isTopModal = () => {
		const modals = document.getElementsByClassName('modal');
		return modals.length && modals[modals.length - 1] === modalElement;
	};

	onMount(() => {
		mounted = true;
	});

	$: if (show && modalElement) {
		document.body.appendChild(modalElement);
		window.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';
	} else if (modalElement) {
		onClose();
		window.removeEventListener('keydown', handleKeyDown);
		if (document.body.contains(modalElement)) {
			document.body.removeChild(modalElement);
			document.body.style.overflow = 'unset';
		}
	}

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeyDown);
		show = false;
		if (modalElement) {
			if (document.body.contains(modalElement)) {
				document.body.removeChild(modalElement);
				document.body.style.overflow = 'unset';
			}
		}
	});

	const handleTouchStart = (e: TouchEvent) => {
		isDragging = true;
		dragStartY = e.touches[0].clientY;
		dragY = 0;
	};

	const handleTouchMove = (e: TouchEvent) => {
		if (!isDragging) return;
		const deltaY = e.touches[0].clientY - dragStartY;
		if (deltaY > 0) {
			dragY = deltaY * 0.5;
		}
	};

	const handleTouchEnd = () => {
		isDragging = false;
		if (dragY > 80) {
			show = false;
		} else {
			dragY = 0;
		}
	};

	const handleMouseDown = (e: MouseEvent) => {
		isDragging = true;
		dragStartY = e.clientY;
		dragY = 0;
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return;
		const deltaY = e.clientY - dragStartY;
		if (deltaY > 0) {
			dragY = deltaY * 0.5;
		}
	};

	const handleMouseUp = () => {
		isDragging = false;
		if (dragY > 80) {
			show = false;
		} else {
			dragY = 0;
		}
	};
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if show}
	<div
		bind:this={modalElement}
		class="modal fixed inset-0 z-50 flex items-end justify-center bg-black/30 dark:bg-black/60 backdrop-blur-sm"
		in:fade={{ duration: 200 }}
		on:mousedown={() => {
			show = false;
		}}
	>
		<div
			class="modal-content bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-t-[1.5rem] shadow-2xl w-full overflow-hidden flex flex-col h-[92dvh] touch-none select-none {className}"
			style="transform: translateY({dragY}px);"
			on:mousedown={(e) => {
				e.stopPropagation();
			}}
			on:touchstart={handleTouchStart}
			on:touchmove={handleTouchMove}
			on:touchend={handleTouchEnd}
		>
			<div
				class="flex justify-center pt-2.5 pb-1 flex-shrink-0 cursor-grab active:cursor-grabbing"
				on:mousedown={handleMouseDown}
			>
				<div class="w-9 h-[5px] rounded-full bg-[#d1d1d6] dark:bg-[#48484a]"></div>
			</div>
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal-content {
		animation: slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards;
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
