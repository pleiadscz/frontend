<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';

	import Drawer from '../common/Drawer.svelte';

	export let show = false;
	export let getModels: Function;
	export let saveSettings: Function;

	let mobileView: 'main' | 'chats' = 'main';
	let showThemeDropdown = false;
	let saveChatHistory = true;
	let showDeleteConfirm = false;
	let theme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'system' : 'system';

	const userInitials = $user?.name
		? $user.name.slice(0, 2).toUpperCase()
		: $user?.email
			? $user.email.slice(0, 2).toUpperCase()
			: 'U';

	const userName = $user?.name || $user?.email || '';

	$: themeLabel = theme === 'light' ? 'Jasny' : theme === 'dark' ? 'Ciemny' : 'Systemowy';

	const Chevron = () => `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px] text-[#c7c7cc] dark:text-[#48484a] flex-shrink-0">
			<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
		</svg>
	`;

	const handleClose = () => {
		mobileView = 'main';
		showThemeDropdown = false;
		show = false;
	};

	const handleThemeChange = (t: string) => {
		theme = t;
		localStorage.setItem('theme', t);
		const html = document.documentElement;
		html.classList.remove('dark', 'light');
		if (t === 'system') {
			html.classList.add(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		} else {
			html.classList.add(t);
		}
		showThemeDropdown = false;
	};

	const handleLogout = async () => {
		localStorage.removeItem('token');
		await goto('/auth');
		show = false;
	};
</script>

<Drawer bind:show onClose={handleClose}>
	<div class="flex flex-col flex-1 overflow-hidden">
		<!-- Mobile Header -->
		<div class="flex items-center justify-between px-4 pt-2 pb-0 relative flex-shrink-0">
			{#if mobileView === 'chats'}
				<button
					type="button"
					aria-label="Back"
					on:click={() => { mobileView = 'main'; }}
					class="outline-none w-[34px] h-[34px] flex items-center justify-center bg-white dark:bg-[#3a3a3c] rounded-full shadow-md flex-shrink-0"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-black dark:text-gray-300">
						<path d="M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z" />
					</svg>
				</button>
				<span class="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-gray-900 dark:text-white pointer-events-none">Czaty</span>
			{:else}
				<div class="w-[34px]"></div>
			{/if}
			<button
				type="button"
				aria-label="Close"
				class="outline-none w-[34px] h-[34px] flex items-center justify-center bg-white dark:bg-[#3a3a3c] rounded-full shadow-md"
				on:click={handleClose}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-black dark:text-gray-400">
					<path d="M6.697 4.575L4.575 6.697 9.88 12l-5.304 5.303 2.122 2.122L12 14.12l5.303 5.304 2.122-2.122L14.12 12l5.304-5.303-2.122-2.122L12 9.88 6.697 4.575z" />
				</svg>
			</button>
		</div>

		<!-- Profile -->
		{#if $user && mobileView === 'main'}
			<div class="flex flex-col items-center pt-3 pb-5 flex-shrink-0">
				<div
					class="w-[76px] h-[76px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
					style="background-color: #f1c40e;"
				>
					<span class="font-light text-[25px] text-white tracking-wide leading-none text-center flex items-center justify-center w-full h-full">
						{userInitials}
					</span>
				</div>
				<span class="mt-2.5 text-[17px] font-semibold text-gray-900 dark:text-white">{userName}</span>
			</div>
		{/if}

		<!-- Main Content -->
		<div class="flex-1 overflow-y-auto touch-auto" style="-webkit-overflow-scrolling: touch;">
			{#if mobileView === 'main'}
				<div class="px-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
					{#if !$user}
						<div class="pt-4"></div>
					{/if}

					<!-- Czaty -->
					<p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2 mt-1">Czaty</p>
					<div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
						<button
							type="button"
							class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
							on:click={() => { mobileView = 'chats'; }}
						>
							<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
								<path d="M12 4.5C7.5271 4.5 4 7.91095 4 12C4 13.6958 4.5996 15.263 5.62036 16.5254C5.80473 16.7534 5.87973 17.0509 5.82551 17.339C5.72928 17.8505 5.60336 18.3503 5.45668 18.8401C6.08722 18.743 6.69878 18.6098 7.2983 18.4395C7.54758 18.3687 7.81461 18.3975 8.04312 18.5197C9.20727 19.1423 10.5566 19.5 12 19.5C16.4729 19.5 20 16.0891 20 12C20 7.91095 16.4729 4.5 12 4.5ZM2 12C2 6.70021 6.53177 2.5 12 2.5C17.4682 2.5 22 6.70021 22 12C22 17.2998 17.4682 21.5 12 21.5C10.3694 21.5 8.82593 21.1286 7.46141 20.4675C6.36717 20.7507 5.2423 20.9253 4.06155 20.9981C3.72191 21.019 3.39493 20.8658 3.19366 20.5915C2.9924 20.3171 2.94448 19.9592 3.06647 19.6415C3.35663 18.8859 3.6004 18.1448 3.77047 17.399C2.65693 15.8695 2 14.0088 2 12Z" />
							</svg>
							<span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">Czaty</span>
							{@html Chevron()}
						</button>
					</div>

					<!-- Konto -->
					{#if $user}
						<p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2">Konto</p>
						<div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
							<div class="flex items-center gap-3 px-4 py-[13px]">
								<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
									<path d="M6.95984 4.00006H17.0402C17.706 4.00005 18.2656 4.00003 18.7234 4.03744C19.2022 4.07656 19.6571 4.1615 20.089 4.38154C20.7475 4.7171 21.283 5.25253 21.6185 5.9111C21.8386 6.34295 21.9235 6.79791 21.9626 7.27664C22 7.7345 22 8.29402 22 8.95988V15.0402C22 15.7061 22 16.2656 21.9626 16.7235C21.9235 17.2022 21.8386 17.6572 21.6185 18.089C21.283 18.7476 20.7475 19.283 20.089 19.6186C19.6571 19.8386 19.2021 19.9236 18.7234 19.9627C18.2656 20.0001 17.706 20.0001 17.0402 20.0001H6.95982C6.29396 20.0001 5.73444 20.0001 5.27657 19.9627C4.79785 19.9236 4.34289 19.8386 3.91103 19.6186C3.25247 19.283 2.71704 18.7476 2.38148 18.089C2.16144 17.6572 2.0765 17.2022 2.03738 16.7235C1.99997 16.2656 1.99999 15.7061 2 15.0402V8.9599C1.99999 8.29403 1.99997 7.73451 2.03738 7.27664C2.0765 6.79791 2.16144 6.34295 2.38148 5.9111C2.71704 5.25253 3.25247 4.7171 3.91103 4.38154C4.34289 4.1615 4.79785 4.07656 5.27657 4.03744C5.73445 4.00003 6.29397 4.00005 6.95984 4.00006ZM5.43944 6.0308C5.0844 6.05981 4.92194 6.11111 4.81902 6.16355C4.53677 6.30736 4.3073 6.53683 4.16349 6.81908C4.12649 6.89169 4.09006 6.99394 4.06163 7.17255C4.06673 7.17601 4.07181 7.17953 4.07686 7.18309L11.4235 12.369C11.7692 12.613 12.2311 12.613 12.5769 12.369L19.9235 7.18309C19.9284 7.1796 19.9334 7.17616 19.9384 7.17277C19.91 6.99402 19.8735 6.89172 19.8365 6.81908C19.6927 6.53683 19.4632 6.30736 19.181 6.16355C19.0781 6.11111 18.9156 6.05981 18.5606 6.0308C18.1939 6.00084 17.7166 6.00006 17 6.00006H7C6.28344 6.00006 5.80615 6.00084 5.43944 6.0308ZM20 9.57717L13.7302 14.0029C12.693 14.735 11.3073 14.735 10.2701 14.0029L4 9.57692V15.0001C4 15.7166 4.00078 16.1939 4.03074 16.5606C4.05975 16.9157 4.11105 17.0781 4.16349 17.181C4.3073 17.4633 4.53677 17.6928 4.81902 17.8366C4.92194 17.889 5.0844 17.9403 5.43944 17.9693C5.80615 17.9993 6.28343 18.0001 7 18.0001H17C17.7166 18.0001 18.1939 17.9993 18.5606 17.9693C18.9156 17.9403 19.0781 17.889 19.181 17.8366C19.4632 17.6928 19.6927 17.4633 19.8365 17.181C19.889 17.0781 19.9403 16.9157 19.9693 16.5606C19.9992 16.1939 20 15.7166 20 15.0001V9.57717Z" />
								</svg>
								<span class="flex-1 text-[15px] text-gray-900 dark:text-white">Adres e-mail</span>
								<span class="text-[13px] text-[#8e8e93] dark:text-[#636366] truncate max-w-[160px]">{$user.email}</span>
							</div>
							<div class="h-px bg-[#e5e5ea] dark:bg-[#3a3a3c] ml-[54px]"></div>
							<button
								type="button"
								class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
								on:click={handleLogout}
							>
								<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-red-500 flex-shrink-0">
									<path d="M8.7587 3L10 3C10.5523 3 11 3.44772 11 4C11 4.55229 10.5523 5 10 5H8.8C7.94342 5 7.36113 5.00078 6.91104 5.03755C6.47262 5.07337 6.24842 5.1383 6.09202 5.21799C5.7157 5.40973 5.40973 5.7157 5.21799 6.09202C5.1383 6.24842 5.07337 6.47262 5.03755 6.91104C5.00078 7.36113 5 7.94342 5 8.8V15.2C5 16.0566 5.00078 16.6389 5.03755 17.089C5.07337 17.5274 5.1383 17.7516 5.21799 17.908C5.40973 18.2843 5.7157 18.5903 6.09202 18.782C6.24842 18.8617 6.47262 18.9266 6.91104 18.9624C7.36113 18.9992 7.94342 19 8.8 19H10C10.5523 19 11 19.4477 11 20C11 20.5523 10.5523 21 10 21H8.75868C7.95372 21 7.28936 21 6.74817 20.9558C6.18608 20.9099 5.66937 20.8113 5.18404 20.564C4.43139 20.1805 3.81947 19.5686 3.43597 18.816C3.18868 18.3306 3.09012 17.8139 3.04419 17.2518C2.99998 16.7106 2.99999 16.0463 3 15.2413V8.7587C2.99999 7.95373 2.99998 7.28937 3.04419 6.74817C3.09012 6.18608 3.18868 5.66937 3.43597 5.18404C3.81947 4.43139 4.43139 3.81947 5.18404 3.43597C5.66937 3.18868 6.18608 3.09012 6.74817 3.04419C7.28937 2.99998 7.95373 2.99999 8.7587 3ZM15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071C14.9024 16.3166 14.9024 15.6834 15.2929 15.2929L17.5858 13H11C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11H17.5858L15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289Z" />
								</svg>
								<span class="flex-1 text-left text-[15px] text-red-500">Wyloguj się</span>
							</button>
						</div>
					{/if}

					<!-- Motyw -->
					<p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2">Motyw</p>
					<div class="relative">
						<div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
							<button
								type="button"
								class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
								on:click={() => { showThemeDropdown = !showThemeDropdown; }}
							>
								<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C12.5523 1 13 1.44772 13 2V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V2C11 1.44772 11.4477 1 12 1ZM4.22183 4.22183C4.61235 3.8313 5.24551 3.8313 5.63604 4.22183L7.05025 5.63604C7.44078 6.02656 7.44078 6.65973 7.05025 7.05025C6.65973 7.44078 6.02656 7.44078 5.63604 7.05025L4.22183 5.63604C3.8313 5.24551 3.8313 4.61235 4.22183 4.22183ZM19.7782 4.22183C20.1687 4.61235 20.1687 5.24551 19.7782 5.63604L18.364 7.05025C17.9734 7.44078 17.3403 7.44078 16.9497 7.05025C16.5592 6.65973 16.5592 6.02656 16.9497 5.63604L18.364 4.22183C18.7545 3.8313 19.3876 3.8313 19.7782 4.22183ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM1 12C1 11.4477 1.44772 11 2 11H4C4.55228 11 5 11.4477 5 12C5 12.5523 4.55228 13 4 13H2C1.44772 13 1 12.5523 1 12ZM19 12C19 11.4477 19.4477 11 20 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H20C19.4477 13 19 12.5523 19 12ZM7.05025 16.9497C7.44078 17.3403 7.44078 17.9734 7.05025 18.364L5.63604 19.7782C5.24551 20.1687 4.61235 20.1687 4.22183 19.7782C3.8313 19.3876 3.8313 18.7545 4.22183 18.364L5.63604 16.9497C6.02656 16.5592 6.65973 16.5592 7.05025 16.9497ZM16.9497 16.9497C17.3403 16.5592 17.9734 16.5592 18.364 16.9497L19.7782 18.364C20.1687 18.7545 20.1687 19.3876 19.7782 19.7782C19.3877 20.1687 18.7545 20.1687 18.364 19.7782L16.9497 18.364C16.5592 17.9734 16.5592 17.3403 16.9497 16.9497ZM12 19C12.5523 19 13 19.4477 13 20V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V20C11 19.4477 11.4477 19 12 19Z" />
								</svg>
								<span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">Wygląd</span>
								<span class="text-[15px] text-[#8e8e93] dark:text-[#636366] mr-1">{themeLabel}</span>
								{@html Chevron()}
							</button>
						</div>
						{#if showThemeDropdown}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div class="fixed inset-0 z-[10]" on:click={() => { showThemeDropdown = false; }}></div>
							<div class="absolute right-0 bottom-full mb-2 z-[20] min-w-[220px] p-1 rounded-2xl bg-white dark:bg-[#141414] shadow-lg border-[1.5px] border-gray-100 dark:border-[#272727]">
								{#each ['light', 'dark', 'system'] as val}
									<button
										type="button"
										class="relative flex items-center w-full px-4 py-2 text-sm cursor-default select-none outline-none rounded-xl hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
										on:click={() => handleThemeChange(val)}
									>
										<span class="flex-1 line-clamp-1 font-normal text-left text-gray-900 dark:text-white">
											{val === 'light' ? 'Jasny' : val === 'dark' ? 'Ciemny' : 'Systemowy'}
										</span>
										{#if theme === val}
											<span class="ml-auto shrink-0">
												<svg class="w-4 h-4 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
													<path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
										{/if}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{:else if mobileView === 'chats'}
				<div class="px-4 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))]">
					<div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
						<div class="flex items-center justify-between gap-3 px-4 py-[13px]">
							<div>
								<span class="text-[15px] text-gray-900 dark:text-white">Historia czatu</span>
								<p class="text-[12px] text-[#8e8e93] mt-0.5">Nie synchronizuje się między urządzeniami.</p>
							</div>
							<button
								type="button"
								class="outline-none flex-shrink-0 text-[13px] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-full px-3.5 py-1.5"
								on:click={() => { saveChatHistory = !saveChatHistory; }}
							>
								{saveChatHistory ? 'Włączony' : 'Wyłączony'}
							</button>
						</div>
						<div class="h-px bg-[#e5e5ea] dark:bg-[#3a3a3c] ml-4"></div>
						<button type="button" class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors">
							<span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">Importuj rozmowy</span>
							{@html Chevron()}
						</button>
						<div class="h-px bg-[#e5e5ea] dark:bg-[#3a3a3c] ml-4"></div>
						<button type="button" class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors">
							<span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">Eksportuj czaty</span>
							{@html Chevron()}
						</button>
						<div class="h-px bg-[#e5e5ea] dark:bg-[#3a3a3c] ml-4"></div>
						{#if showDeleteConfirm}
							<div class="flex items-center gap-3 px-4 py-[13px]">
								<span class="flex-1 text-[15px] text-red-500">Jesteś pewien?</span>
								<button type="button" class="outline-none text-[14px] text-red-500 mr-3" on:click={() => { showDeleteConfirm = false; }}>Potwierdź</button>
								<button type="button" class="outline-none text-[14px] text-gray-500" on:click={() => { showDeleteConfirm = false; }}>Anuluj</button>
							</div>
						{:else}
							<button type="button" class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors" on:click={() => { showDeleteConfirm = true; }}>
								<span class="flex-1 text-left text-[15px] text-red-500">Usuń czaty</span>
							</button>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
</Drawer>
