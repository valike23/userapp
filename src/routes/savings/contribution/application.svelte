<script context="module">
	export async function preload(page, session) {
	
  let contributions = [];
  let mysession = {};
try {
    const res = await this.fetch(`api/accounts`);
  const res2 = await this.fetch(`api/thrift/contribution`,{method: 'PATCH'});
  mysession = await res.json();
  const data = await res2.json();
  contributions = data;
  if(contributions == undefined) contributions = [];
} catch (error) {
  console.log(error);

  contributions = [];
}

		return {  contributions, mysession};
	}
</script>
<script lang="ts">
  import axios from "axios";

  import { onMount } from "svelte";

  import BottomNav from "../../../Components/BottomNav.svelte";
import TopNav from "../../../Components/TopNav.svelte";
  import { handleNotification } from "../../../properties/client";
  import { Epage } from "../../../properties/shared";
  import {goto} from "@sapper/app";

const name = "Contributions";
const page = Epage.CONTRIBUTION;
export let contributions = [], mysession;
let win: any = {};

try {
    if (mysession.status == "failed") goto("accounts/login");
  } catch (error) {
    console.log(error);
  }
const join =async (contribution)=>{
    try {
        let res = await win.ons.notification.confirm(
      `you want to join group ${contribution.name} with a payout of ${contribution.amount}`
    );
    if(!res) return;
        handleNotification('joining a group', win, 'info','joining...');
       const resp = await axios.post(`api/thrift/contribution?id=${contribution.id}`);
       if(resp.data){
        console.log(resp.data);
        if(!resp.data.status) return handleNotification(resp.data.msg, window, 'error','error');
        handleNotification('you have successfully joined the group', window, 'success', 'ok');
        goto('savings/contribution');
       }
       let {data} = resp;
       console.log(data);
    } catch (error) {
        console.log(error);
        handleNotification('something went wrong', window, 'error','error');
    }
}

onMount(()=>{
    win = window;
    console.log(contributions);
})
</script>


<TopNav {name}></TopNav>
<BottomNav {page}></BottomNav>

<div class="container-fluid pb-5">
    <h3>join a contribution</h3>


    <div class="row">
       {#each contributions as contribution}
       <div class="col-12 col-md-6">
            <div class="card">
                <div class="card__content">
                    <p>amount: <strong>₦{contribution.amount}</strong> 
                    {#if contribution.status == 1}
                        <span class="fg-green float-right">still admitting</span>
                    {:else}
                        <span class="fg-red float-right">closed</span>
                    {/if}
                    
                    </p>
                    <p>duration : <strong>{contribution.months} months</strong></p>

                    <p class="text-center"><button on:click={()=>{join(contribution)}} disabled={contribution.status != 1} class="button button--large--cta" style="width: 95%; margin: 0 auto;">join</button></p>
                </div>
            </div>
       </div>
       {/each}
    </div>

</div>