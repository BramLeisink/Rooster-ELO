<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '../lib/components/Sidebar.svelte';
</script>

<Navbar />
<div class="drawer lg:drawer-open">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<div class="p-4">
			<slot />
		</div>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <Sidebar />
	</div>
</div>
