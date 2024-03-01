<script lang="ts">
	import CheckCircle from 'lucide-svelte/icons/check-circle';
	import BookText from 'lucide-svelte/icons/book-text';
	import CircleDot from 'lucide-svelte/icons/circle-dot';
	import UserCheck from 'lucide-svelte/icons/user-check';
	import CalendarClock from 'lucide-svelte/icons/calendar-clock';
	import Laptop from 'lucide-svelte/icons/laptop';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import GraduationCap from 'lucide-svelte/icons/graduation-cap';
	import Users from 'lucide-svelte/icons/users';
	import Mail from 'lucide-svelte/icons/mail';
	import * as Command from '$lib/components/ui/command';
	import { onMount } from 'svelte';
	import { setMode, resetMode } from 'mode-watcher';

	let open = false;
	let search = '';
	let pages: string[] = [];
	let page: string | undefined = undefined;

	$: page = pages[pages.length - 1];

	function changePage(newPage: string) {
		search = '';
		pages = [...pages, newPage];
	}

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = !open;
			} else if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
				e.preventDefault();
				const newPages = pages.slice(0, -1);
				pages = newPages;
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<Command.Dialog bind:open>
	<Command.Input bind:value={search} placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		{#if !page}
			<Command.Group heading="Suggesties">
				<Command.Item>
					<CalendarClock class="mr-2 h-4 w-4" />
					<span>Agenda</span>
				</Command.Item>
				<Command.Item>
					<GraduationCap class="mr-2 h-4 w-4" />
					<span>Cijfers</span>
				</Command.Item>
				<Command.Item>
					<CheckCircle class="mr-2 h-4 w-4" />
					<span>Huiswerk</span>
				</Command.Item>
				<Command.Item>
					<UserCheck class="mr-2 h-4 w-4" />
					<span>Presentie</span>
				</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Tools">
				<Command.Item>
					<BookText class="mr-2 h-4 w-4" />
					<span>Boeken</span>
				</Command.Item>
				<Command.Item>
					<CircleDot class="mr-2 h-4 w-4" />
					<span>Keuze uren</span>
				</Command.Item>
				<Command.Item>
					<Users class="mr-2 h-4 w-4" />
					<span>Docenten</span>
				</Command.Item>
				<Command.Item>
					<Mail class="mr-2 h-4 w-4" />
					<span>Mail</span>
				</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Instellingen">
				<Command.Item onSelect={() => changePage('theme')}
					><Sun class="mr-2 h-4 w-4 dark:hidden" />
					<Moon class="mr-2 h-4 w-4 hidden dark:block" />Wissel thema</Command.Item
				>
			</Command.Group>
		{:else if page === 'theme'}
			<Command.Item onSelect={() => setMode('light')}
				><Sun class="mr-2 h-4 w-4" />Licht</Command.Item
			>
			<Command.Item onSelect={() => setMode('dark')}
				><Moon class="mr-2 h-4 w-4" />Donker</Command.Item
			>
			<Command.Item onSelect={() => resetMode()}
				><Laptop class="mr-2 h-4 w-4" />Systeem</Command.Item
			>
		{/if}
	</Command.List>
	<Command.List></Command.List>
</Command.Dialog>
