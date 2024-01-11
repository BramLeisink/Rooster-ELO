<script>
	import { base } from '$app/paths';
	import { User, Settings, LogOut } from 'lucide-svelte';
</script>

<div class="navbar bg-base-200">
	<div class="flex-1">
		<label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				height="16"
				width="14"
				class="fill-primary"
				viewBox="0 0 448 512"
				><path
					d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
				/></svg
			></label
		>
		<a href="{base}/" class="btn btn-ghost text-xl">Rooster 🐓</a>
	</div>
	<div class="flex-none gap-2">
		<div class="form-control hidden lg:block">
			<input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
		</div>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar online">
				<div class="w-10 rounded-full">
					<img
						alt="Tailwind CSS Navbar component"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
			>
				<li><a href="{base}/profile"><User class="inline text-base-content w-4 h-4" />Profiel</a></li>
				<li><a href="{base}/settings"><Settings class="inline text-base-content w-4 h-4" />Instellingen</a></li>
				<li><a href="{base}/"><LogOut class="inline text-base-content w-4 h-4" />Uitloggen</a></li>
			</ul>
		</div>
	</div>
</div>

<style>
</style>
