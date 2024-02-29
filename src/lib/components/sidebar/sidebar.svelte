<script lang="ts">
	import AccountSwitcher from './(components)/account-switcher.svelte';
	import { primaryRoutes, secondaryRoutes, footerRoutes } from './routes-data.js';
	import Nav from './(components)/nav.svelte';
	import { cn } from '$lib/utils';
	import * as Resizable from '$lib/components/ui/resizable';
	import { Separator } from '$lib/components/ui/separator';
	import SidebarFooter from './(components)/sidebar-footer.svelte';
	import { accounts, mails } from './data';
	import { Button } from '$lib/components/ui/button';
	import type { PaneAPI } from 'paneforge';

	export let defaultLayout = [265, 1095];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number;
	export let sidebarVisible: boolean = true;

	let sidebarPane: PaneAPI;
	let isCollapsed: boolean = defaultCollapsed;

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function onCollapse() {
		isCollapsed = true;
		document.cookie = `PaneForge:collapsed=${true}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}

	function toggleSidebar() {
		if (isCollapsed) {
			expandSidebar();
		} else {
			collapseSidebar();
		}
	}

	function expandSidebar() {
		sidebarPane.expand();
		isCollapsed = false;
	}

	function collapseSidebar() {
		sidebarPane.collapse();
		isCollapsed = true;
	}
</script>

<Button on:click={toggleSidebar}>Toggle</Button>

<div class="">
	<Resizable.PaneGroup
		direction="horizontal"
		{onLayoutChange}
		class="h-full max-h-screen items-stretch"
	>
		{#if sidebarVisible}
			<Resizable.Pane
				defaultSize={defaultLayout[0]}
				collapsedSize={navCollapsedSize}
				collapsible
				minSize={13}
				maxSize={20}
				bind:pane={sidebarPane}
				{onCollapse}
				{onExpand}
				order={1}
			>
				<div class={cn('flex h-screen flex-col')}>
					<div
						class={cn(
							'flex h-[52px] items-center justify-center',
							isCollapsed ? 'h-[52px]' : 'px-2'
						)}
					>
						<AccountSwitcher {isCollapsed} {accounts} />
					</div>
					<Separator />
					<Nav {isCollapsed} routes={primaryRoutes} />
					<Separator />
					<Nav {isCollapsed} routes={secondaryRoutes} />
					<div class={cn('mt-auto')}>
						<Separator />
						<SidebarFooter {isCollapsed} routes={footerRoutes} />
					</div>
				</div>
			</Resizable.Pane>
			<Resizable.Handle withHandle />
		{/if}
		<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30} order={1}>
			<slot />
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
