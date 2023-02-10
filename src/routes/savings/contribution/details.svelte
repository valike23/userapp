<script context="module">
	export async function preload(page, session) {
	let mysession ={};
  let contribution = {clients: []};
try {
  
  const res = await this.fetch(`api/accounts`);
  const res2 = await this.fetch(`api/thrift/contribution?id=${page.query.id}`);

  const data = await res2.json();
  contribution = data;
  if(contribution == undefined) contribution = {clients: []};
  if(!contribution.clients) contribution = {clients: []};
		 mysession = await res.json();
} catch (error) {
  console.log(error);
  mysession ={};
  contribution = {clients: []};
}

		return { mysession , contribution};
	}
</script>

<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import BottomNav from "../../../Components/BottomNav.svelte";
import TopNav from "../../../Components/TopNav.svelte";
  import { handleNotification } from "../../../properties/client";
  import { Egateway, Epage } from "../../../properties/shared";
  import type { IcontributionTranscation, IgatewayTranscation, IthriftTranscation } from "../../api/transcation/gateway";
const page = Epage.CONTRIBUTION;
const name = 'contrubution details';
let win: any = {};
let payCharm: any = {};
export let mysession: any ={}, contribution : any= {clients: []};
let payAmount = contribution.amount/ contribution.clients;
console.log('contributions', contribution)
try {
    if (mysession.status == "failed") goto("accounts/login");
  } catch (error) {
    console.log(error);
  }
  const openModal = async () => {
   const data = await  win.ons.notification.prompt("enter amount in NGN");
   console.log('result', data);
   if(!data) return win.ons.notification.alert("you need to enter a value");
   if(isNaN(data)) return win.ons.notification.alert("you need to enter a number");
   payAmount = data;
   pay();
  };

const pay = () => {
    let data = document.getElementById("payAmount");
    
    console.log("agression", payAmount);
    win.Metro.charms.close("#pay");
    const paystack = new win.PaystackPop();
    paystack.newTransaction({
      key: "pk_test_4db756d3f9f36402bfb91a78937fc4d48c4d8047",
      amount: payAmount * 100,
      email: mysession.user.email,

      onSuccess: async (transaction) => {
        console.log(transaction);
        const trans: IgatewayTranscation = {
          user_id: mysession.user.id,
          reference: transaction.reference,
          gateway: Egateway.PAYSTACK,
          message: transaction.message,
          status: transaction.status,
          amount: payAmount,
        };
        const con: IcontributionTranscation = {
          clientId: mysession.user.id,
          amountPaid: payAmount,
          contributionId: contribution.id,
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
            con,
            trans
          });
          const resp = await axios.post("api/thrift/contribution/trans", {
            con,
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

  onMount(()=>{
    win = window;
    console.log(win);
  })





</script>


<TopNav {name}></TopNav>
<BottomNav {page}></BottomNav>

<div class="container-fluid pb-5">


    <div>
        Pay your dues:
        <button on:click={openModal} class="button float-right">pay</button>
      
    </div>
    <div class="mt-3"> <h3>Participants</h3></div>
    <ul class="list">
      {#each contribution.clients as client}
      <li class="list-item">
        <div class="list-item__left">
          <img class="list-item__thumbnail" src={client.user.profile_pics || "https://placekitten.com/g/40/40"} alt="Cute kitten">
        </div>
    
        <div class="list-item__center">
          <div class="list-item__title">{client.user.first_name + " " + client.user.last_name}</div>
          <div class="list-item__subtitle">slot: {client.client_contributions.ballot_month + 1}</div>
        </div>
      </li>
      {/each}
     
      
     
      </ul>

 <div class="mt-3"> <h3>Transcations</h3></div>

 <table class="table striped row-hover">
    <thead>
    <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th >Username</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td>Bill</td>
        <td>Gates</td>
        <td>@billy</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Steve</td>
        <td>Jobs</td>
        <td>@stevy</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Larry</td>
        <td>Page</td>
        <td>@larry</td>
    </tr>
    </tbody>
</table>

   
</div>

<style>
    h3 {
        font-family: "Concert One", cursive;
        font-size: 20px;
    }
</style>