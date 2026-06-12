<script lang="ts">
        import { onMount, createEventDispatcher } from 'svelte';
        import { fly } from 'svelte/transition';
        import AddFilesPlaceholder from '../AddFilesPlaceholder.svelte';

        const dispatch = createEventDispatcher();

        export let submitPrompt: Function = () => {};
        export let stopResponse: Function = () => {};
        export let files = [];
        export let fileUploadEnabled = true;
        export let prompt = '';
        export let messages = [];
        export let history = null;
        export let taskIds = null;
        export let generating = false;
        export let placeholder = 'Zapytaj o cokolwiek';

        let drawerOpen = false;
        let dropdownOpen = false;
        let inputShellElement: HTMLDivElement;
        let textareaEl: HTMLTextAreaElement;
        let cameraInputEl: HTMLInputElement;
        let photosInputEl: HTMLInputElement;
        let filesInputEl: HTMLInputElement;
        let dragged = false;
        let isStopping = false;
        let isFocused = false;
        let isMultiline = false;
        let isMobile = false;

        $: lastMessage = history?.currentId ? history?.messages?.[history.currentId] : messages?.at?.(-1);
        $: responsePending =
                generating ||
                (Array.isArray(taskIds) && taskIds.length > 0) ||
                (lastMessage?.role === 'assistant' && lastMessage?.done !== true);

        const uploadFile = (file: File) => {
                files = [...files, { type: 'doc', name: file.name, upload_status: true }];
        };

        const resetHeight = () => {
                if (!textareaEl) return;
                textareaEl.style.height = 'auto';
                isMultiline = false;
        };

        const handleSubmit = () => {
                if (responsePending || isStopping) return;
                if (prompt.trim()) {
                        if (submitPrompt) submitPrompt(prompt, null);
                        dispatch('submit', prompt);
                        prompt = '';
                        resetHeight();
                }
        };

        const handleStopResponse = async () => {
                if (isStopping) return;
                isStopping = true;
                try {
                        await stopResponse();
                } finally {
                        isStopping = false;
                }
        };

        const updateChatInputHeight = () => {
                if (typeof window === 'undefined' || !inputShellElement) return;
                document.documentElement.style.setProperty(
                        '--chat-input-height',
                        `${Math.ceil(inputShellElement.offsetHeight)}px`
                );
        };

        const updateKeyboardInset = () => {
                if (typeof window === 'undefined') return;
                const vv = window.visualViewport;
                const inset = vv ? Math.max(0, window.innerHeight - vv.height - vv.offsetTop) : 0;
                document.documentElement.style.setProperty('--chat-keyboard-inset', `${Math.round(inset)}px`);
                updateChatInputHeight();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Enter' && !e.shiftKey && window.innerWidth >= 768) {
                        e.preventDefault();
                        handleSubmit();
                }
        };

        const adjustHeight = () => {
                if (!textareaEl) return;
                textareaEl.style.height = 'auto';
                const next = Math.min(textareaEl.scrollHeight, 240);
                textareaEl.style.height = `${next}px`;
                isMultiline = textareaEl.scrollHeight > 44 || prompt.includes('\n');
        };

        $: if (prompt !== undefined) {
                adjustHeight();
        }

        const handlePick = (kind: 'camera' | 'photos' | 'files') => {
                drawerOpen = false;
                dropdownOpen = false;
                if (kind === 'camera') { cameraInputEl?.click(); return; }
                if (kind === 'photos') { photosInputEl?.click(); return; }
                filesInputEl?.click();
        };

        const handleFilesChange = (e: Event) => {
                const input = e.currentTarget as HTMLInputElement;
                const fileList = input.files;
                if (fileList && fileList.length > 0) Array.from(fileList).forEach(uploadFile);
                input.value = '';
        };

        const handleClickOutside = (e: MouseEvent) => {
                if (dropdownOpen) dropdownOpen = false;
        };

        onMount(() => {
                const mq = window.matchMedia('(max-width: 767px)');
                isMobile = mq.matches;
                const mqHandler = (ev: MediaQueryListEvent) => { isMobile = ev.matches; };
                mq.addEventListener('change', mqHandler);

                if (window.innerWidth >= 768) {
                        window.setTimeout(() => textareaEl?.focus(), 0);
                }

                let resizeObserver: ResizeObserver | null = null;
                updateKeyboardInset();
                updateChatInputHeight();
                if (inputShellElement && typeof ResizeObserver !== 'undefined') {
                        resizeObserver = new ResizeObserver(updateChatInputHeight);
                        resizeObserver.observe(inputShellElement);
                }
                window.visualViewport?.addEventListener('resize', updateKeyboardInset);
                window.visualViewport?.addEventListener('scroll', updateKeyboardInset);
                window.addEventListener('resize', updateKeyboardInset);

                const onDrop = (e: DragEvent) => {
                        e.preventDefault();
                        if (e.dataTransfer?.files) Array.from(e.dataTransfer.files).forEach(uploadFile);
                        dragged = false;
                };
                window.addEventListener('dragover', (e) => { e.preventDefault(); dragged = true; });
                window.addEventListener('dragleave', () => { dragged = false; });
                window.addEventListener('drop', onDrop);

                return () => {
                        mq.removeEventListener('change', mqHandler);
                        window.visualViewport?.removeEventListener('resize', updateKeyboardInset);
                        window.visualViewport?.removeEventListener('scroll', updateKeyboardInset);
                        window.removeEventListener('resize', updateKeyboardInset);
                        resizeObserver?.disconnect();
                };
        });

        export const setText = (text: string) => { prompt = text; };
</script>

<svelte:window on:click={handleClickOutside} />

{#if dragged}
        <div class="fixed w-full h-full flex z-50 pointer-events-none">
                <div class="absolute w-full h-full backdrop-blur bg-gray-800/40 flex justify-center">
                        <div class="m-auto"><AddFilesPlaceholder /></div>
                </div>
        </div>
{/if}

<div class="mobile-input-spacer" aria-hidden="true"></div>

<div class="chat-input-shell w-full" bind:this={inputShellElement}>
        <div class="bg-white dark:bg-black">
                <div class="max-w-3xl px-2.5 mx-auto">
                        <div class="pb-2">

                                <!-- Hidden file inputs -->
                                <input bind:this={cameraInputEl} type="file" accept="image/*" capture="environment" class="hidden" on:change={handleFilesChange} />
                                <input bind:this={photosInputEl} type="file" accept="image/*" multiple class="hidden" on:change={handleFilesChange} />
                                <input bind:this={filesInputEl} type="file" multiple class="hidden" on:change={handleFilesChange} />

                                <form
                                        class="w-full {isMobile && isFocused ? 'flex flex-row items-end gap-2' : ''}"
                                        on:submit|preventDefault={() => { if (responsePending) handleStopResponse(); else handleSubmit(); }}
                                >
                                        <!-- Mobile + focused: plus button OUTSIDE -->
                                        {#if isMobile && isFocused}
                                                <button
                                                        type="button"
                                                        aria-label="Dodaj"
                                                        on:click|stopPropagation={() => { drawerOpen = true; }}
                                                        class="flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-black dark:text-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                                >
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 3.59998C12.5891 3.59998 13.0666 4.07754 13.0666 4.66664V10.9333H19.3333C19.9224 10.9333 20.4 11.4109 20.4 12C20.4 12.5891 19.9224 13.0666 19.3333 13.0666H13.0666V19.3333C13.0666 19.9224 12.5891 20.4 12 20.4C11.4109 20.4 10.9333 19.9224 10.9333 19.3333V13.0666H4.66664C4.07754 13.0666 3.59998 12.5891 3.59998 12C3.59998 11.4109 4.07754 10.9333 4.66664 10.9333H10.9333V4.66664C10.9333 4.07754 11.4109 3.59998 12 3.59998Z" fill="currentColor"/>
                                                        </svg>
                                                </button>
                                        {/if}

                                        <!-- Main input shell -->
                                        <div class="flex flex-row gap-2 bg-white dark:bg-neutral-900 px-2 md:px-3 py-1.5 md:py-2 border-[0.5px] border-neutral-200 dark:border-neutral-800 shadow-[0_4px_24px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] {isMultiline ? 'rounded-3xl items-end' : 'rounded-full items-center'} {isMobile && isFocused ? 'flex-1' : 'w-full'}">

                                                <!-- Desktop: plus button with dropdown INSIDE -->
                                                {#if !isMobile}
                                                        <div class="relative shrink-0">
                                                                <button
                                                                        type="button"
                                                                        aria-label="Dodaj"
                                                                        on:click|stopPropagation={() => { dropdownOpen = !dropdownOpen; }}
                                                                        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                                                >
                                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M12 3.59998C12.5891 3.59998 13.0666 4.07754 13.0666 4.66664V10.9333H19.3333C19.9224 10.9333 20.4 11.4109 20.4 12C20.4 12.5891 19.9224 13.0666 19.3333 13.0666H13.0666V19.3333C13.0666 19.9224 12.5891 20.4 12 20.4C11.4109 20.4 10.9333 19.9224 10.9333 19.3333V13.0666H4.66664C4.07754 13.0666 3.59998 12.5891 3.59998 12C3.59998 11.4109 4.07754 10.9333 4.66664 10.9333H10.9333V4.66664C10.9333 4.07754 11.4109 3.59998 12 3.59998Z" fill="currentColor"/>
                                                                        </svg>
                                                                </button>

                                                                {#if dropdownOpen}
                                                                        <div
                                                                                class="absolute bottom-full left-0 mb-2 z-50 min-w-[180px] rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-1.5 shadow-xl"
                                                                                on:click|stopPropagation
                                                                        >
                                                                                <!-- Camera -->
                                                                                <button
                                                                                        type="button"
                                                                                        on:click={() => handlePick('camera')}
                                                                                        class="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors outline-none"
                                                                                >
                                                                                        <span class="inline-flex h-5 w-5 items-center justify-center text-neutral-500 dark:text-neutral-400">
                                                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                                                        <path d="M12 4C10.8908 4 9.92091 4.60141 9.40069 5.50073C9.22194 5.80972 8.89205 6 8.53508 6H7.8C6.94342 6 6.36113 6.00078 5.91104 6.03755C5.47262 6.07337 5.24842 6.1383 5.09202 6.21799C4.7157 6.40973 4.40973 6.71569 4.21799 7.09202C4.1383 7.24842 4.07337 7.47262 4.03755 7.91104C4.00078 8.36113 4 8.94342 4 9.8V15.2C4 16.0566 4.00078 16.6389 4.03755 17.089C4.07337 17.5274 4.1383 17.7516 4.21799 17.908C4.40973 18.2843 4.7157 18.5903 5.09202 18.782C5.24842 18.8617 5.47262 18.9266 5.91104 18.9624C6.36113 18.9992 6.94342 19 7.8 19H16.2C17.0566 19 17.6389 18.9992 18.089 18.9624C18.5274 18.9266 18.7516 18.8617 18.908 18.782C19.2843 18.5903 19.5903 18.2843 19.782 17.908C19.8617 17.7516 19.9266 17.5274 19.9624 17.089C19.9992 16.6389 20 16.0566 20 15.2V9.8C20 8.94342 19.9992 8.36113 19.9624 7.91104C19.9266 7.47262 19.8617 7.24842 19.782 7.09202C19.5903 6.71569 19.2843 6.40973 18.908 6.21799C18.7516 6.1383 18.5274 6.07337 18.089 6.03755C17.6389 6.00078 17.0566 6 16.2 6H15.4649C15.108 6 14.7781 5.80972 14.5993 5.50073C14.0791 4.60141 13.1092 4 12 4ZM12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5Z"/>
                                                                                                </svg>
                                                                                        </span>
                                                                                        Aparat
                                                                                </button>
                                                                                <!-- Photos -->
                                                                                <button
                                                                                        type="button"
                                                                                        on:click={() => handlePick('photos')}
                                                                                        class="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors outline-none"
                                                                                >
                                                                                        <span class="inline-flex h-5 w-5 items-center justify-center text-neutral-500 dark:text-neutral-400">
                                                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                                                        <path d="M8.7587 3H15.2413C16.0463 2.99999 16.7106 2.99998 17.2518 3.04419C17.8139 3.09012 18.3306 3.18868 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C20.8113 5.66937 20.9099 6.18608 20.9558 6.74817C21 7.28936 21 7.95372 21 8.75868V15.2413C21 16.0463 21 16.7106 20.9558 17.2518C20.9099 17.8139 20.8113 18.3306 20.564 18.816C20.1805 19.5686 19.5686 20.1805 18.816 20.564C18.3306 20.8113 17.8139 20.9099 17.2518 20.9558C16.7106 21 16.0463 21 15.2413 21H8.75868C7.95372 21 7.28936 21 6.74817 20.9558C6.18608 20.9099 5.66937 20.8113 5.18404 20.564C4.43139 20.1805 3.81947 19.5686 3.43597 18.816C3.18868 18.3306 3.09012 17.8139 3.04419 17.2518C2.99998 16.7106 2.99999 16.0463 3 15.2413V8.7587C2.99999 7.95373 2.99998 7.28937 3.04419 6.74818C3.09012 6.18608 3.18868 5.66937 3.43597 5.18404C3.81947 4.43139 4.43139 3.81947 5.18404 3.43597C5.66937 3.18868 6.18608 3.09012 6.74818 3.04419C7.28937 2.99998 7.95374 2.99999 8.7587 3ZM6.90798 5.03141C6.50611 5.06454 6.33724 5.12515 6.22792 5.18099C5.94729 5.32682 5.71569 5.55842 5.56986 5.83905C5.51402 5.94837 5.45341 6.11724 5.42028 6.51911C5.38627 6.93167 5.38502 7.47209 5.38502 8.33333V14.8267L7.60303 12.6088C7.81449 12.3973 8.10012 12.2783 8.39827 12.2783C8.69641 12.2783 8.98204 12.3973 9.1935 12.6088L10.9517 14.367L14.3558 9.97222C14.5612 9.71027 14.872 9.55556 15.2021 9.55556C15.5322 9.55556 15.843 9.71027 16.0484 9.97222L18.615 13.2206V8.33333C18.615 7.47209 18.6137 6.93167 18.5797 6.51911C18.5466 6.11724 18.486 5.94837 18.4301 5.83905C18.2843 5.55842 18.0527 5.32682 17.7721 5.18099C17.6628 5.12515 17.4939 5.06454 17.092 5.03141C16.6795 4.9974 16.1391 4.99615 15.2778 4.99615H8.72222C7.86098 4.99615 7.32056 4.9974 6.90798 5.03141ZM5.38502 16.7985V15.6667C5.38502 15.9449 5.38535 16.1987 5.38644 16.4317L7.60303 14.2152L8.57063 15.1828L5.4116 18.3419C5.39385 18.1518 5.38502 17.9256 5.38502 17.6667V16.7985ZM6.90798 18.9686C6.52619 18.9371 6.35947 18.8793 6.24855 18.8243L8.57063 16.5022L9.43044 17.362C9.62955 17.5611 9.89477 17.6726 10.1716 17.6726C10.4484 17.6726 10.7136 17.5611 10.9127 17.362L14.5978 13.6768L18.2338 18.1972C18.0938 18.4384 17.8997 18.6325 17.6607 18.7721C17.7721 18.8301 17.6032 18.8907 17.2013 18.9238C16.7887 18.9578 16.2483 18.959 15.387 18.959H8.61295C7.75171 18.959 7.21131 18.9578 6.79874 18.9238L6.90798 18.9686Z"/>
                                                                                                </svg>
                                                                                        </span>
                                                                                        Zdjęcia
                                                                                </button>
                                                                                <!-- Files -->
                                                                                <button
                                                                                        type="button"
                                                                                        on:click={() => handlePick('files')}
                                                                                        class="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors outline-none"
                                                                                >
                                                                                        <span class="inline-flex h-5 w-5 items-center justify-center text-neutral-500 dark:text-neutral-400">
                                                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                                                                        <path fill-rule="evenodd" d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0V7Z" clip-rule="evenodd" />
                                                                                                </svg>
                                                                                        </span>
                                                                                        Pliki
                                                                                </button>
                                                                                <!-- Web search -->
                                                                                <button
                                                                                        type="button"
                                                                                        class="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors outline-none"
                                                                                >
                                                                                        <span class="inline-flex h-5 w-5 items-center justify-center text-neutral-500 dark:text-neutral-400">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                                                                                                        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                                                                                                </svg>
                                                                                        </span>
                                                                                        Web search
                                                                                </button>
                                                                        </div>
                                                                {/if}
                                                        </div>
                                                {/if}

                                                <!-- Mobile + NOT focused: plus button INSIDE -->
                                                {#if isMobile && !isFocused}
                                                        <button
                                                                type="button"
                                                                aria-label="Dodaj"
                                                                on:click|stopPropagation={() => { drawerOpen = true; }}
                                                                class="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-black dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                                        >
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 3.59998C12.5891 3.59998 13.0666 4.07754 13.0666 4.66664V10.9333H19.3333C19.9224 10.9333 20.4 11.4109 20.4 12C20.4 12.5891 19.9224 13.0666 19.3333 13.0666H13.0666V19.3333C13.0666 19.9224 12.5891 20.4 12 20.4C11.4109 20.4 10.9333 19.9224 10.9333 19.3333V13.0666H4.66664C4.07754 13.0666 3.59998 12.5891 3.59998 12C3.59998 11.4109 4.07754 10.9333 4.66664 10.9333H10.9333V4.66664C10.9333 4.07754 11.4109 3.59998 12 3.59998Z" fill="currentColor"/>
                                                        </svg>
                                                        </button>
                                                {/if}

                                                <!-- Textarea -->
                                                <textarea
                                                        bind:this={textareaEl}
                                                        id="chat-textarea"
                                                        bind:value={prompt}
                                                        on:keydown={handleKeyDown}
                                                        on:input={adjustHeight}
                                                        on:focus={() => { isFocused = true; }}
                                                        on:blur={() => { isFocused = false; }}
                                                        {placeholder}
                                                        disabled={responsePending && isStopping}
                                                        rows={1}
                                                        class="flex-1 bg-transparent pl-2 pr-1 md:px-1 py-1.5 md:py-2 text-[16px] font-medium text-black dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none disabled:opacity-60 resize-none leading-normal overflow-y-auto max-h-[240px] scrollbar-none"
                                                />

                                                <!-- Submit / Stop button -->
                                                <button
                                                        type="submit"
                                                        aria-label={responsePending ? 'Zatrzymaj' : 'Wyślij'}
                                                        class="flex h-[36px] w-[36px] md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                                                >
                                                        {#if responsePending}
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
                                                                        <rect x="6" y="6" width="12" height="12" rx="2"/>
                                                                </svg>
                                                        {:else}
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="h-[26px] w-[26px] md:h-7 md:w-7">
                                                                        <path d="M11.293 5.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414L13 8.414V18a1 1 0 1 1-2 0V8.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l5-5Z" fill="currentColor"/>
                                                                </svg>
                                                        {/if}
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
        </div>
</div>

<!-- Mobile bottom sheet -->
{#if isMobile && drawerOpen}
        <div class="fixed inset-0 z-40 bg-black/30" on:click={() => { drawerOpen = false; }} role="button" aria-label="Zamknij" tabindex="0" on:keydown={(e) => { if (e.key === 'Escape') drawerOpen = false; }} />
        <div
                class="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white dark:bg-neutral-900 px-4 pb-10 pt-4 shadow-2xl"
                transition:fly={{ y: 300, duration: 300 }}
        >
                <div class="mx-auto mb-5 h-1 w-10 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                <div class="grid grid-cols-3 gap-3">
                        <!-- Camera -->
                        <button
                                type="button"
                                on:click={() => handlePick('camera')}
                                class="flex flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 py-5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        >
                                <span class="inline-flex h-6 w-6 items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 4C10.8908 4 9.92091 4.60141 9.40069 5.50073C9.22194 5.80972 8.89205 6 8.53508 6H7.8C6.94342 6 6.36113 6.00078 5.91104 6.03755C5.47262 6.07337 5.24842 6.1383 5.09202 6.21799C4.7157 6.40973 4.40973 6.71569 4.21799 7.09202C4.1383 7.24842 4.07337 7.47262 4.03755 7.91104C4.00078 8.36113 4 8.94342 4 9.8V15.2C4 16.0566 4.00078 16.6389 4.03755 17.089C4.07337 17.5274 4.1383 17.7516 4.21799 17.908C4.40973 18.2843 4.7157 18.5903 5.09202 18.782C5.24842 18.8617 5.47262 18.9266 5.91104 18.9624C6.36113 18.9992 6.94342 19 7.8 19H16.2C17.0566 19 17.6389 18.9992 18.089 18.9624C18.5274 18.9266 18.7516 18.8617 18.908 18.782C19.2843 18.5903 19.5903 18.2843 19.782 17.908C19.8617 17.7516 19.9266 17.5274 19.9624 17.089C19.9992 16.6389 20 16.0566 20 15.2V9.8C20 8.94342 19.9992 8.36113 19.9624 7.91104C19.9266 7.47262 19.8617 7.24842 19.782 7.09202C19.5903 6.71569 19.2843 6.40973 18.908 6.21799C18.7516 6.1383 18.5274 6.07337 18.089 6.03755C17.6389 6.00078 17.0566 6 16.2 6H15.4649C15.108 6 14.7781 5.80972 14.5993 5.50073C14.0791 4.60141 13.1092 4 12 4ZM12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5Z"/>
                                        </svg>
                                </span>
                                <span class="text-xs font-medium">Aparat</span>
                        </button>
                        <!-- Photos -->
                        <button
                                type="button"
                                on:click={() => handlePick('photos')}
                                class="flex flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 py-5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        >
                                <span class="inline-flex h-6 w-6 items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8.7587 3H15.2413C16.0463 2.99999 16.7106 2.99998 17.2518 3.04419C17.8139 3.09012 18.3306 3.18868 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C20.8113 5.66937 20.9099 6.18608 20.9558 6.74817C21 7.28936 21 7.95372 21 8.75868V15.2413C21 16.0463 21 16.7106 20.9558 17.2518C20.9099 17.8139 20.8113 18.3306 20.564 18.816C20.1805 19.5686 19.5686 20.1805 18.816 20.564C18.3306 20.8113 17.8139 20.9099 17.2518 20.9558C16.7106 21 16.0463 21 15.2413 21H8.75868C7.95372 21 7.28936 21 6.74817 20.9558C6.18608 20.9099 5.66937 20.8113 5.18404 20.564C4.43139 20.1805 3.81947 19.5686 3.43597 18.816C3.18868 18.3306 3.09012 17.8139 3.04419 17.2518C2.99998 16.7106 2.99999 16.0463 3 15.2413V8.7587C2.99999 7.95373 2.99998 7.28937 3.04419 6.74818C3.09012 6.18608 3.18868 5.66937 3.43597 5.18404C3.81947 4.43139 4.43139 3.81947 5.18404 3.43597C5.66937 3.18868 6.18608 3.09012 6.74818 3.04419C7.28937 2.99998 7.95374 2.99999 8.7587 3ZM6.90798 5.03141C6.50611 5.06454 6.33724 5.12515 6.22792 5.18099C5.94729 5.32682 5.71569 5.55842 5.56986 5.83905C5.51402 5.94837 5.45341 6.11724 5.42028 6.51911C5.38627 6.93167 5.38502 7.47209 5.38502 8.33333V14.8267L7.60303 12.6088C7.81449 12.3973 8.10012 12.2783 8.39827 12.2783C8.69641 12.2783 8.98204 12.3973 9.1935 12.6088L10.9517 14.367L14.3558 9.97222C14.5612 9.71027 14.872 9.55556 15.2021 9.55556C15.5322 9.55556 15.843 9.71027 16.0484 9.97222L18.615 13.2206V8.33333C18.615 7.47209 18.6137 6.93167 18.5797 6.51911C18.5466 6.11724 18.486 5.94837 18.4301 5.83905C18.2843 5.55842 18.0527 5.32682 17.7721 5.18099C17.6628 5.12515 17.4939 5.06454 17.092 5.03141C16.6795 4.9974 16.1391 4.99615 15.2778 4.99615H8.72222C7.86098 4.99615 7.32056 4.9974 6.90798 5.03141ZM5.38502 16.7985V15.6667C5.38502 15.9449 5.38535 16.1987 5.38644 16.4317L7.60303 14.2152L8.57063 15.1828L5.4116 18.3419C5.39385 18.1518 5.38502 17.9256 5.38502 17.6667V16.7985ZM6.90798 18.9686C6.52619 18.9371 6.35947 18.8793 6.24855 18.8243L8.57063 16.5022L9.43044 17.362C9.62955 17.5611 9.89477 17.6726 10.1716 17.6726C10.4484 17.6726 10.7136 17.5611 10.9127 17.362L14.5978 13.6768L18.2338 18.1972C18.0938 18.4384 17.8997 18.6325 17.6607 18.7721C17.7721 18.8301 17.6032 18.8907 17.2013 18.9238C16.7887 18.9578 16.2483 18.959 15.387 18.959H8.61295C7.75171 18.959 7.21131 18.9578 6.79874 18.9238L6.90798 18.9686Z"/>
                                        </svg>
                                </span>
                                <span class="text-xs font-medium">Zdjęcia</span>
                        </button>
                        <!-- Files -->
                        <button
                                type="button"
                                on:click={() => handlePick('files')}
                                class="flex flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 py-5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        >
                                <span class="inline-flex h-6 w-6 items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                <path fill-rule="evenodd" d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0V7Z" clip-rule="evenodd" />
                                        </svg>
                                </span>
                                <span class="text-xs font-medium">Pliki</span>
                        </button>
                </div>
        </div>
{/if}

<style>
        .mobile-input-spacer {
                display: none;
        }

        @media (max-width: 767px) {
                .mobile-input-spacer {
                        display: block;
                        height: calc(var(--chat-input-height, 88px) + env(safe-area-inset-bottom) + 12px);
                        flex-shrink: 0;
                }

                .chat-input-shell {
                        position: fixed;
                        left: 0;
                        right: 0;
                        bottom: calc(var(--chat-keyboard-inset, 0px) + 2px);
                        z-index: 60;
                        transition: bottom 120ms ease-out;
                        padding-bottom: env(safe-area-inset-bottom);
                }
        }

        #chat-textarea {
                line-height: 1.5;
                overflow-y: auto;
        }

        #chat-textarea::-webkit-scrollbar {
                display: none;
        }

        #chat-textarea {
                -ms-overflow-style: none;
                scrollbar-width: none;
        }
</style>
