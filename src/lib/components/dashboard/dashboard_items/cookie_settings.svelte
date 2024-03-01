<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
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
		<Card.Header>
			<Card.Title>Cookie Settings</Card.Title>
			<Card.Description>Manage your cookie settings here.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-6">
			<div class="flex items-center justify-between space-x-2">
				<Label for="necessary" class="flex flex-col space-y-1">
					<span>Strictly Necessary</span>
					<span class="text-xs font-normal leading-snug text-muted-foreground">
						These cookies are essential in order to use the website and use its features.
					</span>
				</Label>
				<Switch id="necessary" checked aria-label="Necessary" />
			</div>
			<div class="flex items-center justify-between space-x-2">
				<Label for="functional" class="flex flex-col space-y-1">
					<span>Functional Cookies</span>
					<span class="text-xs font-normal leading-snug text-muted-foreground">
						These cookies allow the website to provide personalized functionality.
					</span>
				</Label>
				<Switch id="functional" aria-label="Functional" />
			</div>
			<div class="flex items-center justify-between space-x-2">
				<Label for="performance" class="flex flex-col space-y-1">
					<span>Performance Cookies</span>
					<span class="text-xs font-normal leading-snug text-muted-foreground">
						These cookies help to improve the performance of the website.
					</span>
				</Label>
				<Switch id="performance" aria-label="Performance" />
			</div>
		</Card.Content>
		<Card.Footer>
			<Button variant="outline" class="w-full">Save preferences</Button>
		</Card.Footer>
	</Card.Root>
</BasicLayoutItem>
