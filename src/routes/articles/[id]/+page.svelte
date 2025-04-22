<script>
	import { flip } from 'svelte/animate';

	let { data } = $props();
</script>

<a href="/"><h1>Social Media</h1></a>
<p>Explore Bilder by category or see them all at once.</p>

<div>
	{#each data.articles as article (article.id)}
		<div animate:flip>
			<div>
				<div>
					<img src={article.image} alt="imageuploaded" />
				</div>

				<div>
					<div>
						<p>Author:</p>
						<p>{article.author}</p>
						<p>{article.description}</p>

						<div>
							<span>Likes: {article.votes}</span>
							<form action="?/like" method="POST" use:enhance>
								<input type="hidden" name="id" value={article.id} />
								<button type="submit" aria-label="like">
									<img src="https://ue6hr90fzxvjnndo.public.blob.vercel-storage.com/SocialMedia/like-tOg0BsMbTdvrPRXL0DW2OWU4PVmmXp.png" alt="like" />
								</button>
							</form>
						</div>
					</div>

					<!-- Comments Section -->
					<div>
						<h3>Comments</h3>
						<div>
							{#each data.comments as comment}
								<p>
									<span>{comment.name}:</span> {comment.text}
								</p>
							{/each}
						</div>

						<form action="?/comment" method="POST" use:enhance>
							<input type="hidden" name="article_id" value={article.id} />
							
							<div>
								<label for="name">Your Name</label>
								<input type="text" name="name" required />
							</div>

							<div>
								<label for="content">Your Comment</label>
								<textarea name="content" required></textarea>
							</div>

							<button type="submit">Add Comment</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
