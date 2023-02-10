<script context="module">
	export async function preload(page, session) {
	let mysession ={};
  let thrifts = [];
  let durations = [];
try {
  
  const res = await this.fetch(`api/accounts`);
  const res2 = await this.fetch(`api/thrift/targeted`);

  const res3 = await this.fetch(`api/thrift/targeted`, {method: 'PATCH'});
  const data = await res2.json();
   durations = await res3.json();
  thrifts = data.body;
  if(thrifts == undefined) thrifts = [];
		 mysession = await res.json();
} catch (error) {
  console.log(error);
  mysession ={};
  thrifts = [];
}

		return { mysession , thrifts, durations};
	}
</script>

<script lang="ts">
  import BottomNav from "../../../Components/BottomNav.svelte";
  import Fab from "../../../Components/FAB.svelte";
  import LinkButton from "../../../Components/LinkButton.svelte";
import TopNav from "../../../Components/TopNav.svelte";
  import { Epage } from "../../../properties/shared";
const name = 'targetted Thrift';
const page = Epage.CONTRIBUTION;

export let thrifts, durations;
console.log('durations', durations);
</script>



<TopNav  {name}/>
<BottomNav {page}></BottomNav>

<div class="container-fluid pb-5">
    <h3>All Targetted Thrift</h3>
  
  
  
    <div class="row mt-2">
    
       {#each thrifts as thrift}
       <div class="col-12 col-sm-6 ">
        <div class="card">
            <div class="card__content">
                <p><small>{thrift.purpose}</small></p>
                <p> ₦{thrift.wallet}</p>
                <p>
                  {#if thrift.status == 1}
                  <small class="fg-green">ongoing</small>
                  {:else if thrift.status == 2 || thrift.status == 3}
                  <small class="fg-red">finished</small>
                  {:else}
                  <small class="fg-blue">pending</small>
                  {/if}
                </p>
                <div class="text-center">
                    <LinkButton color="bg-blue fg-white" link="{'savings/targetted/single?id=' + thrift.id}" text="view"></LinkButton>
                </div>
            </div>
        </div>
       
    </div>
       {/each}
    
    
    </div>
  </div>

  <Fab
  page="savings/targetted/application"
  color="bg-blue fg-white"
  text="<span class='material-icons'>add</span>"
/>

<style>
    .bg-blue {
      color: white;
      border: none;
    }
  </style>