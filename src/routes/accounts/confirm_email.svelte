<script context="module">
  export async function preload(page, session) {
    let { email } = page.query;

    return { email };
  }
</script>

<script lang="ts">
  export let email;
  import Button from "../../Components/Button.svelte";
  import TopNav from "../../Components/TopNav.svelte";
  import { goto } from "@sapper/app";
  import axios from "axios";
  import { handleNotification } from "../../properties/client";
  import { onMount } from "svelte";

  let loading = false;
  let otp = "";
  let win: any = {};
  const resendOTP = async () => {
    try {
      handleNotification("sending OTP...", window, "info", "OTP");
      const resp = await axios.put("api/accounts/token", { email });
      if (resp) {
        console.log("resp", resp);
        handleNotification('check your mail to retrieve the OTP', window, 'success','ok')
      }
    } catch (error) {
        console.error(error);
        handleNotification('something went wrong', window, 'error','error');
    }
  };
  const confirmEmail = async () => {
    otp = win.Metro.getPlugin("#key", "keypad").val();
    let body = { otp, email };
    console.log(body);

    if (body.email && body.otp) {
      loading = true;
      try {
        const resp = await axios.patch("api/accounts", body);
        if (resp.data.status == "success") {
          handleNotification(
            "email has been confirmed",
            window,
            "success",
            "success"
          );
          goto("accounts/login");
        } else {
          loading = false;
          handleNotification(resp.data.msg, window, "error", "error");
        }
      } catch (error) {
        console.log(error);
        handleNotification("something went wrong", window, "error", "error");
        loading = false;
      }
    } else {
      handleNotification("provide OTP", window, "error", "error");
    }
  };
  onMount(() => {
    win = window;
  });
</script>

<TopNav name="confirm email" />
<div class="container">
  <div class="row">
    <div class="col">
      <h3>verify email</h3>
      <p>enter six digit pin sent to {email}</p>
      <p>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={resendOTP} class="button link">Resend OTP</a>
      </p>
      <div >
        <div class="mt-6">
          <input
            type="text"
            id="key"
            data-key-size="70"
            data-role="keypad"
            placeholder="Enter 6 digits pin"
            data-key-length="6"
          />
        </div>
      
        <form class="mt-5 pt-3" on:submit={confirmEmail}>
          {#if !loading}
            <Button
           
              text="submit"
              type="submit"
              size="large"
              color="bg-green fg-white"
            />
          {:else}
            <Button
              text="submiting..."
              disabled
              type="submit"
              size="large"
              color="bg-green fg-white"
            />
          {/if}
        </form>
    </div>
    </div>
  </div>
</div>

<style>
  input {
    font-size: larger;
    height: 40px;
  }
</style>
