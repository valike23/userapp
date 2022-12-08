<script>
  import { onMount } from "svelte";
  import BottomNav from "../Components/BottomNav.svelte";
  onMount(()=>{
    const splide = new Splide( '.splide' ,{type: 'loop', perPage: 1}).mount();
  })
</script>
<div class="container-fluid"  style="overflow-y: scroll;">
  

  <section class="splide" aria-labelledby="carousel-heading">
  
    <div class="splide__track">
      <ul class="splide__list">
        <li class="splide__slide">
          <div class="card bg-green">
            <div class="card__content ">
              <p style="font-weight: 700;" class="text-center fg-white text-700 text-light">₦5,000</p>
            </div>
          </div>
        </li>
        <li class="splide__slide">
          <div class="card bg-green">
          <div class="card__content ">
            <p style="font-weight: 700;" class="text-center fg-white text-700 text-light">₦5,000</p>
          </div>
        </div></li>
        <li class="splide__slide">
          <div class="card bg-green">
          <div class="card__content ">
            <p style="font-weight: 700;" class="text-center fg-white text-700 text-light">₦5,000</p>
          </div>
        </div></li>
      </ul>
    </div>
  </section>

    
    <div class="mt-5 mb-5"> there is a content here</div>
    <div class="mt-5 mb-5"> there is a content here</div>
    <div class="mt-5 mb-5"> there is a content here</div>
    <div class="mt-5 mb-5"> there is a content here</div>
    <div class="mt-5 mb-5"> there is a content here</div>
    <div class="mt-5 mb-5"> there is a content here</div>
    <div class="mt-5 mb-5"> there is a content here</div>
    <div class="mt-5 mb-5"> there is a content2 here</div>


</div>

<BottomNav/>


