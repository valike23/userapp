<script>
  import { onMount } from "svelte";
  import { getOS } from "../properties/client";

  let os = '';
  export let type = "text";
  export let disabled = false;

  onMount(() => {
    os = getOS();
  });
</script>
{#if os == "iPhone" || os == "Macintosh"}
     <input {type}>
{:else if  os == os.includes('Window') }
    <input {type}>
{:else}
     <input {type}>
{/if}

