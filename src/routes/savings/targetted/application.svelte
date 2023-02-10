<script context="module">
  export async function preload(page, session) {
    let mysession = {};
    let durations = [];
    try {
      const res = await this.fetch(`api/accounts`);

      const res3 = await this.fetch(`api/thrift/targeted`, { method: "PATCH" });

      durations = await res3.json();
      mysession = await res.json();
    } catch (error) {
      console.log(error);
      durations = [];
      mysession = {};
    }

    return { mysession, durations };
  }
</script>

<script lang="ts">
  import axios from "axios";

  import { onMount } from "svelte";
  import BottomNav from "../../../Components/BottomNav.svelte";
  import Button from "../../../Components/Button.svelte";
  import TopNav from "../../../Components/TopNav.svelte";
  import { goto } from "@sapper/app";
  import { Eos, handleNotification, osName } from "../../../properties/client";
  import { Epage } from "../../../properties/shared";
  export let mysession, durations: any[];
  console.log();
  const name = "Thrift Application";
  const page = Epage.CONTRIBUTION;
  let os = Eos.NONE;
  let purpose = '';
  let has_agent: number | string = "0";
  let win: any = {};
  let disabled = false;
  let duration: any = null;
  let choosenDuration: any = {};

  $: {
    if (duration) {
      choosenDuration = durations.find((dur) => {
        if (dur.id == duration) return dur;
      });
    }
  }

  const submit = async () => {
    has_agent = Number(has_agent);
    console.log(has_agent, purpose);
    if (!choosenDuration.id)
      return handleNotification(
        "you have to choose a duration",
        window,
        "error",
        "error"
      );
    disabled = true;
    try {
      const data = await axios.post("api/thrift/targeted", {
        purpose,
        duration: choosenDuration.id,
        has_agent,
      });
      console.log(data.data);
      if (data) {
        disabled = false;
        handleNotification(
          "your thrift have been set up successfully",
          window,
          "success",
          "ok"
        );
        win.ons.notification.alert(`Thrift created successfully.`);
        goto("savings/targetted");
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
  <title>Targetted Thrift Application</title>
</svelte:head>

<TopNav {name} />
<BottomNav {page} />

<div class="container-fluid pb-5">
  <h3>Targetted Thrift Application</h3>
  <p><small>Start a Targetted Thrift.</small></p>

  {#if choosenDuration.id}
    <div data-role="panel ">
      <p><strong>duration:</strong> {choosenDuration.name}</p>
      <p><strong>charges:</strong> {choosenDuration.charges}</p>
      <p><strong>over charges:</strong> {choosenDuration.over_charges}</p>
    </div>
  {/if}

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
        <label for="amount" class="form-control"
          >Reason (reason for this savings)</label
        >
        <div>
          <input
            bind:value={purpose}
            required
            type="text"
            class="text-input text-input--underbar"
            placeholder="enter reason for your savings"
          />
        </div>
      </div>
      <div class="form-input mb-4 mt-4">
        <label for="has_agent" class="form-control">Choose Loan Duration</label>
        <div>
          <select
            bind:value={duration}
            id="duration"
            required
            class="select-input select-input--underbar"
          >
            <option selected disabled> Choose a Duration</option>
           
            {#each durations as dur}
            <option value={dur.id}>{dur.name}</option>
            {:else}
                <option></option>
            {/each}
          </select>
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
      <div class="form-input mb-4 mt-4">
        <label for="has_agent" class="form-control">Choose Loan Duration</label>
        <div>
          <select
            bind:value={duration}
            id="duration"
            required
            class="select-input select-input--material"
          >
            <option selected disabled> Choose a Duration</option>
            {#each  durations as dur}
            <option value={dur.id}>{dur.name}</option>
            {:else}
               <option value=""></option>
            {/each}
           
          </select>
        </div>
      </div>
      <div class="form-input mb-5 mt-4">
        <label for="amount" class="form-control"
          >Reason (reason for this savings)</label
        >
        <div>
          <input
            bind:value={purpose}
            class="text-input text-input--material mt-2"
            placeholder="enter the reason for savings"
            type="text"
            required
          />
        </div>
      </div>
    {:else}
      <!-- else content here -->
    {/if}
    <Button
      color="bg-blue "
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
