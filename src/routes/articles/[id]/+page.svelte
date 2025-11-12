<script>
	import { flip } from 'svelte/animate';
	import { translations } from '$lib/i18n';
	let { data } = $props();

</script>

<a href="/"><h1 class="text-5xl text-center text-gray-800 font-extrabold mt-12 mb-4">{$translations.title}</h1></a>
<p class="text-center text-gray-500 text-xl mb-10 px-4">{$translations.subtitle}</p>

<div class="space-y-10 px-4 max-w-screen-xl mx-auto">
	{#each data.articles as article (article.id)}
		<div animate:flip class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
			<div class="flex flex-col lg:flex-row">
			
				<div class="w-full lg:w-1/2">
					<img src={article.image} alt="imageuploaded" class="w-full h-72 object-cover lg:h-full" />
				</div>

			
<<<<<<< HEAD
					<div class="w-full lg:w-1/2 p-6 flex flex-col justify-between space-y-5">
					<div>
						<p class="text-sm text-gray-500">{$translations.author}</p>
						<p class="text-lg font-semibold text-gray-800 mb-2">{article.author}</p>
						<p class="text-gray-700 text-sm mb-4">{article.description}</p>

						<div class="flex items-center justify-between text-gray-700">
							<span class="text-sm font-medium">{$translations.likes}: {article.votes}</span>
							<form action="?/like" method="POST" use:enhance>
								<input type="hidden" name="id" value={article.id} />
								<button type="submit" aria-label="like" class="w-11 h-10 hover:scale-110 transition-transform duration-200">
									<img src="https://ue6hr90fzxvjnndo.public.blob.vercel-storage.com/SocialMedia/like-tOg0BsMbTdvrPRXL0DW2OWU4PVmmXp.png" alt="like" />
								</button>
							</form>
						</div>
					</div>

					<!-- Comments Section -->
					<div>
						<h3 class="text-md font-bold text-gray-800 mb-2">{$translations.comments_heading}</h3>
						<div class="space-y-2 text-sm text-gray-600 max-h-32 overflow-y-auto pr-2">
							{#each data.comments as comment}
								<p>
									<span class="font-semibold text-gray-800">{comment.name}:</span> {comment.text}
								</p>
							{/each}
						</div>

						<form action="?/comment" method="POST" use:enhance class="space-y-3 mt-4">
							<input type="hidden" name="article_id" value={article.id} />
							
							<div class="flex flex-col">
								<label for="name" class="text-sm font-medium mb-1 text-gray-700">{$translations.your_name}</label>
								<input
									type="text"
									name="name"
									required
									class="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
								/>
							</div>

							<div class="flex flex-col">
								<label for="content" class="text-sm font-medium mb-1 text-gray-700">{$translations.your_comment}</label>
								<textarea
									name="content"
									required
									class="border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
								></textarea>
							</div>

							<button
								type="submit"
								class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
							>{$translations.add_comment}</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
