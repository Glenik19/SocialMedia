<script>
	const { message } = $props();
</script>

<div>
	<p>{message}</p>
</div>

<style>
	div {
		background-color: black;
		color: whitesmoke;
		border: 2px solid white;
		padding: 10px 15px;
		border-radius: 4px;
		font-size: 14px;
		margin-bottom: 15px;
		text-align: center;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>
