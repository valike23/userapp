<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import BottomNav from "../../Components/BottomNav.svelte";
  import Button from "../../Components/Button.svelte";
  import TopNav from "../../Components/TopNav.svelte";
  import { billerInfo } from "../../Model/biller";
  import { Eos, handleNotification, osName } from "../../properties/client";
  import { Epage } from "../../properties/shared";

  let os: Eos = Eos.ANDRIOD;
  const page = Epage.HOME;
  const name = "recharge card and airtime";
  let bill: Number | string = 3;
  let amount = "";
  let activeBiller: any = {};
  let showFirstScreen = false;
  let tel = '';
  let dataBundles: any = [];

  const pickBiller = (biller: any) => {
    activeBiller = biller;
    showFirstScreen = true;
  };

  const retrieveBillerRecords =async (billercode)=>{
   const resp = await axios.get('api/accounts/biller?code=' +  billercode);
   return resp;
  }

  const retrieveBills = async () => {
    console.log(bill);
    if(bill == 1){
    const data = await  retrieveBillerRecords(activeBiller.dataBiller);
    console.log('data', data.data);
    if(data.data.status == "success"){
      dataBundles = data.data.data;
      handleNotification(data.data.message, window, 'success','ok');
    }
    else{
      handleNotification(data.data, window, 'error','error');
    }
    
    }
  };

  onMount(() => {
    os = osName();
  });
</script>

<svelte:head>
  <title>Payment Page</title>
</svelte:head>
<TopNav {name} />
<BottomNav {page} />
<form class="container-fluid pb-5">
  {#if os == Eos.MAC || os == Eos.IOS}
    <!-- mac and ios code -->
    <div class="row">
      {#each billerInfo as biller}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class:shadowed={activeBiller.name == biller.name}
          on:click={() => {
            pickBiller(biller);
          }}
          class="col-3"
        >
          <img src={biller.logo} alt={biller.name} />
        </div>
      {/each}
    </div>
    <div class="form-input mb-2 mt-4">
      <label for="bill" class="form-control">What are you buying</label>
      <div>
        <select
        
          bind:value={bill}
          id="bill"
          required
          on:change={retrieveBills}
          class="select-input select-input--underbar"
        >
          <option selected disabled> What are you buying</option>
          <option value="0">Airtime</option>
          <option value="1">Data Bundle</option>
        </select>
      </div>
    </div>

    {#if bill == 0}
    <div class="form-input mb-5 mt-4">
      <label for="amount" class="form-control">Amount (in ₦)</label>
      <div>
        <input
          bind:value={amount}
          required
          type="text"
          class="text-input text-input--underbar"
          placeholder="₦"
          max="50000"
          min="100"
        />
      </div>
    </div>
    <div class="form-input mb-5 mt-4">
      <label for="amount" class="form-control">Phone Number</label>
      <div>
        <input
          bind:value={tel}
          required
          type="tel"
          class="text-input text-input--underbar"
          placeholder="080********"
         
        />
      </div>
    </div>
    {/if}
    {#if bill == 1}
    <div class="form-input mb-2 mt-4">
      <label for="bill" class="form-control">Pick a Bundle</label>
      <div>
        <select
        
         
          id="bundle"
          required
          class="select-input select-input--underbar"
        >
          <option selected disabled> Pick a bundle</option>
        {#each dataBundles as bundle, i}
        <option value="{i}">{bundle.name + '   ₦' + bundle.amount}</option>
        {/each}
          
        </select>
      </div>
    </div>
   {/if}
   
  {:else}
    <!-- android and windows code here -->
  {/if}
  <div class="row">
    <div class="col">
      <Button text="recharge" type="submit" size="large" color="primary"></Button>
    </div>
  </div>
  </form>

<style>
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .active {
    border: 1px solid black;
  }
  .shadowed {
    background-color: whitesmoke;
  }
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
  .select-input,
  .text-input {
    width: 100%;
  }
</style>
