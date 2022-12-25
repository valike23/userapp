<script lang="ts">
  import { Epage } from "../properties/shared";
import {goto} from "@sapper/app";
  import { onMount } from "svelte";
  import { getOS } from "../properties/client";

  export let page: Epage = Epage.HOME;
  const nav =(mypage: Epage)=>{
    if(mypage == Epage.CONTRIBUTION) goto('/savings');
    if(mypage == Epage.HOME) goto('/');
  }
let os = '';
  onMount(()=>{
    os = getOS();

console.log(os);
  })
</script>

{#if os == 'iPhone' || os == 'Macintosh'}
<div class="tabbar tabbar--bottom bottom-nav pos-fixed">
  <label class="tabbar__item" on:click={()=>{nav(Epage.HOME)}} on:keydown={()=>{nav(Epage.HOME)}}>
    <input type="radio" name="tabbar-a" checked="{page == Epage.HOME}">
    <button class="tabbar__button ">
      <i class="tabbar__icon ">
        <span class="material-icons">
          home
          </span>
      </i>
      <div class="tabbar__label">Home</div>
    </button>
  </label>

  <label class="tabbar__item" on:click={()=>{nav(Epage.CONTRIBUTION)}} on:keydown={()=>{nav(Epage.CONTRIBUTION)}}>
    <input type="radio" name="tabbar-a" checked="{page == Epage.CONTRIBUTION}">
    <button class="tabbar__button">
      <i class="tabbar__icon ">
        <i class="mif-coins"></i>
      </i>
      <div class="tabbar__label">Contributions</div>
    </button>
  </label>

  <label class="tabbar__item">
    <input type="radio" name="tabbar-a" checked="{page == Epage.INVESTMENT}">
    <button class="tabbar__button">
      <i class="tabbar__icon ">
        <span class="material-icons">
          account_balance_wallet
          </span>
      </i>
      <div class="tabbar__label">Investments</div>
    </button>
  </label>
</div>

{:else if os == 'Linux' || os.includes('Window')}
<div class="tabbar bg-blue fg-white tabbar--bottom tabbar--material bottom-nav pos-fixed">
  <label class="tabbar__item tabbar--material__item" on:click={()=>{nav(Epage.HOME)}} on:keydown={()=>{nav(Epage.HOME)}}>
    <input type="radio" name="tabbar-material-c" checked="{page == Epage.HOME}">
    <button class="tabbar__button tabbar--material__button">
      <span  class="material-icons tabbar__icon tabbar--material__icon fg-white">
        home
        </span>
      <div class="tabbar__label tabbar--material__label fg-white">Home</div>
    </button>
  </label>

  <label class="tabbar__item tabbar--material__item" on:click={()=>{nav(Epage.CONTRIBUTION)}} on:keydown={()=>{nav(Epage.CONTRIBUTION)}}>
    <input type="radio" name="tabbar-material-c" checked="{page == Epage.CONTRIBUTION}">
    <button class="tabbar__button tabbar--material__button">
      <span  class="material-icons tabbar__icon tabbar--material__icon fg-white">
        savings
        </span>
      <div class="tabbar__label tabbar--material__label fg-white">Thrifts</div>
    </button>
  </label>

  <label class="tabbar__item tabbar--material__item">
    <input type="radio" name="tabbar-material-c">
    <button class="tabbar__button tabbar--material__button">
      <span  class="material-icons tabbar__icon tabbar--material__icon fg-white">
        paid
        </span>
      <div class="tabbar__label tabbar--material__label fg-white">Investments</div>
    </button>
  </label>
</div>

{/if}

<style>

  
</style>