

<script>
  import { onMount } from "svelte";
  import { getOS } from "../properties/client";
export let text = '';
export let size ="";
export let color ="";
export let type = "";
export let link = "";
    let os = '';
    onMount(()=>{
      os =  getOS();
    })
</script>

{#if os == 'iPhone' || os == 'Macintosh'}
     <a href="{link}"  {type} class="button {size} {color}"> {text}</a>
{:else}
<a href="{link}" {type}  class="button button--material {size} {color}">{text}</a>
{/if}


<style>
    .large {
        width: 100%;
    }
</style>