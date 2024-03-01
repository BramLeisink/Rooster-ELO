<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import type { Route } from '../routes-data.js';
	import { page } from '$app/stores';

	import { toggleMode } from 'mode-watcher';

	export let isCollapsed: boolean;
	export let routes: Route[];
</script>

<div data-collapsed={isCollapsed} class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
	<nav
		class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
	>
		{#each routes as route}
			{#if isCollapsed}
				<Tooltip.Root openDelay={0}>
					<Tooltip.Trigger asChild let:builder>
						<Button
							href={route.href}
							builders={[builder]}
							variant={route.variant}
							size="icon"
							class={cn('size-9', {
								'bg-accent dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white':
									(route.href === '/' && $page.url.pathname === route.href) ||
									(route.href !== '/' && $page.url.pathname.startsWith(route.href))
							})}
						>
							<svelte:component this={route.icon} class="size-4" aria-hidden="true" />
							<span class="sr-only">{route.title}</span>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content side="right" class="flex items-center gap-4">
						{route.title}
						{#if route.label}
							<span class="ml-auto text-muted-foreground">
								{route.label}
							</span>
						{/if}
					</Tooltip.Content>
				</Tooltip.Root>
			{:else}
				<Button
					href={route.href}
					variant={route.variant}
					size="sm"
					class={cn('justify-start', {
						'bg-accent dark:text-white dark:hover:bg-muted dark:hover:text-white':
							(route.href === '/' && $page.url.pathname === route.href) ||
							(route.href !== '/' && $page.url.pathname.startsWith(route.href))
					})}
				>
					<svelte:component this={route.icon} class="mr-2 size-4" aria-hidden="true" />
					{route.title}
					{#if route.label}
						<span
							class={cn('ml-auto', {
								'text-background dark:text-white':
									(route.href === '/' && $page.url.pathname === route.href) ||
									(route.href !== '/' && $page.url.pathname.startsWith(route.href))
							})}
						>
							{route.label}
						</span>
					{/if}
				</Button>
			{/if}
		{/each}
		{#if isCollapsed}
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger asChild let:builder>
					<Button
						on:click={toggleMode}
						builders={[builder]}
						variant="ghost"
						size="icon"
						class={cn('size-9')}
					>
						<Sun
						class="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true"
						/>
						<Moon
							class="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
						/>
						<span class="sr-only">Wissel thema</span>
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content side="right" class="flex items-center gap-4">Wissel thema</Tooltip.Content>
			</Tooltip.Root>
		{:else}
			<Button on:click={toggleMode} variant="ghost" size="sm" class={cn('justify-start')}>
				<Sun
					class="mr-2 size-4 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					aria-hidden="true"
				/>
				<Moon
					class="absolute mr-2 size-4 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all  dark:rotate-0 dark:scale-100"
					aria-hidden="true"
				/>
				Wissel thema
			</Button>
		{/if}
	</nav>
</div>
