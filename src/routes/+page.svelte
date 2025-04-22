<script>
	import { flip } from 'svelte/animate';

	let { data } = $props();
</script>

<h1 class="text-5xl text-center text-gray-800 font-extrabold mt-12 mb-4">Social Media</h1>
<p class="text-center text-gray-500 text-xl mb-10 px-4">Explore Bilder by category or see them all at once.</p>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 max-w-screen-xl mx-auto">
	{#each data.articles as article (article.id)}
		<div animate:flip class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
			<a href={`articles/${article.id}`}>
				<img src={article.image} alt="imageuploaded" class="w-full h-48 object-cover" />
			</a>
			<div class="p-4">
				<p class="text-sm text-gray-500 mb-1">Author:</p>
				<p class="text-lg font-semibold text-gray-800 mb-3">{article.author}</p>
				
			
				
				<form action="?/like" method="POST" use:enhance>
					<input type="hidden" name="id" value={article.id} />
					<button type="submit" aria-label="like" class="w-8 h-8 hover:scale-110 transition-transform duration-200">
						<img src="https://ue6hr90fzxvjnndo.public.blob.vercel-storage.com/SocialMedia/like-tOg0BsMbTdvrPRXL0DW2OWU4PVmmXp.png" alt="like" />
					</button>
				</form>
				<div class="flex items-center justify-between text-gray-700 mb-3">
					<span class="text-sm">Likes: {article.votes}</span>
				</div>
			</div>
		</div>
	{/each}
</div>
