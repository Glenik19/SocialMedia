<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

<a href="/admin/new" class="block w-fit mx-auto bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition">
	Create a New Article
</a>

<form action="/logout?/logout" method="POST" class="inline-block">
    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105">Log out</button>
</form>

<div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
		{#each data.articles as article (article.id)}
			<div animate:flip class="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:translate-y-[-5px] hover:shadow-lg">
				<img src={article.image} alt="imageuploaded" class="w-full h-48 object-cover rounded-lg mb-4" />
				<p class="text-gray-700 text-lg">
					<strong class="text-gray-900">ID:</strong> {article.id} |
					<strong class="text-gray-900">Description:</strong> {article.description} |
					<strong class="text-gray-900">Author:</strong> {article.author}	|
					<strong class="text-gray-900">Likes:</strong> {article.votes} 
				</p>
				<form action="?/deleteArticle" method="POST" use:enhance class="flex justify-end mt-2">
					<input type="hidden" name="id" value={article.id} />
					<button type="submit" class="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-700 transition">
						Delete
					</button>
				</form>
			</div>
		{/each}
</div>