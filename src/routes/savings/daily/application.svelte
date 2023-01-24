<script lang="ts">
  import axios from "axios";

  import { onMount } from "svelte";
  import BottomNav from "../../../Components/BottomNav.svelte";
  import Button from "../../../Components/Button.svelte";
  import TopNav from "../../../Components/TopNav.svelte";
  import { goto } from "@sapper/app";
  import { Eos, handleNotification, osName } from "../../../properties/client";
  import { Epage } from "../../../properties/shared";

  const name = "Thrift Application";
  const page = Epage.CONTRIBUTION;
  let os = Eos.NONE;
  let amount = 0;
  let has_agent: number | string = "0";
  let win: any = {};
  let disabled = false;

  const submit = async () => {
    has_agent = Number(has_agent);
    console.log(has_agent, amount);
    disabled = true;
    try {
      const data = await axios.post("api/thrift/daily", { amount, has_agent });
      console.log(data.data);
      if (data) {
        disabled = false;
        handleNotification(
          "your thrift have been set up successfully",
          window,
          "success",
          "ok"
        );
        win.ons.notification.alert(
          `Thrift created successfully. thrift amount: ${data.data.thrift_amount}`
        );
        goto("savings/daily/all");
      }
    } catch (error) {
      disabled = false;
      if (error.response.status == 401) {
        handleNotification(
          "you do not have a current session",
          window,
          "error",
          "error"
        );
        goto("accounts/login");
      }

      handleNotification(
        "We were not able to create your thrift at the moment",
        window,
        "error",
        "error"
      );
    }
  };
  onMount(() => {
    os = osName();
    win = window;
  });
</script>

<svelte:head>
  <title>Daily Thrift Application</title>
</svelte:head>

<TopNav {name} />
<BottomNav {page} />

<div class="container-fluid pb-5">
  <h3>Daily Thrift Application</h3>
  <p><small>join daily drift for the month of january.</small></p>

  <form on:submit|preventDefault={submit}>
    {#if os == Eos.MAC || os == Eos.IOS}
      <div class="form-input mb-2 mt-4">
        <label for="has_agent" class="form-control">Do you want an agent</label>
        <div>
          <select
            bind:value={has_agent}
            id="has_agent"
            required
            class="select-input select-input--underbar"
          >
            <option selected disabled> Do you want an agent</option>
            <option value="0">No</option>
            <option value="0">Yes</option>
          </select>
        </div>
      </div>
      <div class="form-input mb-5 mt-4">
        <label for="amount" class="form-control">Amount (in ₦)</label>
        <div>
          <input
            bind:value={amount}
            required
            type="text"
            class="text-input text-input--underbar"
            placeholder="enter thrift amount eg. 1,000"
            max="50000"
            min="1000"
          />
        </div>
      </div>
    {:else if os == Eos.ANDRIOD}
      <div class="form-input mb-3 mt-3">
        <label for="has_agent" class="form-control">Do you want an agent</label>
        <div>
          <select
            id="has_agent"
            bind:value={has_agent}
            required
            class="select-input select-input--material"
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
      </div>
      <div class="form-input mb-5 mt-4">
        <label for="amount" class="form-control">Amount (in ₦)</label>
        <div>
          <input
            bind:value={amount}
            class="text-input text-input--material mt-2"
            placeholder="enter thrift amount eg. 1,000"
            type="number"
            min="1000"
            max="50000"
            required
          />
        </div>
      </div>
    {:else}
      <!-- else content here -->
    {/if}
    <Button
      color="bg-blue"
      {disabled}
      type="submit"
      size="large"
      text="submit"
    />
  </form>
</div>

<style>
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
  .select-input,
  .text-input {
    width: 100%;
  }
 
</style>
