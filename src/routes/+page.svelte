<script>
	import { flip } from 'svelte/animate';

	let { data } = $props();
</script>

<h1 class="text-4xl text-center text-gray-800 font-bold mt-8 p-3">Social Media</h1>
<p class="text-center text-gray-600 text-lg mb-6">Explore Bilder by category or see them all at once.</p>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-screen-xl mx-auto">
	{#each data.articles as article (article.id)}
			<div animate:flip class="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:translate-y-[-5px] hover:shadow-lg">
				<p class="text-gray-900 font-bold mb-2">Author: {article.author}</p>
				<img src={article.image} alt="imageuploaded" class="w-full h-48 object-cover rounded-lg mb-4" />
				<p class="text-gray-900 flex items-center justify-between">
					Likes {article.votes}
					<!-- svelte-ignore event_directive_deprecated -->
					<button
						on:click={() => article.liked = !article.liked}
						class="text-2xl transition-colors duration-300"
					>
					<span class={article.liked ? 'text-red-500' : 'text-gray-300'}>❤️</span>
					</button>
				</p>
				
			</div>
		{/each}
</div>

