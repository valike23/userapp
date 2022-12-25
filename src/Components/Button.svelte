

<script>
  import { onMount } from "svelte";
  import { getOS } from "../properties/client";
export let text = '';
export let size ="";
export let color ="";
export let type = "";
export let disabled = false;
    let os = '';
    onMount(()=>{
      os =  getOS();
    })
</script>

{#if os == 'iPhone' || os == 'Macintosh'}
     <button {disabled} {type} class="button {size} {color}"> {text}</button>
{:else}
<button {type} {disabled} class="button button--material {size} {color}">{text}</button>
{/if}


<style>
    .large {
        width: 100%;
    }
</style>