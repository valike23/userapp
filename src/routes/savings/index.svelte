<script context="module">
  export async function preload(page, session) {
    let mysession = {};
    try {
      const res = await this.fetch(`api/accounts`);
      mysession = await res.json();
    } catch (error) {
      console.log(error);
      mysession = {};
    }

    return { mysession };
  }
</script>

<script lang="ts">
  import BottomNav from "../../Components/BottomNav.svelte";
  import TopNav from "../../Components/TopNav.svelte";
  import { goto } from "@sapper/app";
  import { Epage } from "../../properties/shared";
  const name = "Thrifts";
  const page = Epage.CONTRIBUTION;
  export let mysession;

  try {
    if (mysession.status == "failed") goto("accounts/login");
  } catch (error) {
    console.log(error);
  }
</script>

<TopNav {name} />
<BottomNav {page} />
<div class="container-fluid mt-4 pb-5">
  <div class="row">
    <div class="col-12 col-sm-6">
      <div class="card">
        <div class="card__content mt-4 ml-2 mr-2 text-center">
          <div>
            <span class="material-icons icon fg-pink"> savings </span>
          </div>
          <p class="title">Daily Thrift</p>
          <p><small>save every day with us</small></p>

          <p><a href="/savings/daily/all">tap to view</a></p>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6">
      <div class="card">
        <div class="card__content mt-4 ml-2 mr-2 text-center">
          <div>
            <span class="material-icons icon fg-green"> account_balance </span>
          </div>
          <p class="title">Targeted Thrift</p>
          <p><small>save every day with us</small></p>

          <p><a href="/savings/targetted">tap to view</a></p>
        </div>
      </div>
    </div>

    <div class="col-12 col-sm-6">
      <div class="card">
        <div class="card__content mt-4 ml-2 mr-2 text-center">
          <div>
            <span class="material-icons icon fg-blue"> lock </span>
          </div>
          <p class="title">Fixed Thrift</p>
          <p><small>Earn 15% interest on your savings</small></p>

          <p><a href="/savings/fixed">tap to view</a></p>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6">
      <div class="card">
        <div class="card__content mt-4 ml-2 mr-2 text-center">
          <div>
            <span class="material-icons icon fg-red">
              currency_exchange
               </span>
          </div>
          <p class="title">Super-Save Contribution</p>
          <p><small>Contribute over a giving time and carry</small></p>

          <p><a href="/savings/contribution">tap to view</a></p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .title {
    font-family: "Concert One", cursive;
    font-weight: 600;
    font-size: large;
  }
  .icon {
    font-size: 60px;
  }
</style>
