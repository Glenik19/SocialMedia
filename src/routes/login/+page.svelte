<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	export let form;
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100 p-5">
	<form class="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-5" action="?/login" method="POST" use:enhance>
		<h1 class="text-2xl font-bold text-center text-gray-800 mb-4">Login</h1>

		<label for="email" class="text-sm font-semibold text-gray-600">E-Mail</label>
		<input type="text" name="email" id="email" placeholder="Enter your email" required 
		       class="p-2 text-lg border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />

		<label for="password" class="text-sm font-semibold text-gray-600">Password</label>
		<input type="password" name="password" id="password" placeholder="Enter your password" required 
		       class="p-2 text-lg border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />

		<button type="submit" class="p-3 text-lg font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">Login</button>

		{#if form}
			<Warning message={form.message} />
		{/if}
	</form>
</div>
