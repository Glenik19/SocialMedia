<script>
	let { data } = $props();
</script>

<h1>Create a New Article</h1>

<form method="POST" action="?/createArticle" enctype="multipart/form-data">
    <div>
		<label for="image">Image</label>
		<input type="file" name="uploadedImage">
	</div>

	<div>
		<label for="description">Description</label>
		<textarea name="description" id="description" placeholder="Enter description"></textarea>
	</div>

	<div>
		<label for="author">Author</label>
		<input type="text" name="author" id="author" placeholder="Enter Author" />
	</div>

	<button type="submit">
		Create Article
	</button>
</form>
