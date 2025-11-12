<script>
  import { locale, availableLocales } from '$lib/i18n';
</script>

<div class="language-button">
  <!-- bind directly to the store's value so changes are reactive across pages -->
  <select aria-label="Select language" bind:value={$locale} class="px-3 py-1 rounded border">
    {#each availableLocales as l}
      <option value={l.code}>{l.label}</option>
    {/each}
  </select>
</div>

<style>
  .language-button select {
    background: white;
    border: 1px solid #e5e7eb; /* tailwind gray-200 */
    color: #111827;
  }
</style>
