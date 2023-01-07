<script lang="ts">
  import BottomNav from "../../../Components/BottomNav.svelte";
  import Fab from "../../../Components/FAB.svelte";
  import LinkButton from "../../../Components/LinkButton.svelte";
  import TopNav from "../../../Components/TopNav.svelte";
  import { Epage } from "../../../properties/shared";
  const name = "all Thrifts";
  const page = Epage.CONTRIBUTION;
  let activeScreen = "all";

  const switchScreen = (screen) => {
    activeScreen = screen;
  };
</script>

<svelte:head>
  <title>All Daily Thrift</title>
</svelte:head>

<TopNav {name} />
<BottomNav {page} />

<div class="container-fluid pb-5">
  <h3>All Daily Thrift</h3>
  <div class="text-center">
    <button
      on:click={() => {
        switchScreen("all");
      }}
      class:bg-blue={activeScreen == "all"}
      class="btn btn-sm pl-2 pr-2 ml-2 mr-2">all</button
    >

    <button
      on:click={() => {
        switchScreen("active");
      }}
      class:bg-blue={activeScreen == "active"}
      class="btn btn-sm ml-2 mr-2">active</button
    >

    <button
      on:click={() => {
        switchScreen("closed");
      }}
      class:bg-blue={activeScreen == "closed"}
      class="btn btn-sm ml-2 mr-2">closed</button
    >
  </div>


  <div class="row">
    <div class="col-12 col-sm-6 ">
        <div class="card">
            <div class="card__content">
                <p><small>December, 2022</small></p>
                <p>₦5,000</p>
                <p><small class="fg-green">finished</small></p>
                <div class="text-center">
                    <LinkButton color="bg-blue fg-white" link="savings/daily" text="view"></LinkButton>
                </div>
            </div>
        </div>
       
    </div>
    <div class="col-12 col-sm-6 ">
        <div class="card">
            <div class="card__content">
                <p><small>December, 2022</small></p>
                <p>₦5,000</p>
                <p><small class="fg-green">finished</small></p>
                <div class="text-center">
                    <LinkButton color="bg-blue fg-white" link="savings/daily" text="view"></LinkButton>
                </div>
            </div>
        </div>
       
    </div>
  </div>
</div>

<Fab
  page="savings/daily/application"
  color="bg-blue fg-white"
  text="<span class='material-icons'>add</span>"
/>

<style>
  .bg-blue {
    color: white;
    border: none;
  }
</style>
