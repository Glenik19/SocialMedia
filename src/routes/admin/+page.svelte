<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<h1>Admin Dashboard</h1>

<a href="/admin/new" >
	Create a New Article
</a>

<form action="/logout?/logout" method="POST">
    <button type="submit">Log out</button>
</form>

<div>
		{#each data.articles as article (article.id)}
			<div animate:flip >
				<img src={article.image} alt="imageuploaded"/>
				<p >
					<strong>ID:</strong> {article.id} |
					<strong>Description:</strong> {article.description} |
					<strong>Author:</strong> {article.author}	|
					<strong>Likes:</strong> {article.votes} 
				</p>
				<form action="?/deleteArticle" method="POST" use:enhance>
					<input type="hidden" name="id" value={article.id} />
					<button type="submit">
						Delete
					</button>
				</form>
			</div>
		{/each}
</div>