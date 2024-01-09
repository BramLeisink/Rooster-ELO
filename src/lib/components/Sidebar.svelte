<script>
	import { base } from '$app/paths';
	import { Home, Calendar, Award } from 'lucide-svelte';
</script>

<ul class="menu px-4 w-80 min-h-full bg-base-200 text-base-content">
	<div class="form-control lg:hidden">
		<input type="text" placeholder="Search" class="input input-bordered w-full md:w-auto" />
	</div>
	<li>
		<a href="{base}/">
			<Home class="text-primary w-5 h-5" />
			Home
		</a>
	</li>
	<li>
		<a href="{base}/agenda">
			<Calendar class="text-primary w-5 h-5" /> Agenda
		</a>
	</li>
	<li>
		<a href="{base}/marks">
			<Award class="text-primary w-5 h-5" />Cijfers <span class="badge badge-secondary">+2</span>
		</a>
	</li>
</ul>
