<script lang="ts">
  import { onMount } from "svelte";
  import BottomNav from "../../Components/BottomNav.svelte";
import TopNav from "../../Components/TopNav.svelte";
  import { Epage } from "../../properties/shared";
  const name = "Thrifts";
  const page = Epage.CONTRIBUTION;


</script>
<TopNav {name}/>
<BottomNav {page}></BottomNav>
<div  class="container-fluid mt-4 pb-5">
    <div class="row">
        <div class="col-12 col-sm-6">
            <div class="card">
                <div class="card__content mt-4 ml-2 mr-2 text-center">
                    <div>
                        <span class="material-icons icon fg-pink">
                            savings
                            </span>
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
                        <span class="material-icons icon fg-green">
                            account_balance
                            </span>
                    </div>
                    <p class="title">Targeted Thrift</p>
                    <p><small>save every day with us</small></p>

                    <p><a href="/savings/daily">tap to view</a></p>

                </div>
              </div>
        </div>

    </div>

 <p>a publish a rapist</p>

 <p>a publish a rapist</p>

 <p>a publish a rapist</p>

 <p>a publish a rapist</p>

 <p>a publish a rapist</p>

 <p>a publish a rapist</p>

 <p>a publish a rapist</p>

 <p>a publish a rapist</p>

</div>

<style>
    .title{
        font-family: 'Concert One', cursive;
        font-weight: 600;
        font-size: large;
    }
    .icon{
        font-size: 60px;
    }
</style>