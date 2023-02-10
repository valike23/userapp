<script context="module">
	export async function preload(page, session) {
	let mysession ={};
  let thrifts = [];
try {
  
  const res = await this.fetch(`api/accounts`);
  const res2 = await this.fetch(`api/thrift/fixed`);

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
import TopNav from "../../../Components/TopNav.svelte";
  import { calculateTimeRemaining } from "../../../properties/client";
  import { Epage } from "../../../properties/shared";
const name = 'Fixed Thrift';
const page = Epage.CONTRIBUTION;

export let thrifts;


</script>



<TopNav  {name}/>
<BottomNav {page}></BottomNav>

<div class="container-fluid pb-5">
    <h3>Fixed Thrifts</h3>
  
  
  
    <div class="row mt-2">
    
       {#each thrifts as thrift}
       <div class="col-12 col-sm-6 ">
        <div class="card">
            <div class="card__content">
              <p>
                {#if thrift.status == 1}
                <small class="fg-green">ongoing</small>
                {:else if thrift.status == 2 || thrift.status == 3}
                <small class="fg-red">finished</small>
                {:else}
                <small class="fg-blue">pending</small>
                {/if}
              </p>
                <p><strong> ₦{thrift.wallet}</strong></p>
              
               <div>
                {#if calculateTimeRemaining(thrift.createdAt, thrift.duration)}
                <p> your thrift will mature in {calculateTimeRemaining(thrift.createdAt, thrift.duration)} days</p>
              
                {:else}
                 <div class="mt-2">
                  <button class="button success">Withdrawal</button>
                 </div>
                {/if}
               



               </div>
            </div>
        </div>
       
    </div>
       {/each}
    
    
    </div>
  </div>

  <Fab
  page="savings/fixed/application"
  color="bg-blue fg-white"
  text="<span class='material-icons'>add</span>"
/>

<style>
    .bg-blue {
      color: white;
      border: none;
    }
  </style>