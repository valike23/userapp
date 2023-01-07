

<script lang="ts">
    import { onMount } from "svelte";
    import {goto} from "@sapper/app";
    import { getOS } from "../properties/client";
  export let text = '';
  export let color ="";
  export let page = '';
  const gotoApplication =()=>{
    console.log('test this code');
    goto(page);
  }
  export let disabled = false;
      let os = '';
      onMount(()=>{
        os =  getOS();
      })
  </script>
  
  {#if os == 'iPhone' || os == 'Macintosh'}
  <button on:click={gotoApplication}  {disabled} {color} class="fab fab--material raised">{@html text}</button>
  {:else}
  <button on:click={gotoApplication}   {disabled} {color} class="fab fab--mini raised">{@html text}</button>
  {/if}


  <style>
    .raised{
        position: absolute;
        z-index: 3;
        top: 82vh;
        bottom: 0;
        right: 0;
        margin-right: 10px;
    }
  </style>
  
