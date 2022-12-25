<script lang="ts">
  import { onMount } from "svelte";
  import BottomNav from "../../../Components/BottomNav.svelte";
  import TopNav from "../../../Components/TopNav.svelte";
  import { Epage } from "../../../properties/shared";
  const page = Epage.CONTRIBUTION;
  let win: any = {};
  let cal: any = {};
  const dayClick = (e) => {
    console.log(e);
  };
  let name = "Daily Thrift";
  onMount(() => {
    win = window;
    let ele = document.getElementById("calendar");
    let opts = { abbrYear: false, onDayClick: dayClick };
    cal = new win.calendar(ele, opts);
  });
</script>
<TopNav {name}></TopNav>
<BottomNav {page} />
<div class="container-fluid pb-5">
  <div class="row mb-4">
    <div class="col-12">
      <div class="card daily">
        <div class="card__content ">
          <div class="row p-5">
            <div class="col-3 pt-4">
              <ion-icon class="icon" name="wallet-outline" />
            </div>
            <div class="col-9">
              <p class="text-sm fg-white" style="font-family: 'Concert One';">Daily Contribution Balance</p>
              <p
                style="font-weight: 800;"
                class=" fg-white  amount"
              >
                ₦5,000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div id="calendar" />
</div>



<style>
  .daily {
    background-color: rgba(197, 133, 36, 0.906);
    background-image: url(/images/dashboard/bg-1.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right center;
  }
  .amount{
    font-family: 'Concert One';
    font-size: 30px;
  }
</style>
