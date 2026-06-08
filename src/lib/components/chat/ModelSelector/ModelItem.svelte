<script lang="ts">
        import { getContext } from 'svelte';
        import Check from '$lib/components/icons/Check.svelte';

        const i18n = getContext('i18n');

        export let selectedModelIdx: number = -1;
        export let item: any = {};
        export let index: number = -1;
        export let value: string = '';

        export let onClick: () => void = () => {};
</script>

<button
        role="option"
        aria-selected={value === item.value}
        aria-label={$i18n.t('Select {{modelName}} model', { modelName: item.label })}
        class="relative flex group/item w-full items-start py-2 text-sm cursor-default select-none outline-none rounded-xl text-gray-900 dark:text-white hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
        data-arrow-selected={index === selectedModelIdx}
        data-value={item.value}
        on:click={() => {
                onClick();
        }}
>
        <div class="flex-1 line-clamp-1 font-medium text-left">
                {item.label}
        </div>

        {#if value === item.value}
                <div class="ml-auto shrink-0">
                        <Check className="w-4 h-4" />
                </div>
        {/if}
</button>
