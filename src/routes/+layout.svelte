<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Lightswitch from '$lib/components/Lightswitch.svelte';
</script>

<ModeWatcher />
<slot />
