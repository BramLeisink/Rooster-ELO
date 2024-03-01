<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import SidebarNav from "./(components)/sidebar-nav.svelte";

	const sidebarNavItems = [
		{
			title: "Profiel",
			href: "/settings",
		},
		{
			title: "Account",
			href: "/settings/account",
		},
		{
			title: "Uiterlijk",
			href: "/settings/appearance",
		},
		{
			title: "Meldingen",
			href: "/settings/notifications",
		},
		{
			title: "Weergave",
			href: "/settings/display",
		},
	];
</script>

<div class="space-y-6 p-10 pb-16">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Instellingen</h2>
		<p class="text-muted-foreground">
			Beheer je accountinstellingen en pas je email voorkeuren aan.
		</p>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} />
		</aside>
		<div class="flex-1 lg:max-w-2xl">
			<slot />
		</div>
	</div>
</div>
