<script lang="ts">
  import { onMount } from "svelte";
  import BottomNav from "../../Components/BottomNav.svelte";
  import TopNav from "../../Components/TopNav.svelte";
  import { Epage } from "../../properties/shared";
  const page = Epage.CONTRIBUTION;
  let win: any = {};
  let cal: any = {};
  const dayClick = (e) => {
    console.log(e);
  };
  let name = "Daily Contribution";
  onMount(() => {
    win = window;
    let ele = document.getElementById("calendar");
    let opts = { abbrYear: false, onDayClick: dayClick };
    cal = new win.calendar(ele, opts);
  });
</script>
<TopNav {name}></TopNav>
<div class="row mb-4">
  <div class="col-12">
    <div>
      <div class="card daily">
        <div class="card__content">total contribution</div>
      </div>
    </div>
  </div>
</div>

<div id="calendar" />

<BottomNav {page} />

<style>
  .daily {
    background-color: rgba(197, 133, 36, 0.906);
    background-image: url(/images/dashboard/bg-1.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right center;
  }
</style>
