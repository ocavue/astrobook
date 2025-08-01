<script lang="ts">
  interface Props {
    label?: string
    children: import('svelte').Snippet
  }
  
  let { children, label }: Props = $props()
</script>

<div class="decorator" data-label={label}>
  {@render children()}
</div>