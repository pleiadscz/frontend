<script lang="ts">
        import { getContext, onMount } from 'svelte';
        import { toast } from 'svelte-sonner';
        import { goto } from '$app/navigation';
        import { config, settings, user } from '$lib/stores';

        import Drawer from '../common/Drawer.svelte';
        import General from './Settings/General.svelte';
        import Interface from './Settings/Interface.svelte';
        import DataControls from './Settings/DataControls.svelte';
        import Account from './Settings/Account.svelte';
        import Personalization from './Settings/Personalization.svelte';
        import Connections from './Settings/Connections.svelte';
        import Integrations from './Settings/Integrations.svelte';

        const i18n = getContext('i18n');

        export let show = false;
        export let getModels: Function;
        export let saveSettings: Function;

        let mobileView: 'main' | 'general' | 'interface' | 'account' | 'data_controls' | 'personalization' | 'connections' | 'tools' = 'main';

        const userInitials = $user?.name ? $user.name.slice(0, 2).toUpperCase()
                : $user?.email ? $user.email.slice(0, 2).toUpperCase() : 'U';

        const userName = $user?.name || $user?.email || '';

        const Chevron = () => `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px] text-[#c7c7cc] dark:text-[#48484a] flex-shrink-0">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
        `;

        const handleClose = () => {
                mobileView = 'main';
                show = false;
        };

        const handleSave = async (updated) => {
                await saveSettings(updated);
                toast.success($i18n.t('Settings saved successfully!'));
        };

        const handleThemeChange = (t: string) => {
                localStorage.setItem('theme', t);
                const html = document.documentElement;
                html.classList.remove('dark', 'light');
                if (t === 'system') {
                        html.classList.add(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                } else {
                        html.classList.add(t);
                }
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
                        {#if mobileView !== 'main'}
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
                                <span class="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-gray-900 dark:text-white pointer-events-none">
                                        {$i18n.t(mobileView === 'general' ? 'General' : mobileView === 'interface' ? 'Interface' : mobileView === 'account' ? 'Account' : mobileView === 'data_controls' ? 'Data Controls' : mobileView === 'personalization' ? 'Personalization' : mobileView === 'connections' ? 'Connections' : mobileView === 'tools' ? 'Integrations' : '')}
                                </span>
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
                                        <!-- General -->
                                        <p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2 mt-1">{$i18n.t('General')}</p>
                                        <div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
                                                <button
                                                        type="button"
                                                        class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
                                                        on:click={() => { mobileView = 'general'; }}
                                                >
                                                        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
                                                                <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                        </svg>
                                                        <span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">{$i18n.t('General Settings')}</span>
                                                        {@html Chevron()}
                                                </button>
                                                <div class="h-px bg-[#e5e5ea] dark:bg-[#3a3a3c] ml-[54px]"></div>
                                                <button
                                                        type="button"
                                                        class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
                                                        on:click={() => { mobileView = 'interface'; }}
                                                >
                                                        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
                                                                <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.388 1.62a3 3 0 00-5.78-1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zM7.462 7.462A4.5 4.5 0 0011.99 4.5a4.5 4.5 0 004.5 4.5 4.5 4.5 0 00-4.5 4.5 4.5 4.5 0 00-4.5-4.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                        </svg>
                                                        <span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">{$i18n.t('Interface')}</span>
                                                        {@html Chevron()}
                                                </button>
                                        </div>

                                        <!-- Account -->
                                        {#if $user}
                                                <p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2">{$i18n.t('Account')}</p>
                                                <div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
                                                        <button
                                                                type="button"
                                                                class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
                                                                on:click={() => { mobileView = 'account'; }}
                                                        >
                                                                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
                                                                        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                                </svg>
                                                                <span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">{$i18n.t('Account Settings')}</span>
                                                                {@html Chevron()}
                                                        </button>
                                                        {#if $user?.email}
                                                                <div class="h-px bg-[#e5e5ea] dark:bg-[#3a3a3c] ml-[54px]"></div>
                                                                <div class="flex items-center gap-3 px-4 py-[13px]">
                                                                        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
                                                                                <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                                        </svg>
                                                                        <span class="flex-1 text-[15px] text-gray-900 dark:text-white">{$i18n.t('Email')}</span>
                                                                        <span class="text-[13px] text-[#8e8e93] dark:text-[#636366] truncate max-w-[160px]">{$user.email}</span>
                                                                </div>
                                                        {/if}
                                                        <div class="h-px bg-[#e5e5ea] dark:bg-[#3a3a3c] ml-[54px]"></div>
                                                        <button
                                                                type="button"
                                                                class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
                                                                on:click={handleLogout}
                                                        >
                                                                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-red-500 flex-shrink-0">
                                                                        <path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                                </svg>
                                                                <span class="flex-1 text-left text-[15px] text-red-500">{$i18n.t('Log Out')}</span>
                                                        </button>
                                                </div>
                                        {/if}

                                        <!-- Data Controls -->
                                        <p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2">{$i18n.t('Data Controls')}</p>
                                        <div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
                                                <button
                                                        type="button"
                                                        class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
                                                        on:click={() => { mobileView = 'data_controls'; }}
                                                >
                                                        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
                                                                <path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                        </svg>
                                                        <span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">{$i18n.t('Data Controls')}</span>
                                                        {@html Chevron()}
                                                </button>
                                        </div>

                                        <!-- Personalization -->
                                        {#if $config?.features?.enable_memories && ($user?.role === 'admin' || ($user?.permissions?.features?.memories ?? true))}
                                                <p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2">{$i18n.t('Personalization')}</p>
                                                <div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
                                                        <button
                                                                type="button"
                                                                class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
                                                                on:click={() => { mobileView = 'personalization'; }}
                                                        >
                                                                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
                                                                        <path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                                        <path d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-1.785-4.17 3.75 3.75 0 003.285 8.09z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                                </svg>
                                                                <span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">{$i18n.t('Personalization')}</span>
                                                                {@html Chevron()}
                                                        </button>
                                                </div>
                                        {/if}

                                        <!-- Connections -->
                                        {#if $config?.features?.enable_direct_connections && ($user?.role === 'admin' || ($user?.role === 'user' && $config?.features?.enable_direct_connections))}
                                                <p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2">{$i18n.t('Connections')}</p>
                                                <div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
                                                        <button
                                                                type="button"
                                                                class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
                                                                on:click={() => { mobileView = 'connections'; }}
                                                        >
                                                                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
                                                                        <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                                </svg>
                                                                <span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">{$i18n.t('Connections')}</span>
                                                                {@html Chevron()}
                                                        </button>
                                                </div>
                                        {/if}

                                        <!-- Integrations -->
                                        {#if $user?.role === 'admin' || ($user?.role === 'user' && $user?.permissions?.features?.direct_tool_servers)}
                                                <p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2">{$i18n.t('Integrations')}</p>
                                                <div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
                                                        <button
                                                                type="button"
                                                                class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
                                                                on:click={() => { mobileView = 'tools'; }}
                                                        >
                                                                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
                                                                        <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M6.343 15.657A2.652 2.652 0 015.25 12a2.652 2.652 0 011.093-3.657l5.877-5.877A2.652 2.652 0 0115.657 1.343 2.652 2.652 0 0117.25 3a2.652 2.652 0 01-1.093 3.657l-5.877 5.877A2.652 2.652 0 019.343 12a2.652 2.652 0 011.093 3.657z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                                </svg>
                                                                <span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">{$i18n.t('Integrations')}</span>
                                                                {@html Chevron()}
                                                        </button>
                                                </div>
                                        {/if}

                                        <!-- Admin Settings -->
                                        {#if $user?.role === 'admin'}
                                                <p class="text-[13px] text-[#6b6b6b] dark:text-[#8e8e93] px-4 mb-2">{$i18n.t('Admin')}</p>
                                                <div class="bg-white dark:bg-[#2c2c2e] rounded-[1.5rem] overflow-hidden mb-5">
                                                        <button
                                                                type="button"
                                                                class="outline-none w-full flex items-center gap-3 px-4 py-[13px] active:bg-gray-50 dark:active:bg-[#3a3a3c] transition-colors"
                                                                on:click={() => { goto('/admin/settings'); show = false; }}
                                                        >
                                                                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500 dark:text-[#8e8e93] flex-shrink-0">
                                                                        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.388 1.62a3 3 0 00-5.78-1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zM7.462 7.462A4.5 4.5 0 0011.99 4.5a4.5 4.5 0 004.5 4.5 4.5 4.5 0 00-4.5 4.5 4.5 4.5 0 00-4.5-4.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                                                </svg>
                                                                <span class="flex-1 text-left text-[15px] text-gray-900 dark:text-white">{$i18n.t('Admin Settings')}</span>
                                                                {@html Chevron()}
                                                        </button>
                                                </div>
                                        {/if}
                                </div>
                        {:else if mobileView === 'general'}
                                <div class="px-4 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto">
                                        <General {getModels} saveSettings={handleSave} />
                                </div>
                        {:else if mobileView === 'interface'}
                                <div class="px-4 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto">
                                        <Interface saveSettings={handleSave} />
                                </div>
                        {:else if mobileView === 'account'}
                                <div class="px-4 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto">
                                        <Account saveSettings={handleSave} saveHandler={() => toast.success($i18n.t('Settings saved successfully!'))} />
                                </div>
                        {:else if mobileView === 'data_controls'}
                                <div class="px-4 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto">
                                        <DataControls saveSettings={handleSave} />
                                </div>
                        {:else if mobileView === 'personalization'}
                                <div class="px-4 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto">
                                        <Personalization saveSettings={handleSave} />
                                </div>
                        {:else if mobileView === 'connections'}
                                <div class="px-4 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto">
                                        <Connections saveSettings={handleSave} />
                                </div>
                        {:else if mobileView === 'tools'}
                                <div class="px-4 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto">
                                        <Integrations saveSettings={handleSave} />
                                </div>
                        {/if}
                </div>
        </div>
</Drawer>
