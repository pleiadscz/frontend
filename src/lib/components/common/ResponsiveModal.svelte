<script lang="ts">
	import { mobile } from '$lib/stores';
	import Modal from './Modal.svelte';
	import Drawer from './Drawer.svelte';

	export let show = false;
	export let size = 'md';
</script>

{#if $mobile}
	<Drawer bind:show>
		<slot />
	</Drawer>
{:else}
	<Modal bind:show {size}>
		<slot />
	</Modal>
{/if}
