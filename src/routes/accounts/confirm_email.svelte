
<script context="module">
	export async function preload(page, session) {
       let {email} = page.query;

		return { email };
	}
</script>

<script lang="ts">
    export let email;
  import Button from "../../Components/Button.svelte";
  import TopNav from "../../Components/TopNav.svelte";
  import {goto} from "@sapper/app";
  import axios from 'axios';
  import { handleNotification } from '../../properties/client';
  import { onMount } from "svelte";

let loading = false;
let otp = '';
let win: any ={};

const confirmEmail =async ()=>{
    otp = win.Metro.getPlugin('#key','keypad').val();
    let body ={otp, email};
    console.log(body);
    
    if(body.email && body.otp){
        loading = true;
        try {
            
        const resp = await axios.patch('api/accounts', body);
        if(resp.data.status == 'success'){
            handleNotification('email has been confirmed', window, 'success','success');
            goto('accounts/login');
        }
        else{
            loading = false;
            handleNotification(resp.data.msg, window, 'error','error');
        }
        } catch (error) {
            console.log(error);
            handleNotification('something went wrong', window, 'error','error');
            loading = false;
        }
    }
    else{
        handleNotification('provide OTP', window, 'error','error');
    }
}
onMount(()=>{
    win = window;
})
</script>

<TopNav name="confirm email"></TopNav>
<div class="container">
    <div class="row">
        <div class="col">
            <h3>verify email</h3>
            <p>enter six digit pin sent to {email}</p>
            <form on:submit|preventDefault={confirmEmail}>
                <div class="mt-6">
                    <input type="text" id="key" data-key-size="70" data-role="keypad"
                     placeholder="Enter 6 digits pin" data-key-length="6">
                </div>
                <div class="mt-5 pt-3">
                   {#if !loading}
                   <Button text="submit" type="submit" size="large" color="bg-green fg-white"></Button>
                   {:else}
                   <Button text="submiting..." disabled type="submit" size="large" color="bg-green fg-white"></Button>
                   {/if}
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    input{
        font-size: larger;
        height: 40px;
    }
</style>