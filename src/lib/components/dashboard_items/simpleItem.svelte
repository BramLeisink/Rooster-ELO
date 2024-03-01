<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	interface DashboardItem {
		id: `${string}-${string}-${string}-${string}-${string}`;
		x: number;
		y: number;
		w: number;
		h: number;
	}

	export let item: DashboardItem;
	export let removeItem: (id: string) => void;
</script>

<div class="h-full w-full overflow-auto rounded-lg border p-4">
	<div class="flex">
		<Button on:click={() => removeItem(item.id)} variant="outline" class="remove">Remove</Button>
	</div>
	<h3 class="font-semibold">{item.id.slice(0, 5)}</h3>
	<p class="pb-2 text-sm text-muted-foreground">Sleep mij</p>
</div>
