<script lang="ts">
  import { onMount } from "svelte";
  import BottomNav from "../Components/BottomNav.svelte";
  import { Epage } from "../properties/shared";
  let win : any= {};
  onMount(() => {
    win = window;
    const splide = new win.Splide(".splide", {
      type: "loop",
      perPage: 1,
      arrows: false,
      pagination: false,
    }).mount();
  });

  const testAlert =()=>{
    win.ons.notification.alert('This dialog was created with ons.notification');
  }
  const page = Epage.HOME;
</script>

<div class="container-fluid" style="overflow-y: scroll;">
<header class="row mt-4">
  <div class="col-10">
    <h1 class="h1-header">Mike</h1>
  </div>
  <div class="col-2 text-right">
    <ion-icon class="header-icon" name="person-outline"></ion-icon>
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
                  <p class="text-sm fg-white">Daily Contribution Balance</p>
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
    <h2 class="title">quick action</h2>
    <div class="row">
      <div class="col-6 col-md-3">
        <div class="card">
          <ion-icon name="cash-outline" /> <br />
          <p><strong>withdraw</strong></p>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card">
          <ion-icon name="cash-outline" /> <br />
          <p><strong>withdraw</strong></p>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card">
          <ion-icon name="cash-outline" /> <br />
          <p><strong>withdraw</strong></p>
        </div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={testAlert} class="col-6 col-md-3">
        <div class="card">
          <ion-icon name="cash-outline" /> <br />
          <p><strong>withdraw</strong></p>
        </div>
      </div>
    </div>
  </section>

  <div  class="mt-5 mb-5">there is a content here</div>
  <div class="mt-5 mb-5">there is a content here</div>
  <div class="mt-5 mb-5">there is a content here</div>
  <div class="mt-5 mb-5">there is a content here</div>
  <div class="mt-5 mb-5">there is a content here</div>
  <div class="mt-5 mb-5">there is a content here</div>
  <div class="mt-5 mb-5">there is a content here</div>
  <div class="mt-5 mb-5">there is a content2 here</div>
</div>

<BottomNav {page}/>

<style>
  .title {
    font-size: 0.825rem;
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
    background-image: url(/static/media/bg-pattern.8efb1209.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right center;
  }
  .investment {
    background-color: green;
    background-image: url(/static/media/bg-2.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right center;
  }
  .h1-header{
    font-size: 1.5rem;
    font-weight: 700;
  }
  .header-icon{
    font-size: large;
  }
</style>
