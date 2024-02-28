<script lang="ts">
	import { fade } from 'svelte/transition';
	import Grid, { GridItem, type GridController } from 'svelte-grid-extended';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';

	let items = [
		{ id: crypto.randomUUID(), x: 0, y: 0, w: 2, h: 5 },
		{ id: crypto.randomUUID(), x: 2, y: 2, w: 2, h: 2 },
		{ id: crypto.randomUUID(), x: 2, y: 0, w: 1, h: 2 },
		{ id: crypto.randomUUID(), x: 3, y: 0, w: 2, h: 2 },
		{ id: crypto.randomUUID(), x: 4, y: 2, w: 1, h: 3 },
		{ id: crypto.randomUUID(), x: 8, y: 0, w: 2, h: 8 },
		{ id: crypto.randomUUID(), x: 4, y: 5, w: 1, h: 1 },
		{ id: crypto.randomUUID(), x: 2, y: 6, w: 3, h: 2 },
		{ id: crypto.randomUUID(), x: 2, y: 4, w: 2, h: 2 }
	];

	export let data;

	if (data && data.layout && data.layout.length > 0) {
		items = data.layout;
	}

	let gridController: GridController;

	const itemsBackup = structuredClone(items);

	const itemSize = { height: 80 };

	function resetGrid() {
		items = structuredClone(itemsBackup);
	}

	function remove(id: string) {
		items = items.filter((i) => i.id !== id);
		updateLayoutCookie();
	}

	function addNewItem() {
		const w = Math.floor(Math.random() * 2) + 1;
		const h = Math.floor(Math.random() * 5) + 1;
		const newPosition = gridController.getFirstAvailablePosition(w, h);
		items = newPosition
			? [...items, { id: crypto.randomUUID(), x: newPosition.x, y: newPosition.y, w, h }]
			: items;
		updateLayoutCookie();
	}

	function updateLayoutCookie() {
		document.cookie = `Dashboard:layout=${JSON.stringify(items)}`;
	}
</script>

<div class="flex gap-4 p-4">
	<Button variant="outline" on:click={addNewItem}>Add New Item</Button>
	<Button variant="outline" on:click={resetGrid}>Reset Grid</Button>
</div>

<div class="h-full w-full overflow-scroll">
	<Grid
		{itemSize}
		cols={10}
		collision="push"
		bind:controller={gridController}
		on:change={updateLayoutCookie}
	>
		{#each items as item (item.id)}
			<div transition:fade={{ duration: 300 }}>
				<GridItem id={item.id} bind:x={item.x} bind:y={item.y} bind:w={item.w} bind:h={item.h}>
					<Card.Root class="h-full w-full overflow-scroll">
						<Card.Header>
							<Card.Title>{item.id.slice(0, 5)}</Card.Title>
							<Card.Description>Sleep mij</Card.Description>
						</Card.Header>
						<Card.Footer class="flex justify-between">
							<Button on:click={() => remove(item.id)} class="remove">Remove</Button>
						</Card.Footer>
					</Card.Root>
				</GridItem>
			</div>
		{/each}
	</Grid>
</div>
