<script>
	import '../app.css';
	import LanguageButton from '$lib/components/LanguageButton.svelte';

	let { children } = $props();
</script>

<div class="p-4 flex justify-end">
	<LanguageButton />
</div>

{@render children()}
