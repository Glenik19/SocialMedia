<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<h1 class="text-4xl font-bold text-center text-gray-800 mt-10 mb-6">Admin Dashboard</h1>

<div class="flex flex-wrap justify-between items-center gap-4 mb-8 px-4">
	<a href="/" class="text-blue-600 font-medium hover:underline text-lg">← Back to Homepage</a>

	<div class="flex-1 flex justify-center">
		<a href="/admin/new" class="bg-blue-600 text-white px-5 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 shadow-md transition duration-200">
			Create New Article
		</a>
	</div>

	<form action="/logout?/logout" method="POST" class="inline-block">
		<button type="submit" class="bg-red-500 text-white px-5 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 shadow-md transition duration-200">
			Log out
		</button>
	</form>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
	{#each data.articles as article (article.id)}
		<div animate:flip class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden flex flex-col">
			<img src={article.image} alt="imageuploaded" class="w-full h-60 object-cover" />
			<div class="flex flex-col justify-between flex-grow p-5 space-y-3">
				<div>
					<p class="text-gray-700 text-base leading-relaxed">
						<span class="font-semibold text-gray-900">ID:</span> {article.id} <br />
						<span class="font-semibold text-gray-900">Description:</span> {article.description} <br />
						<span class="font-semibold text-gray-900">Author:</span> {article.author} <br />
						<span class="font-semibold text-gray-900">Likes:</span> {article.votes}
					</p>
				</div>
				<form action="?/deleteArticle" method="POST" use:enhance class="flex justify-end mt-auto">
					<input type="hidden" name="id" value={article.id} />
					<button type="submit" class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-200">
						Delete
					</button>
				</form>
			</div>
		</div>
	{/each}
</div>
