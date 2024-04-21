<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import ChevronDown from 'svelte-radix/ChevronDown.svelte';
	import Circle from 'svelte-radix/Circle.svelte';
	import Plus from 'svelte-radix/Plus.svelte';
	import Star from 'svelte-radix/Star.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Separator } from '$lib/components/ui/separator';
	import BasicLayoutItem from './basic_layout_item.svelte';

	interface DashboardItem {
		id: `${string}-${string}-${string}-${string}-${string}`;
		x: number;
		y: number;
		w: number;
		h: number;
	}

	export let item: DashboardItem;
	export let removeItem: (id: string) => void;
	export let layoutLocked: boolean;
</script>

<BasicLayoutItem {item} {removeItem} {layoutLocked}>
	<Card.Root class="h-full w-full overflow-auto">
		<Card.Header class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
			<div class="space-y-1">
				<Card.Title>Gemiddelde</Card.Title>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="flex space-x-4 text-sm text-muted-foreground">
				<div class="flex items-center">
					<Circle class="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
					TypeScript
				</div>
				<div class="flex items-center">
					<Star class="mr-1 h-3 w-3" />
					20k
				</div>
				<div>Updated April 2023</div>
			</div>
		</Card.Content>
	</Card.Root>
</BasicLayoutItem>
