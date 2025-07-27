<script lang="ts">
  let { children } = $props()
</script>

<div class="green-border" data-decorator-type="svelte">
  {@render children()}
</div>