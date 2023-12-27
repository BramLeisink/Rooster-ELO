<script>
    import { page } from '$app/stores';
</script>

<h1 class="text-2xl font-bold">Skill issue: {$page.status}</h1>
{#if $page.status == "404"}
<p>Deze pagina bestaat niet! Ik weet niet hoe je het voor elkaar krijgt, maar gewoon blijven zoeken, komt vast goed.</p>
{:else}
<p>{$page.error.message}</p>
{/if}