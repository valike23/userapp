<script context="module">
  export async function preload(page, session) {
    let mysession = {};
    let percentage = {};
    try {
      const res = await this.fetch(`api/accounts`);

      const res3 = await this.fetch(`api/thrift/fixed`, { method: "PATCH" });

      percentage = await res3.json();
      mysession = await res.json();
    } catch (error) {
      console.log(error);
      percentage = [];
      mysession = {};
    }

    return { mysession, percentage };
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
  import { Egateway, EgatewayType, Epage, IgatewayTranscation } from "../../../properties/shared";
  import type { IthriftTranscation } from "../../api/transcation/gateway";
  export let mysession, percentage: any={};
  console.log(percentage);
  const name = "Thrift Application";
  const page = Epage.CONTRIBUTION;
  let os = Eos.NONE;
  let purpose = '';
  let amount = 1000;
  let has_agent: number | string = "0";
  let win: any = {};
  let disabled = false;
  let duration: any = 0;

  try {
    if (mysession.status == "failed") goto("accounts/login");
  } catch (error) {
    console.log(error);
  }

  const submit = async () => {
    const thrift: any = {
      wallet: amount,
      clientId: mysession.user.id,
      type: 'fixed',
      thrift_amount: amount,
      percentage: percentage.percentage,
      status: 1,
      duration
    }
    const paystack = new win.PaystackPop();
    paystack.newTransaction({
      key: "pk_test_4db756d3f9f36402bfb91a78937fc4d48c4d8047",
      amount: amount * 100,
      email: mysession.user.email,

      onSuccess: async (transaction) => {
        console.log(transaction);
        const trans: IgatewayTranscation = {
          user_id: mysession.user.id,
          reference: transaction.reference,
          gateway: Egateway.PAYSTACK,
        email: mysession.user.email,
          type: EgatewayType.THRIFT_PAYMENT,
          message: transaction.message,
          status: transaction.status,
          amount: amount,
        };
        const thrift_tran: IthriftTranscation = {
          clientId: mysession.user.id,
          amountPaid: amount,
          
          paymentRef: transaction.reference,
          resolved: transaction.status == "success" ? 1 : 0,
        };
       
        handleNotification(
          "creating thrift...",
          window,
          "info",
          "loading..."
        );
        try {
          console.log({
            thrift_tran,
            trans, thrift
          });
          const resp = await axios.post("api/thrift/fixed", {
            thrift_tran,
            trans, thrift
          });

          if (resp.data) {
            console.log(resp.data);
            handleNotification(
              "transcation added successfully",
              window,
              "success",
              "ok"
            );
            goto('savings/fixed');
          }
        } catch (error) {
          handleNotification("something went wrong", window, "error", "error");
          console.log(error);
        }
      },
    });
  };
  onMount(() => {
    os = osName();
    win = window;
  });
</script>

<svelte:head>
  <title>Fixed Thrift Application</title>
</svelte:head>

<TopNav {name} />
<BottomNav {page} />

<div class="container-fluid pb-5">
  <h3>Fixed Thrift Application</h3>
  <p><small>Earn {percentage.percentage}% on your savings.</small></p>

 

  <form on:submit|preventDefault={submit}>
    {#if os == Eos.MAC || os == Eos.IOS}
      <div class="form-input mb-2 mt-4">
        <label for="duration" class="form-control">Thrift Duration</label>
        <div>
          <select
            bind:value={duration}
            id="duration"
            required
            class="select-input select-input--underbar"
          >
            <option selected disabled> Choose duration in Months</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="9">9 months</option>
            <option value="12">12 months</option>
          </select>
        </div>
      </div>
      <div class="form-input mb-5 mt-4">
        <label for="amount" class="form-control"
          >Amount (Amount you want to save)</label
        >
        <div>
          <input
            bind:value={amount}
            required
            min=1000
            type="number"
            class="text-input text-input--underbar"
            placeholder="enter your thrift amount"
          />
        </div>
      </div>
    <div class="mb-2">
      <p><span>possible earning: ₦{amount + ((percentage.percentage * amount * duration)/(100 * 12))}</span></p>
    </div>
    {:else if os == Eos.ANDRIOD}
      <div class="form-input mb-3 mt-3">
        <label for="duration" class="form-control">Thrift Duration</label>
        <div>
          <select
            id="duration"
            bind:value={duration}
            required
            class="select-input select-input--material"
          >
          <option selected disabled> Choose duration in Months</option>
          <option value="3">3 months</option>
          <option value="6">6 months</option>
          <option value="9">9 months</option>
          <option value="12">12 months</option>
          </select>
        </div>
      </div>
  
      <div class="form-input mb-5 mt-4">
        <label for="amount" class="form-control"
          >Amount (Amount you want to save)</label
        >
        <div>
          <input
            bind:value={amount}
            class="text-input text-input--material mt-2"
            placeholder="enter the Amount to save"
            min="1000"
            type="number"
            required
          />
        </div>
      </div>

      <div class="mb-2">
        <p><span>possible earning: ₦{amount + ((percentage.percentage * amount * duration)/(100 * 12))}</span></p>
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
