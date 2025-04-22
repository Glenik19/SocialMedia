<script>
	import { flip } from 'svelte/animate';

	let { data } = $props();
</script>

<h1>Social Media</h1>
<p>Explore Bilder by category or see them all at once.</p>

<div>
	{#each data.articles as article (article.id)}
		<div animate:flip>
			<a href={`articles/${article.id}`}>
				<img src={article.image} alt="imageuploaded" />
			</a>
			<div>
				<p>Author:</p>
				<p>{article.author}</p>

				<form action="?/like" method="POST" use:enhance>
					<input type="hidden" name="id" value={article.id} />
					<button type="submit" aria-label="like">
						<img src="https://ue6hr90fzxvjnndo.public.blob.vercel-storage.com/SocialMedia/like-tOg0BsMbTdvrPRXL0DW2OWU4PVmmXp.png" alt="like" />
					</button>
				</form>
				<div>
					<span>Likes: {article.votes}</span>
				</div>
			</div>
		</div>
	{/each}
</div>
