<script>
	let { data } = $props();
</script>

<h1 class="text-4xl font-bold text-center text-gray-800 mt-10 mb-6">Create a New Article</h1>

<div class="text-center mb-6">
	<a href="/admin" class="text-blue-600 hover:underline text-lg font-medium">← Back to Admin</a>
</div>

<form method="POST" action="?/createArticle" enctype="multipart/form-data" class="bg-white rounded-2xl shadow-xl p-8 max-w-xl mx-auto space-y-6 border border-gray-100">
    <div class="space-y-2">
		<label for="image" class="block text-sm font-semibold text-gray-700">Image</label>
		<input type="file" name="uploadedImage" class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
	</div>

	<div class="space-y-2">
		<label for="description" class="block text-sm font-semibold text-gray-700">Description</label>
		<textarea name="description" id="description" placeholder="Enter description" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-28 text-gray-700 placeholder-gray-400"></textarea>
	</div>

	<div class="space-y-2">
		<label for="author" class="block text-sm font-semibold text-gray-700">Author</label>
		<input type="text" name="author" id="author" placeholder="Enter author name" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 placeholder-gray-400" />
	</div>

	<button type="submit" class="w-full bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-md">
		Create Article
	</button>
</form>
