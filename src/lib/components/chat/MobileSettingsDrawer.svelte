<script lang="ts">
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { config, user } from '$lib/stores';

	import Drawer from '../common/Drawer.svelte';

	import Account from './Settings/Account.svelte';
	import General from './Settings/General.svelte';
	import Interface from './Settings/Interface.svelte';
	import DataControls from './Settings/DataControls.svelte';
	import Personalization from './Settings/Personalization.svelte';
	import Connections from './Settings/Connections.svelte';
	import Integrations from './Settings/Integrations.svelte';

	import SettingsAlt from '../icons/SettingsAlt.svelte';
	import AppNotification from '../icons/AppNotification.svelte';
	import Link from '../icons/Link.svelte';
	import WrenchAlt from '../icons/WrenchAlt.svelte';
	import Face from '../icons/Face.svelte';
	import DatabaseSettings from '../icons/DatabaseSettings.svelte';
	import UserCircle from '../icons/UserCircle.svelte';
	import UserBadgeCheck from '../icons/UserBadgeCheck.svelte';

	const i18n = getContext('i18n');

	export let show = false;
	export let getModels: Function;
	export let saveSettings: Function;

	let selectedTab: string | null = null;

	const userInitials = $user?.name
		? $user.name.slice(0, 2).toUpperCase()
		: $user?.email
			? $user.email.slice(0, 2).toUpperCase()
			: 'U';

	const userName = $user?.name || $user?.email || '';

	type Section = {
		id: string;
		title: string;
		icon: any;
		visible: boolean;
	};

	$: sections = [
		{ id: 'general', title: $i18n.t('General'), icon: SettingsAlt, visible: true },
		{ id: 'interface', title: $i18n.t('Interface'), icon: AppNotification, visible: true },
		{
			id: 'connections',
			title: $i18n.t('Connections'),
			icon: Link,
			visible:
				$user?.role === 'admin' ||
				($user?.role === 'user' && $config?.features?.enable_direct_connections)
		},
		{
			id: 'tools',
			title: $i18n.t('Integrations'),
			icon: WrenchAlt,
			visible:
				$user?.role === 'admin' ||
				($user?.role === 'user' && $user?.permissions?.features?.direct_tool_servers)
		},
		{ id: 'personalization', title: $i18n.t('Personalization'), icon: Face, visible: true },
		{ id: 'data_controls', title: $i18n.t('Data Controls'), icon: DatabaseSettings, visible: true },
		{ id: 'account', title: $i18n.t('Account'), icon: UserCircle, visible: true }
	].filter((s) => s.visible) as Section[];

	$: activeTitle = sections.find((s) => s.id === selectedTab)?.title ?? $i18n.t('Settings');

	const Chevron = () => `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px] text-[#c7c7cc] dark:text-[#48484a] flex-shrink-0">
			<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
		</svg>
	`;

	const handleClose = () => {
		selectedTab = null;
		show = false;
	};

	const onSaved = () => {
		toast.success($i18n.t('Settings saved successfully!'));
	};
</script>

<Drawer bind:show onClose={handleClose}>
	<div class="flex flex-col flex-1 overflow-hidden">
		<!-- Mobile Header -->
		<div class="flex items-center justify-between px-4 pt-2 pb-0 relative flex-shrink-0">
			{#if selectedTab}
				<button
					type="button"
					aria-label="Back"
					on:click={() => {
						selectedTab = null;
					}}
					class="outline-none w-[34px] h-[34px] flex items-center justify-center bg-white dark:bg-[#3a3a3c] rounded-full shadow-md flex-shrink-0"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-4 h-4 text-black dark:text-gray-300"
					>
						<path
							d="M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"
						/>
					</svg>
				</button>
				<span
					class="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-gray-900 dark:text-white pointer-events-none"
					>{activeTitle}</span
				>
			{:else}
				<div class="w-[34px]"></div>
			{/if}
			<button
				type="button"
				aria-label="Close"
				class="outline-none w-[34px] h-[34px] flex items-center justify-center bg-white dark:bg-[#3a3a3c] rounded-full shadow-md"
				on:click={handleClose}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-4 h-4 text-black dark:text-gray-400"
				>
					<path
						d="M6.697 4.575L4.575 6.697 9.88 12l-5.304 5.303 2.122 2.122L12 14.12l5.303 5.304 2.122-2.122L14.12 12l5.304-5.303-2.122-2.122L12 9.88 6.697 4.575z"
					/>
				</svg>
			</button>
		</div>

		<!-- Profile -->
		{#if $user && !selectedTab}
			<div class="flex flex-col items-center pt-3 pb-5 flex-shrink-0">
				<div
					class="w-[76px] h-[76px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
					style="background-color: #f1c40e;"
				>
					<span
						class="font-light text-[25px] text-white tracking-wide leading-none text-center flex items-center justify-center w-full h-full"
					>
						{userInitials}
					</span>
				</div>
				<span class="mt-2.5 text-[17px] font-semibold text-gray-900 dark:text-white">{userName}</span>
			</div>
		{/if}

		<!-- Main Content -->
		<div class="flex-1 overflow-y-auto touch-auto" style="-webkit-overflow-scrolling: touch;">
			{#if !selectedTab}
				<div class="px-4 pt-1 pb-[calc(2rem+env(safe-area-inset-bottom))]">
					<p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2 mt-1">
						{$i18n.t('Settings')}
					</p>
					<div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
						{#each sections as section, i (section.id)}
							{#if i > 0}
								<div class="h-px bg-[#e5e5ea] dark:bg-[#3a3a3c] ml-[54px]"></div>
							{/if}
							<button
								type="button"
								class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
								on:click={() => {
									selectedTab = section.id;
								}}
							>
								<span class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
									<svelte:component this={section.icon} className="size-[19px]" strokeWidth="2" />
								</span>
								<span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white"
									>{section.title}</span
								>
								{@html Chevron()}
							</button>
						{/each}
					</div>

					{#if $user?.role === 'admin'}
						<div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
							<button
								type="button"
								class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
								on:click={async () => {
									await goto('/admin/settings');
									handleClose();
								}}
							>
								<span class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
									<UserBadgeCheck className="size-[19px]" strokeWidth="2" />
								</span>
								<span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white"
									>{$i18n.t('Admin Settings')}</span
								>
								{@html Chevron()}
							</button>
						</div>
					{/if}
				</div>
			{:else}
				<div class="px-4 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))] text-gray-700 dark:text-gray-100">
					{#if selectedTab === 'general'}
						<General {getModels} {saveSettings} on:save={onSaved} />
					{:else if selectedTab === 'interface'}
						<Interface {saveSettings} on:save={onSaved} />
					{:else if selectedTab === 'connections'}
						<Connections
							saveSettings={async (updated) => {
								await saveSettings(updated);
								onSaved();
							}}
						/>
					{:else if selectedTab === 'tools'}
						<Integrations
							saveSettings={async (updated) => {
								await saveSettings(updated);
								onSaved();
							}}
						/>
					{:else if selectedTab === 'personalization'}
						<Personalization {saveSettings} on:save={onSaved} />
					{:else if selectedTab === 'data_controls'}
						<DataControls {saveSettings} />
					{:else if selectedTab === 'account'}
						<Account {saveSettings} saveHandler={onSaved} />
					{/if}
				</div>
			{/if}
		</div>
	</div>
</Drawer>
