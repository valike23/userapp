<script>
  import { on } from "events";
  import { onMount } from "svelte";
  import { getOS } from "../properties/client";


    export let name = "";
    let os ='';
    onMount(()=>{
       os = getOS();

       console.log(os);
    })
</script>


<div class="toolbar mb-3">
    <div class="toolbar__left">
      <span class="toolbar-button">
      {#if os == 'Linux' || os.includes('Window')}
      <span class="material-icons">
        arrow_back
        </span>
      {:else if  os == 'iPhone' || os == 'Macintosh'}
      <span class="material-icons">
        arrow_back_ios
        </span>
      {:else}
      <span class="material-icons">
        arrow_back
        </span>
      {/if}
      </span>
    </div>
  
    <div class="toolbar__center">{name}</div>
  </div>