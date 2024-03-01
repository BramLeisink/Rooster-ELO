<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

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

	let deleteDialogOpen = false;

	function askRemoveItem(id: string) {
		deleteDialogOpen = true;
	}
</script>

<AlertDialog.Root bind:open={deleteDialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Weet je het zeker?</AlertDialog.Title>
			<AlertDialog.Description>
				Het verwijderen van een dashboard-element kan niet ongedaan gemaakt worden. Deze kan later
				wel weer opniew toegevoegd worden.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Annuleren</AlertDialog.Cancel>
			<AlertDialog.Action on:click={() => removeItem(item.id)}>Doorgaan</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
<ContextMenu.Root>
	<ContextMenu.Trigger class="h-full w-full">
		<slot />
	</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item on:click={() => askRemoveItem(item.id)} disabled={layoutLocked}>Verwijder</ContextMenu.Item>
		<ContextMenu.Item>Knopje</ContextMenu.Item>
		<ContextMenu.Sub>
			<ContextMenu.SubTrigger>Meer knopjes</ContextMenu.SubTrigger>
			<ContextMenu.SubContent class="w-48">
				<ContextMenu.Item>
					Gaaf knopje
					<ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>Knopje 5</ContextMenu.Item>
				<ContextMenu.Item>Knopje 38</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item>Ander knopje</ContextMenu.Item>
			</ContextMenu.SubContent>
		</ContextMenu.Sub>
		<ContextMenu.Item>Laatste knopje</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
