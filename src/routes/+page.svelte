<script>
	import { flip } from 'svelte/animate';

	let { data } = $props();
</script>

<h1 class="text-4xl text-center text-gray-800 font-bold mt-8 p-3">Social Media</h1>
<p class="text-center text-gray-600 text-lg mb-6">Explore Bilder by category or see them all at once.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
		{#each data.articles as article (article.id)}
			<div animate:flip class="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:translate-y-[-5px] hover:shadow-lg">
				<img src={article.image} alt="imageuploaded" class="w-full h-48 object-cover rounded-lg mb-4" />
				<p class="text-gray-700 text-lg">
					<strong class="text-gray-900">Author:</strong> {article.author}	|
					<strong class="text-gray-900">Likes:</strong> {article.votes} 

				</p>
			</div>
		{/each}
</div>