<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Route } from '../routes-data.js';
	import { page } from '$app/stores';

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
	</nav>
</div>
