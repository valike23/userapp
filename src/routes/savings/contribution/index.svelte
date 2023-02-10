<script context="module">
	export async function preload(page, session) {
	let mysession ={};
  let contribution = {contributions: []};
try {
  
  const res = await this.fetch(`api/accounts`);
  const res2 = await this.fetch(`api/thrift/contribution`);

  const data = await res2.json();
  contribution = data;
  if(contribution == undefined) contribution = {contributions: []};
		 mysession = await res.json();
} catch (error) {
  console.log(error);
  mysession ={};
  contribution = {contributions: []};
}

		return { mysession , contribution};
	}
</script>

<script lang="ts">
  import BottomNav from "../../../Components/BottomNav.svelte";
import TopNav from "../../../Components/TopNav.svelte";
  import { Epage } from "../../../properties/shared";
  import {goto} from "@sapper/app";
  import Fab from "../../../Components/FAB.svelte";
  import { onMount } from "svelte";
let name = 'contribution';
export let mysession: any, contribution: any = {contributions: []};

const page = Epage.CONTRIBUTION;

try {
    if (mysession.status == "failed") goto("accounts/login");
  } catch (error) {
    console.log(error);
  }

  onMount(()=>{
    console.log('contribution', contribution);
  })
</script>


<TopNav {name}></TopNav>

<BottomNav {page}></BottomNav>

<div class="container-fluid pb-5">
   <div class="row">
    {#if contribution.contributions}
    {#each contribution.contributions as con}
    <div class="col-12 col-md-6">
        <div class="card">
            <div class="card__content">
                <p>name: {con.name}</p>
                <p>amount: ₦{con.amount}</p>
                <p>payout slot: {con.client_contributions.ballot_month || 'not assigned yet'} 
                    <a href="savings/contribution/details?id={con.id}" class="button primary small float-right">open</a></p>

            </div>
        </div>
    </div>
{/each}
    {:else}
            <p></p>
    {/if}
   </div>
</div>

<Fab
page="savings/contribution/application"
color="bg-blue fg-white"
text="<span class='material-icons'>add</span>"
/>