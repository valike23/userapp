<script>
  
  import { onMount } from "svelte";
  import { getOS } from "../properties/client";


    export let name = "";
    let os ='';
    const goback =()=>{
      history.back();
    }
    onMount(()=>{
       os = getOS();

       console.log(os);
    })
</script>


<div class="toolbar mb-3">
    <div class="toolbar__left">
      <span class="toolbar-button">
      {#if os == 'Linux' || os.includes('Window')}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span on:click={goback} class="material-icons">
        arrow_back
        </span>
      {:else if  os == 'iPhone' || os == 'Macintosh'}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span on:click={goback} class="material-icons">
        arrow_back_ios
        </span>
      {:else}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span on:click={goback} class="material-icons">
        arrow_back
        </span>
      {/if}
      </span>
    </div>
  
    <div class="toolbar__center">{name}</div>
  </div>

  <style>
    .toolbar__center {
      font-family: "Concert One", cursive;
    }
  </style>