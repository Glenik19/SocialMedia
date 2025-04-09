<script>
	let { data } = $props();
</script>

<h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Create a New Article</h1>

<form method="POST" action="?/createArticle" enctype="multipart/form-data" class="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto space-y-4">
    <div class="space-y-2">
		<label for="image" class="block text-sm font-medium text-gray-700">Image</label>
		<input type="file" name="uploadedImage" class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
    	
	</div>

	<div class="space-y-2">
		<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
		<textarea name="description" id="description" placeholder="Enter description"  class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"></textarea>
	</div>

	<div class="space-y-2">
		<label for="author" class="block text-sm font-medium text-gray-700">Author</label>
		<input type="text" name="author" id="author" placeholder="Enter Author"  class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
	</div>

	<button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition">
		Create Article
	</button>
</form>
