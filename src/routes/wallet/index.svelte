<script context="module">
  export async function preload(page, session) {
    let mysession = {};
    let gateways = [];
    let client = {};
    try {
      const res = await this.fetch(`api/accounts`);
      const res2 = await this.fetch(`api/transcation/gateway?page=1`);

    const res4 = await this.fetch(`api/dashboard`);
		 client = await res4.json();
      const data = await res2.json();
      gateways = data;
      if (gateways == undefined) gateways = [];
      mysession = await res.json();
    } catch (error) {
      console.log(error);
      mysession = {};
      gateways = [];
    }

    return { mysession, gateways, client };
  }
</script>

<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import BottomNav from "../../Components/BottomNav.svelte";
  import TopNav from "../../Components/TopNav.svelte";
  import { goto } from "@sapper/app";
  import { handleNotification } from "../../properties/client";
  import {
    Egateway,
    EgatewayType,
    Epage,
    IgatewayTranscation,
  } from "../../properties/shared";

  export let mysession,
    gateways = [], client: any = {};

  let win: any = {};
  const name = "wallet";
  const page = Epage.WALLET;

 

  const pay = (amount: number) => {
    const paystack = new win.PaystackPop();
    paystack.newTransaction({
      key: "pk_test_4db756d3f9f36402bfb91a78937fc4d48c4d8047",
      amount: amount * 100,
      email: "ludike23@gmail.com",

      onSuccess: async (transaction) => {
        console.log(transaction);
        const trans: IgatewayTranscation = {
          user_id: 1,
          reference: transaction.reference,
          gateway: Egateway.PAYSTACK,
          type: EgatewayType.DEPOSIT,
          message: transaction.message,
          status: transaction.status,
          amount,
        };

        handleNotification(
          "submitting transcations",
          window,
          "info",
          "loading..."
        );
        try {
          const resp = await axios.post("", trans);

          if (resp.data) {
            console.log(resp.data);
            handleNotification(
              "transcation added successfully",
              window,
              "success",
              "ok"
            );
          }
        } catch (error) {
          handleNotification("something went wrong", window, "error", "error");
          console.log(error);
        }
      },
    });
  };

  const withdrawal = async () => {
    let result = await win.ons.notification.prompt({
      inputType: "number",
      title: "withdrawal",
      messageHTML: `<p> Enter the amount you want to withdrawal not less than<strong> ₦5,000</strong></p>`,
      defaultValue: 5000,
      buttonLabels: ["Withdrawal", "close"],
      primaryButtonIndex: 0,
    });

    console.log("result", result);
  };

  const topUp = async () => {
    const amount = await win.ons.notification.prompt({
      inputType: "number",
      title: "topUp",
      messageHTML: `<p> Enter the amount you want to add into your <strong style='color:green'>safesave</strong> wallet. minimum amount ₦1,000</p>`,
      defaultValue: 1000,
      buttonLabels: ["TopUp", "close"],
      primaryButtonIndex: 0,
    });
    //console.dir(amount);
    const resp = await win.ons.notification.confirm({
      messageHTML: `<p>you are about to pay in ₦${amount} into your <strong style='color:green'>safesave</strong> wallet</p>`,
    });
    //console.dir(resp);
    if (resp) {
      pay(amount);
    }
  };
  onMount(() => {
    try {
    if (mysession.status == "failed") goto("accounts/login");
  } catch (error) {
    console.log(error);
  }
    win = window;
    console.log('the clients are here: ',client);
  });
</script>

<svelte:head>
  <title>SafeSave:: Wallet</title>
</svelte:head>
<BottomNav {page} />
<TopNav {name} />
<div class="container pb-5">
  <div class="card bg-primary fg-white">
    <div class="card__content">
      <p class="text-center fg-white">Available Balance</p>
      <h3 class="text-center fg-white">₦{client.client.wallet}</h3>
    </div>
  </div>

  <div class="row mt-3">
    <div class="cell-6 text-center">
      <button on:click={withdrawal} class="button  button--large--cta">
        withdrawal</button
      >
    </div>
    <div class="cell-6 text-center">
      <button on:click={topUp} class="button  button--large--cta">
        Top Up</button
      >
    </div>
  </div>

  <h2 class="h2-text">wallet transcations</h2>
  {#each gateways as gateway}
    {#if gateway.type == "credit"}
      <div class="row">
        <div class="col-12">
          <div class="card" style="background-color: whitesmoke">
            <div class="card__content">
              <p>
                <strong>{gateway.sourceType}</strong>
                <strong class="float-right fg-green">N{gateway.amount}</strong>
              </p>
              <p>
                <small
                  >{win.moment(gateway.createdAt, "YYYY-MM-DD HH:mm").format(
                    "YYYY-MM-DD HH:mm"
                  )}</small
                > <small class="float-right" />
              </p>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="row">
        <div class="col-12">
          <div class="card" style="background-color: whitesmoke">
            <div class="card__content">
              <p>
                <strong>{gateway.sourceType}</strong>
                <strong class="float-right fg-red">N{gateway.amount}</strong>
              </p>
              <p>
                <small
                  >{win.moment(gateway.createdAt, "YYYY-MM-DD HH:mm").format(
                    "YYYY-MM-DD HH:mm"
                  )}</small
                >
                <small class="float-right">08040206876</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

<style>
  .h2-text {
    font-family: "Concert One", cursive;
    font-size: 20px;
  }
  .active {
    background-color: green;
    color: white;
  }
  .bg-primary {
    background-color: green;
    color: white;
  }
  div,
  p,
  button {
    font-family: "Concert One", cursive;
  }
</style>
