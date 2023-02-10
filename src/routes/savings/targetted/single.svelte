<script context="module">
  export async function preload(page, session) {
    let mysession = {};
    let thrift = { transcations: [] };
    try {
      const res = await this.fetch(`api/accounts`);
      const res2 = await this.fetch(`api/thrift/targeted?id=${page.query.id}`, {
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
  let duration: any = {};
  console.log(thrift);
  try {
    if (mysession.status == "failed") goto("accounts/login");
  } catch (error) {
    console.log(error);
  }
  let payAmount = thrift.thrift_amount;

  const retrieve_Duration = async () => {
    try {
      let dur = await axios.get(
        `api/thrift/targeted/duration?id=${thrift.targetted_durationId}`
      );
      duration = dur.data;
      console.log("duration is weird", dur);
    } catch (error) {
      console.log(error);
    }
  };
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
        const thrift_tran: IthriftTranscation = {
          clientId: mysession.user.id,
          amountPaid: pay_amount,
          thriftId: thrift.id,
          paymentRef: transaction.reference,
          resolved: transaction.status == "success" ? 1 : 0,
        };
       
        handleNotification(
          "submitting transcation",
          window,
          "info",
          "loading..."
        );
        try {
          console.log({
            thrift_tran,
            trans
          });
          const resp = await axios.post("api/thrift/targeted/transcation", {
            thrift_tran,
            trans
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

  const reload =async ()=>{
    handleNotification('reloading data... ', win, 'info','loading...');
    const resp = await axios.put(`api/thrift/targeted?id=${thrift.id}`);
    console.log(resp.data);
    const data = resp.data;
    if(data.body){
      thrift = data.body;
      thrift.transcations = thrift.transcations;

      handleNotification('data reloaded!', win, 'success', 'ok');
    }

  }

  const endThrift = async () => {
    const resp = await win.ons.notification
      .confirm(`Are you sure you want to end this thrift,
    ending this thrift at the moment will enquire a cost of ${duration.over_charges  * thrift.wallet /100}`);
    console.log(resp);
    if(resp){
        handleNotification('your thrift is being proceed, your saved amount will be transferred to your wallet',
         window,'info', '');

         try {
        const resp = await  axios.put('api/thrift/targeted/transcation', thrift);
        handleNotification('cash has been transferred to your safesave wallet', win, 'success', 'Ok');
         } catch (error) {
          console.log(error);
          handleNotification('something went wrong', window, 'error', 'error');
         }
    }
  };
  const dayClick = (e) => {
    console.log(e);
  };
  let name = "Targetted Thrift";
  const openModal = () => {
    payCharm = win.Metro.charms.open("#pay");
  };

  onMount(() => {
    win = window;
    console.log(win);
    retrieve_Duration();
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
        {#if thrift.status == 1}
          <small class="fg-green">ongoing</small>
        {:else if thrift.status == 3 || thrift.status == 2}
          <small class="fg-red">finished</small>
        {:else}
          <small class="fg-blue">pending</small>
        {/if}
      </span>
      {#if thrift.status == 1}
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
                Current Thrift Balance
              </p>

              <p style="font-weight: 800;" class=" fg-white  amount">
               
                {thrift.wallet} 
                 <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span on:click={reload} class="material-icons">
                  loop
                  </span>
              </p>
              <p style="font-family: 'Concert One';">
                <small class="fg-white">Total money saved so far</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  {#if thrift.status != 3}
  <div class="col-12">
    {#if os == Eos.IOS || os == Eos.MAC}
      <button on:click={endThrift} class="button bg-green fg-white ">
        END THRIFT
      </button>
    {:else if os == Eos.ANDRIOD}
      <button
        on:click={endThrift}
        class="button button--material bg-green fg-white  "
      >
        END THRIFT</button
      >
    {:else}
      <button on:click={endThrift} class="button bg-green fg-white">
        END THRIFT</button
      >
    {/if}
  </div>
  {/if}
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
        {#if transcation.resolved == 3}
          <span class="second-action mif-checkmark fg-green" />
        {:else if transcation.resolved == 1}
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
        data-min-value=1000
        data-max-value="1000000"
        data-step=100
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
    background-color: rgba(111, 222, 105, 0.906);
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
