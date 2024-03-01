<script lang="ts">
	import CookieSettings from '$lib/components/dashboard/dashboard_items/cookie_settings.svelte';
	import Leaderboard from '$lib/components/dashboard/dashboard_items/leaderboard.svelte';
	import RecentMarks from '$lib/components/dashboard/dashboard_items/recent_marks.svelte';
	import { fade } from 'svelte/transition';
	import Grid, { GridItem, type GridController } from 'svelte-grid-extended';
	import { Button } from '$lib/components/ui/button';

	let items = [
		{ id: crypto.randomUUID(), x: 5, y: 0, w: 3, h: 6, component: 'RecentMarks' },
		{ id: crypto.randomUUID(), x: 3, y: 0, w: 2, h: 6, component: 'Leaderboard' },
		{ id: crypto.randomUUID(), x: 3, y: 6, w: 5, h: 4, component: 'CookieSettings' },
		{ id: crypto.randomUUID(), x: 0, y: 0, w: 3, h: 10, component: 'CookieSettings' }
	];

	function getComponent(item: any) {
		switch (item.component) {
			case 'CookieSettings':
				return CookieSettings;
			case 'RecentMarks':
				return RecentMarks;
			case 'Leaderboard':
				return Leaderboard;
			default:
				return null; // Return null if no component found
		}
	}

	export let data;

	if (data && data.layout && data.layout.length > 0) {
		items = data.layout;
	}

	let layoutLocked = true;

	let gridController: GridController;

	const itemsBackup = structuredClone(items);

	const itemSize = { height: 76 };

	function resetGrid() {
		items = structuredClone(itemsBackup);
	}

	function remove(id: string) {
		if (!layoutLocked) {
			items = items.filter((i) => i.id !== id);
			updateLayoutCookie();
		}
	}

	function addNewItem() {
		if (!layoutLocked) {
			const w = Math.floor(Math.random() * 2) + 1;
			const h = Math.floor(Math.random() * 5) + 1;
			const newPosition = gridController.getFirstAvailablePosition(w, h);
			const component = 'CookieSettings';
			items = newPosition
				? [
						...items,
						{
							id: crypto.randomUUID(),
							x: newPosition.x,
							y: newPosition.y,
							w,
							h,
							component: component
						}
					]
				: items;
			updateLayoutCookie();
		}
	}

	function updateLayoutCookie() {
		document.cookie = `Dashboard:layout=${JSON.stringify(items)}`;
	}

	import Lock from 'lucide-svelte/icons/lock';
	import { Toggle } from '$lib/components/ui/toggle';
	import { Cookie } from 'lucide-svelte';
</script>

<div class="flex h-screen flex-col">
	<div class="m-2 flex justify-end gap-4">
		<Button disabled={layoutLocked} variant="outline" on:click={addNewItem}>Add New Item</Button>
		<Button disabled={layoutLocked} variant="outline" on:click={resetGrid}>Reset Grid</Button>
		<Toggle aria-label="toggle bold" variant="outline" bind:pressed={layoutLocked}>
			<Lock class="h-4 w-4" />
		</Toggle>
	</div>
	<div class="h-full w-full overflow-auto border {layoutLocked ? 'normal-grid' : 'downsized-grid'}">
		<Grid
			{itemSize}
			cols={8}
			rows={8}
			collision="push"
			bind:controller={gridController}
			on:change={updateLayoutCookie}
			readOnly={layoutLocked}
		>
			{#each items as item (item.id)}
				<div transition:fade={{ duration: 300 }}>
					<GridItem
						id={item.id}
						bind:x={item.x}
						bind:y={item.y}
						bind:w={item.w}
						bind:h={item.h}
						previewClass="bg-accent rounded-lg"
					>
						<svelte:component this={getComponent(item)} {item} removeItem={remove} {layoutLocked}
						></svelte:component>
					</GridItem>
				</div>
			{/each}
		</Grid>
	</div>
</div>

<style>
	.downsized-grid {
		transform: scale(0.8); /* Adjust the scale factor as needed */
		transition: transform 0.3s ease; /* Add transition effect */
	}
	.normal-grid {
		transform: scale(1);
		transition: transform 0.3s ease;
	}
</style>
