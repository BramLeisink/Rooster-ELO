<script lang="ts">
	import Separator from '../../ui/separator/separator.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import BasicLayoutItem from './basic_layout_item.svelte';

	interface DashboardItem {
		id: `${string}-${string}-${string}-${string}-${string}`;
		x: number;
		y: number;
		w: number;
		h: number;
	}

	let leaderboard = [
		{ name: 'Ridjay Dwarkasing', initials: 'RD', pfp: '', average: '9,2', place: 1 },
		{ name: 'Fedde Smit', initials: 'FS', pfp: '', average: '8,7', place: 2 },
		{ name: 'Noah Reijnen', initials: 'NR', pfp: '', average: '8,4', place: 3 }
	];

	let ownPlace = { name: 'Sander Teunissen', initials: 'ST', pfp: '', average: '4,2', place: 68 };

	export let item: DashboardItem;
	export let removeItem: (id: string) => void;
	export let layoutLocked: boolean;
</script>

<BasicLayoutItem {item} {removeItem} {layoutLocked}>
	<Card.Root class="h-full w-full overflow-auto">
		<Card.Header>
			<Card.Title>Leaderboard</Card.Title>
			<Card.Description>De huidige top drie, van jouw jaarlaag</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-6">
			{#each leaderboard as person}
				<div class="flex items-center justify-between space-x-4">
					<div class="flex items-center space-x-4">
						<Avatar.Root>
							<Avatar.Image src={person.pfp} alt={person.name} />
							<Avatar.Fallback>{person.initials}</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<p class="text-sm font-medium leading-none">{person.name}</p>
							<p class="text-sm text-muted-foreground">Gemiddeld: {person.average}</p>
						</div>
					</div>
					<p class="font-bold text-green-600">
						{person.place}.
					</p>
				</div>
			{/each}
			<Separator class="" />
			<h4 class="text-sm font-semibold">Eigen positie:</h4>
			<div class="flex items-center justify-between space-x-4">
				<div class="flex items-center space-x-4">
					<Avatar.Root>
						<Avatar.Image src={ownPlace.pfp} alt={ownPlace.name} />
						<Avatar.Fallback>{ownPlace.initials}</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<p class="text-sm font-medium leading-none">{ownPlace.name}</p>
						<p class="text-sm text-muted-foreground">Gemiddeld: {ownPlace.average}</p>
					</div>
				</div>
				<p class="font-bold text-red-600">
					{ownPlace.place}.
				</p>
			</div>
			<p class="text-sm text-muted-foreground">Je staat 1 plek boven Bo Kersten...</p>
		</Card.Content>
	</Card.Root>
</BasicLayoutItem>
