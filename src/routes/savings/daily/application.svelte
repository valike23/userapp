<script lang="ts">
  import { onMount } from "svelte";
  import BottomNav from "../../../Components/BottomNav.svelte";
  import Button from "../../../Components/Button.svelte";
  import TopNav from "../../../Components/TopNav.svelte";
  import { Eos, osName } from "../../../properties/client";
  import { Epage } from "../../../properties/shared";
  const name = "Thrift Application";
  const page = Epage.CONTRIBUTION;
  let os = Eos.NONE;
  let disabled = false;
    const submit =()=>{

    }
  onMount(()=>{
    os = osName();
  })
</script>
<svelte:head>
  
<title>Daily Thrift Application</title>
</svelte:head>

<TopNav {name}></TopNav>
<BottomNav {page} />

<div class="container-fluid pb-5">


<h3>Daily Thrift Application</h3>
<p><small>join daily drift for the month of january.</small></p>


    <form on:submit|preventDefault={submit}>
      {#if os == Eos.MAC || os == Eos.IOS }
      <div class="form-input mb-2 mt-4">
        <label for="amount" class="form-control">Do you want an agent</label>
        <div>
          <select required class="select-input select-input--underbar">
            <option selected disabled> Do you want an agent</option>
            <option>No</option>
            <option>Yes</option>
            <option>Hybrid</option>
          </select>
        </div>
      </div>
      <div class="form-input mb-5 mt-4">
        <label for="amount" class="form-control">Amount (in ₦)</label>
        <div><input required type="text" class="text-input text-input--underbar" placeholder="enter thrift amount eg. 1,000" max="50000" min="1000" ></div>
      </div>
    {:else if os == Eos.ANDRIOD}
    <div class="form-input mb-3 mt-3">
      <label for="amount" class="form-control">Do you want an agent</label>
      <div>
        <select required class="select-input select-input--material">
        
          <option>No</option>
          <option>Yes</option>
          <option>Hybrid</option>
        </select>
      </div>
    </div>
    <div class="form-input mb-5 mt-4">
      <label for="amount" class="form-control">Amount (in ₦)</label>
      <div><input class="text-input text-input--material mt-2" placeholder="enter thrift amount eg. 1,000" type="number" min="1000" max="50000" required></div>
       </div>
    
       {:else}
        <!-- else content here -->
    {/if}
        <Button color='bg-blue' {disabled} type="submit" size="large" text='submit'/>
    </form>

</div>

<style>
  h3{
    font-size: 20px;
    font-weight: 700;
  }
  .select-input , .text-input {
    width: 100%;
  }
</style>
