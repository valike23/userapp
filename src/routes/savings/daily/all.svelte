
<script context="module">
	export async function preload(page, session) {
	let mysession ={};
  let thrifts = [];
try {
  
  const res = await this.fetch(`api/accounts`);
  const res2 = await this.fetch(`api/thrift/daily`);
  const data = await res2.json();
  thrifts = data.body;
  if(thrifts == undefined) thrifts = [];
		 mysession = await res.json();
} catch (error) {
  console.log(error);
  mysession ={};
  thrifts = [];
}

		return { mysession , thrifts};
	}
</script>
<script lang="ts">
  import BottomNav from "../../../Components/BottomNav.svelte";
  import Fab from "../../../Components/FAB.svelte";
  import LinkButton from "../../../Components/LinkButton.svelte";
  import TopNav from "../../../Components/TopNav.svelte";
  import { Epage } from "../../../properties/shared";
  import {goto} from "@sapper/app";
  import { getMonths } from "../../../Model/public";


  const name = "all Thrifts";
  export let thrifts, mysession;
  console.log(thrifts, mysession);
  const page = Epage.CONTRIBUTION;
  try {
    if (mysession.status == "failed") goto("accounts/login");
  } catch (error) {
    console.log(error);
  }
 
</script>

<svelte:head>
  <title>All Daily Thrift</title>
</svelte:head>

<TopNav {name} />
<BottomNav {page} />

<div class="container-fluid pb-5">
  <h3>All Daily Thrift</h3>



  <div class="row mt-2">
  
     {#each thrifts as thrift}
     <div class="col-12 col-sm-6 ">
      <div class="card">
          <div class="card__content">
              <p><small>{getMonths[thrift.month]}, {thrift.year}</small></p>
              <p> ₦{thrift.thrift_amount}</p>
              <p>
                {#if (new Date().getMonth()) == thrift.month}
                <small class="fg-green">ongoing</small>
                {:else}
                <small class="fg-red">finished</small>
                {/if}
              </p>
              <div class="text-center">
                  <LinkButton color="bg-blue fg-white" link="{'savings/daily?id=' + thrift.id}" text="view"></LinkButton>
              </div>
          </div>
      </div>
     
  </div>
     {/each}
  
  
  </div>
</div>

<Fab
  page="savings/daily/application"
  color="bg-blue fg-white"
  text="<span class='material-icons'>add</span>"
/>

<style>
  .bg-blue {
    color: white;
    border: none;
  }
</style>
