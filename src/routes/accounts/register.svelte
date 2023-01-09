<script lang="ts">
  import { onMount } from "svelte";
  import type { Iuser } from "../../Model/accounts";
  import { getOS } from "../../properties/client";
let user:Iuser = {};
let confirm ='';
let loading = false;
  const submit = () => {
    if(confirm && confirm == user.password) {
      
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
  <div class="login-page">
    <div class="form">
      <form on:submit|preventDefault={submit} class="register-form">
        <div class="text-center">
          <img src="images/safesave-logo/cover.png" alt="">
        </div>
        <input bind:value={user.full_name} minlength="8" required type="text" placeholder="full name"/>
        <input bind:value={user.email} required type="email" placeholder="email address"/>
        <input bind:value={user.phone} required type="tel" placeholder="phone number"/>
        
        <input bind:value={user.password} required type="password" placeholder="password"/>
        <input bind:value={confirm} required type="password" placeholder="confirm password"/>
        <button type="submit">create</button>
        <p class="message">Already registered? <a href="accounts/login">Sign In</a></p>
      </form>
     
    </div>
  </div>
</main>



  <style>
  main{
    background-image: url('images/piggy.jpeg');
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
  background: #FFFFFF;
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
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}



  </style>