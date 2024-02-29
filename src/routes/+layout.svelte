<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Lightswitch from '$lib/components/Lightswitch.svelte';
	import Sidebar from '$lib/components/sidebar/sidebar.svelte';

	export let data;
</script>

<ModeWatcher />

<Sidebar defaultLayout={data.layout} defaultCollapsed={data.collapsed} navCollapsedSize={4}>
	<slot />
</Sidebar>
