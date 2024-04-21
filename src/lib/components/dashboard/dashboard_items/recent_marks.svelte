<script lang="ts">
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';

	const marks = [
		{
			name: 'Vraag en aanbod (eindtoets)',
			vak: 'economie',
			received_grade: '9,3'
		},
		{ name: 'Leesvaardigheid', vak: 'Engelse taal en literatuur', received_grade: '8,9' }
	];
</script>

<Card.Root class="h-full w-full xl:col-span-2">
	<Card.Header class="flex flex-row items-center">
		<div class="grid gap-2">
			<Card.Title>Recente cijfers</Card.Title>
			<Card.Description>De meest recente cijfers die binnen zijn.</Card.Description>
		</div>
		<Button href="/cijfers" size="sm" class="ml-auto gap-1">
			Alle bekijken
			<ArrowUpRight class="h-4 w-4" />
		</Button>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Toets</Table.Head>
					<Table.Head class="xl:table.-column hidden">Type</Table.Head>
					<Table.Head class="xl:table.-column hidden">Status</Table.Head>
					<Table.Head class="xl:table.-column hidden">Date</Table.Head>
					<Table.Head class="text-right">Cijfer</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body class="h-full">
				{#each marks as mark}
					<Table.Row>
						<Table.Cell>
							<div class="font-medium">{mark.name}</div>
							<div class="hidden text-sm text-muted-foreground md:inline">{mark.vak}</div>
						</Table.Cell>
						<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
						<Table.Cell class="xl:table.-column hidden">
							<Badge class="text-xs" variant="outline">Approved</Badge>
						</Table.Cell>
						<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
							2023-06-23
						</Table.Cell>
						<Table.Cell class="text-right">{mark.received_grade}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
