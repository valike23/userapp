<script lang="ts">
  import { onMount } from "svelte";
  import type { Iuser } from "../../Model/accounts";
  import axios from "axios";
  import { getOS, handleNotification } from "../../properties/client";
  import { goto } from "@sapper/app";
  let disabled = false;
  let user: Iuser = {};
  const submit = async () => {
    try {
      disabled = true;
      const resp = await axios.put("api/accounts", user) as unknown as any;
      console.log(resp);
      sessionStorage.setItem('safesave_users', JSON.stringify(resp.data.respBody));
      sessionStorage.setItem('safesave_token', resp.data.token);
      handleNotification("success", window, "success", "ok");
      disabled = false;
      goto("/");
    } catch (error) {
      handleNotification(
        error.response.data.response.text,
        window,
        "error",
        "error"
      );
      disabled = false;
      console.log(error);
    }
  };

  let os = "";
  onMount(() => {
    os = getOS();
  });
</script>

<svelte:head>
  <title>SafeSave :: Register Page</title>
</svelte:head>

<main>
  <div class="login-page pt-5">
    <div class="form">
      <form on:submit|preventDefault={submit} class="login-form">
        <div class="text-center">
          <img src="images/safesave-logo/cover.png" alt="">
        </div>
        <p class="text-center mb-4">Login into safesave</p>
        <input
          bind:value={user.email}
          required
          type="email"
          placeholder="Email Address"
        />
        <input
          bind:value={user.password}
          required
          type="password"
          placeholder="password"
        />
        <button {disabled} type="submit"
          >{disabled ? "loggin in" : "login"}</button
        >
        <p class="message">
          Not registered? <a href="accounts/register">Create an account</a>
        </p>
        <p class="message">
          <a href="accounts/forgot">forgot password?</a>
        </p>
      </form>
    </div>
  </div>
</main>

<style>
  main {
    background-image: url('images/savings.jpeg');
    height: 100vh;
    background-size:cover;
    background-position: center;
  background-repeat: no-repeat;
    background-repeat: none;
  }
  .login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
  }
  .form {
    position: relative;
    z-index: 1;
    background: #ffffff;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #4caf50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  .form button:hover,
  .form button:active,
  .form button:focus {
    background: #43a047;
  }
  .form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
  }
  .form .message a {
    color: #4caf50;
    text-decoration: none;
  }
  .form .register-form {
    display: none;
  }
</style>
