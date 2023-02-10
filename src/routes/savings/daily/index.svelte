<script context="module">
  export async function preload(page, session) {
    let mysession = {};
    let thrift = { transcations: [] };
    try {
      const res = await this.fetch(`api/accounts`);
      const res2 = await this.fetch(`api/thrift/daily?id=${page.query.id}`, {
        method: "PUT",
      });
      const data = await res2.json();

      thrift = data.body;
      if (thrift == undefined) thrift = { transcations: [] };
      mysession = await res.json();
    } catch (error) {
      console.log(error);
      mysession = {};
      thrift = { transcations: [] };
    }

    return { mysession, thrift };
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import BottomNav from "../../../Components/BottomNav.svelte";
  import TopNav from "../../../Components/TopNav.svelte";
  import { Epage, Esvg } from "../../../properties/shared";
  import { goto } from "@sapper/app";
  import { Eos, handleNotification, osName } from "../../../properties/client";
  import {
    Egateway,
    EgatewayType,
    IgatewayTranscation,
    IthriftTranscation,
  } from "../../api/transcation/gateway";
  import axios from "axios";

  const page = Epage.CONTRIBUTION;
  let win: any = {};
  let payCharm: any = {};
  let pay_amount = 0;
  let cal: any = {};
  let os: Eos | string = "";
  export let thrift, mysession;
  console.log(mysession);
  try {
    if (mysession.status == "failed") goto("accounts/login");
  } catch (error) {
    console.log(error);
  }
  let payAmount = thrift.thrift_amount;
  const pay = () => {
    let data = document.getElementById("payAmount");
    const input = win.Metro.getPlugin(data, "spinner");
    console.log(input);
    pay_amount = input.val();
    console.log("agression", payAmount, pay_amount);
    win.Metro.charms.close("#pay");
    const paystack = new win.PaystackPop();
    paystack.newTransaction({
      key: "pk_test_4db756d3f9f36402bfb91a78937fc4d48c4d8047",
      amount: pay_amount * 100,
      email: mysession.user.email,

      onSuccess: async (transaction) => {
        console.log(transaction);
        const trans: IgatewayTranscation = {
          user_id: mysession.user.id,
          reference: transaction.reference,
          gateway: Egateway.PAYSTACK,
          type: EgatewayType.THRIFT_PAYMENT,
          message: transaction.message,
          status: transaction.status,
          amount: pay_amount,
        };
        const count = pay_amount / thrift.thrift_amount;
        const trnasList = [];
        const thrift_tran: IthriftTranscation = {
          clientId: mysession.user.id,
          amountPaid: thrift.thrift_amount,
          thriftId: thrift.id,
          paymentRef: transaction.reference,
          resolved: transaction.status == "success" ? 1 : 0,
        };
        for (let index = 0; index < count; index++) {
          trnasList.push(thrift_tran);
        }
        handleNotification(
          "submitting transcations",
          window,
          "info",
          "loading..."
        );
        try {
          const resp = await axios.post("api/thrift/daily/transcation", {
            trans,
            trnasList,
          });

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
  const dayClick = (e) => {
    console.log(e);
  };
  let name = "Daily Thrift";
  const openModal = () => {
    payCharm = win.Metro.charms.open("#pay");
  };

  onMount(() => {
    win = window;
    console.log(win);

    os = osName();
    let ele = document.getElementById("calendar");
    let opts = { abbrYear: false, onDayClick: dayClick };
    cal = new win.calendar(ele, opts);
  });
</script>

<TopNav {name} />
<BottomNav {page} />
<div class="container-fluid pb-5 ">
  <div class="row mb-4">
    <div class="col-12">
      <span>
        {#if new Date().getMonth() == thrift.month}
          <small class="fg-green">ongoing</small>
        {:else}
          <small class="fg-red">finished</small>
        {/if}
      </span>
      {#if new Date().getMonth() == thrift.month}
        <span>
          {#if os == Eos.IOS || os == Eos.MAC}
            <button
              on:click={openModal}
              class="button bg-green fg-white float-right"
            >
              pay
            </button>
          {:else if os == Eos.ANDRIOD}
            <button
              on:click={openModal}
              class="button button--material bg-green fg-white float-right "
              >pay</button
            >
          {:else}
            <button
              on:click={openModal}
              class="button bg-green fg-white float-right">pay</button
            >
          {/if}
        </span>
      {/if}
    </div>
    <div class="col-12">
      <div class="card daily">
        <div class="card__content ">
          <div class="row p-5">
            <div class="col-3 pt-4">
              <ion-icon class="icon" name="wallet-outline" />
            </div>
            <div class="col-9">
              <p class="text-sm fg-white" style="font-family: 'Concert One';">
                Daily Contribution Balance
              </p>
              <p style="font-weight: 800;" class=" fg-white  amount">
                {thrift.wallet}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="calendar" />

  <h3 class="title">Transcations</h3>
  <ul class="items-list mt-3">
    {#each thrift.transcations as transcation, i}
      <li>
        {#if transcation.agentId}
          <!-- svelte-ignore a11y-missing-attribute -->
          <img class="avatar" src={Esvg.BANKER} />
        {:else if transcation.type == "cash"}
          <!-- svelte-ignore a11y-missing-attribute -->
          <img class="avatar" src={Esvg.CASH} />
        {:else}
          <!-- svelte-ignore a11y-missing-attribute -->
          <img class="avatar" src={Esvg.CARD} />
        {/if}
        <span class="label">₦{transcation.amountPaid}</span>
        <span class="second-label"> Day: {i + 1}</span>
        {#if transcation.resolved == 1}
          <span class="second-action mif-checkmark fg-green" />
        {:else if transcation.resolved == 0}
          <span class="second-action mif-pause fg-blue" />
        {:else}
          <span class="second-action mif-cancel fg-red" />
        {/if}
      </li>
    {/each}
  </ul>
</div>

<div id="pay" data-role="charms" data-position="right" style="width:40vh">
  <div class="row">
    <div class="col">
      <h3>Make Payment here</h3>

      <p>Amount you want to pay</p>

      <input
        id="payAmount"
        bind:value={payAmount}
        type="number"
        data-role="spinner"
        data-min-value={thrift.thrift_amount}
        data-max-value="1000000"
        data-step={thrift.thrift_amount}
        data-fixed="0"
      />

      <div class="mt-5">
        <button on:click={pay} class="button success" style="width:100%"
          >Pay</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .daily {
    background-color: rgba(197, 133, 36, 0.906);
    background-image: url(/images/dashboard/bg-1.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right center;
  }
  .amount {
    font-family: "Concert One";
    font-size: 30px;
  }
  .title {
    font-size: 0.825rem;
  }
</style>
