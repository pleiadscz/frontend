<script lang="ts">
	// UserAvatar component: displays user initials on a hardcoded yellow circle SVG background.
	// Does NOT fetch profile image from the server.
	export let name: string = '';
	export let className: string = 'size-7';

	function getInitials(fullName: string): string {
		const sanitized = (fullName ?? '').trim();
		if (!sanitized) return '??';
		const parts = sanitized.split(/\s+/).filter(Boolean);
		let initials: string;
		if (parts.length > 1) {
			initials = parts[0][0] + parts[parts.length - 1][0];
		} else {
			initials = sanitized.slice(0, 2);
		}
		if (initials.length < 2) {
			initials = (initials + sanitized.slice(1, 2) + 'X').slice(0, 2);
		}
		return initials.toUpperCase();
	}

	$: initials = getInitials(name);
</script>

<div class="{className} relative rounded-full overflow-hidden flex items-center justify-center select-none">
	<!-- Hardcoded yellow circle SVG background with scalable initials -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="320"
		height="320"
		viewBox="0 0 320 320"
		class="absolute inset-0 w-full h-full"
		aria-hidden="true"
	>
		<circle cx="160" cy="160" r="148" fill="#f1c40e" />
		<text
			x="160"
			y="160"
			text-anchor="middle"
			dominant-baseline="central"
			fill="#fff"
			font-size="120"
			font-weight="200"
			letter-spacing="2"
		>
			{initials}
		</text>
	</svg>
</div>
