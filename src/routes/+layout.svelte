<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import Sidebar from '$lib/components/sidebar/sidebar.svelte';
	import Cmdk from '$lib/components/cmdk/cmdk.svelte';
	import '../app.pcss';

	export let data;
</script>

<ModeWatcher />
<Cmdk />
<Sidebar defaultLayout={data.layout} defaultCollapsed={data.collapsed} navCollapsedSize={4}>
	<slot />
</Sidebar>
