<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">Oops...</h1>

	<h4 class="mt-2 text-xl font-semibold tracking-tight">
		{$page.status}: {#if $page.error}{$page.error.message}{/if}
	</h4>

	<p class="mt-4 text-gray-600">Er is iets fout gegaan, skill issue.</p>
</div>
