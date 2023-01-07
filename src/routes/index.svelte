<script lang="ts">
  import { onMount } from "svelte";
  import BottomNav from "../Components/BottomNav.svelte";
  import { Epage } from "../properties/shared";
  import { goto } from "@sapper/app";
  import Loader from "../Components/Loader.svelte";
  import type { Iuser } from "../Model/accounts";
  import type { IgatewayTranscation } from "./api/transcation/gateway";
  let win: any = {};
  let screen = false;
  let user: Iuser = {};
  const logout = () => {
    goto("accounts/login");
  };
  onMount(() => {
    win = window;
    if(sessionStorage.getItem("safesave_token")){
      screen = true;
      user = JSON.parse(sessionStorage.getItem("safesave_users"));
    
    }
    else{
      goto('accounts/login');
    }
    const splide = new win.Splide(".splide", {
      type: "loop",
      perPage: 1,
      arrows: false,
      pagination: false,
    }).mount();
  });

  const testAlert = () => {
    win.ons.notification.alert("This dialog was created with ons.notification");
  };
  const debitCardModal = async () => {
    let res = await win.ons.notification.confirm(
      "Note: A fee of ₦50 will be charged from your card. Ensure the card is yours"
    );
    if (res) {
      const paystack = new win.PaystackPop();
      paystack.newTransaction({
        key: user.email,
        amount: 50 * 100,
        channel: "card",

        onSuccess: (transaction) => {
          console.log(transaction);
          const trans: IgatewayTranscation ={
            
          }
        },
      });
    }
  };
  const page = Epage.HOME;
</script>

<div class="container-fluid" style="overflow-y: scroll;">
  <header class="row mt-4">
    <div class="col-7">
      <span class="h1-header mr-4">{user.first_name || ''}</span>
      <span id="dropdown_toggle_1" class="material-icons">
        account_circle
      </span>

      <div
        style="position: absolute; z-index:10000;  "
        class="bg-red fg-white "
        data-role="dropdown"
        data-toggle-element="#dropdown_toggle_1"
      >
        <ul style="width: 100%;" class="list">
          <li class="list-item">
            <div class="list-item__left">
              <span class="material-icons"> manage_accounts </span>
            </div>

            <div class="list-item__center">
              <div class="list-item__title">settings</div>
            </div>
          </li>
          <li class="list-item">
            <div class="list-item__left">
              <span class="material-icons"> credit_card </span>
            </div>

            <div class="list-item__center">
              <div class="list-item__title">manage cards</div>
            </div>
          </li>

          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li on:click={logout} class="list-item">
            <div class="list-item__left">
              <span class="material-icons"> logout </span>
            </div>

            <div class="list-item__center">
              <div class="list-item__title">log out</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-5 text-right">
      <span id="dropdown_toggle" class="material-icons">
       notifications
      </span>
    </div>
  </header>
  <section class="splide" aria-labelledby="carousel-heading">
    <div class="splide__track">
      <ul class="splide__list">
        <li class="splide__slide">
          <div class="card wallet">
            <div class="card__content ">
              <div class="row p-5">
                <div class="col-3 pt-4">
                  <i class="icon mif-money" />
                </div>
                <div class="col-9">
                  <p class="text-sm fg-white">Wallet Balance</p>
                  <p
                    style="font-weight: 700;"
                    class=" fg-white bold-text text-light"
                  >
                    ₦5,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="splide__slide">
          <div class="card daily">
            <div class="card__content ">
              <div class="row p-5">
                <div class="col-3 pt-4">
                  <ion-icon class="icon" name="wallet-outline" />
                </div>
                <div class="col-9">
                  <p class="text-sm fg-white">Thrift Balance</p>
                  <p
                    style="font-weight: 700;"
                    class=" fg-white bold-text text-light"
                  >
                    ₦5,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="splide__slide">
          <div class="card investment">
            <div class="card__content ">
              <div class="row p-5">
                <div class="col-3 pt-4">
                  <i class="icon mif-coins" />
                </div>
                <div class="col-9">
                  <p class="text-sm fg-white">Investment Balance</p>
                  <p
                    style="font-weight: 700;"
                    class=" fg-white bold-text text-light"
                  >
                    ₦5,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <section id="quick-action">
    <h2 class="title"><strong>quick action</strong></h2>
    <div class="row">
      <div class="col-6 col-md-3">
        <div class="card fg-white bg-red">
          <span class="material-icons"> savings </span><br />
          <p><strong>Start Thrift</strong></p>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card fg-white bg-blue">
          <span class="material-icons "> monetization_on </span> <br />
          <p><strong>Investment Plans</strong></p>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card bg-green fg-white">
          <span class="material-icons"> phone </span> <br />
          <p><strong>Data & Airtime</strong></p>
        </div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={testAlert} class="col-6 col-md-3">
        <div class="card fg-white bg-black">
          <span class="material-icons"> payments </span> <br />
          <p><strong>Bill Payment</strong></p>
        </div>
      </div>
    </div>
  </section>
  <section id="referral">
    <div class="card bg-green">
      <div class="card_content" />
    </div>
  </section>

  <section id="task" class="mt-3">
    <h2 class="title"><strong>To Do list</strong></h2>
    <div class="card">
      <div
        on:click={debitCardModal}
        on:keypress={debitCardModal}
        class="card_content row"
      >
        <div class="col-2">
          <span class="material-icons"> radio_button_unchecked </span>
        </div>
        <div class="col-10">
          <strong class="mb-3 mr-2">add debit card</strong>
        </div>
      </div>
    </div>
  </section>
</div>

<BottomNav {page} />

<style>
  .title {
    font-size: 0.825rem;
    font-weight: 600;
  }
  .icon {
    font-size: 32px;
    color: white;
  }
  .bold-text {
    font-size: 1.5rem;
  }
  .text-sm {
    font-size: 0.875rem;
  }
  .wallet {
    background-color: rgb(13, 96, 216);
    background-image: url(/images/dashboard/bg-1.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right center;
  }
  .daily {
    background-color: rgb(121, 19, 229);
    background-image: url(/images/dashboard/bg-1.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right center;
  }
  .investment {
    background-color: green;
    background-image: url(/images/dashboard/bg-1.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right center;
  }
  .h1-header {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .header-icon {
    font-size: large;
  }
</style>
