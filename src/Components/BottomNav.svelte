<script lang="ts">
  import { Epage } from "../properties/shared";
import {goto} from "@sapper/app";

  export let page: Epage = Epage.HOME;
  const nav =(mypage: Epage)=>{
    if(mypage == Epage.CONTRIBUTION) goto('/savings');
    if(mypage == Epage.HOME) goto('/');
  }
</script>

<div class="tabbar bottom-nav pos-fixed">
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

<style>

  
</style>