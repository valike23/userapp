<script lang="ts">
    let screen = "users";
</script>

<svelte:head>
    <title>SafeSave :: Register Page</title>
</svelte:head>

<div class="row">
    <div class="col d-none d-block-md image pt-5">
        <div class="mt-5 pt-5 pl-4">
            <h2 style="margin-top:40px" class="mt-4">Save Invest and Earn</h2>
        </div>
    </div>
    <div class="col">
        <div class="container">
            <div class="top">
                <img src="images/safe.png" class="logo" alt="" srcset="" />
                <h3>Register your new account</h3>
            </div>
            <div class="row text-center">
                <div class="col-4">
                    <span
                        class:active={screen == "users"}
                        class:success={screen != "users"}
                        class="mif-user icon"
                    />
                    <br /> user information
                </div>
                <div class="col-4">
                    <span
                        class:inactive={screen == "users"}
                        class:active={screen == "banking"}
                        class:success={screen == "activate"}
                        class="mif-money icon"
                    /><br /> banking details
                </div>
                <div class="col-4">
                    <span
                        class:inactive={screen != "activate"}
                        class:active={screen == "activate"}
                        class="mif-lock icon"
                    /> <br /> Account Activation
                </div>
            </div>

            {#if screen == "users"}
                <div class="mt-5 pt-4 pl-5 pr-5 scroll-y">
                    <form class=" mt-4">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input
                                required
                                id="name"
                                placeholder="name should be the same as bank account"
                                type="text"
                                class="metro-input"
                            />
                        </div>
                        <div class="form-group">
                            <label for="name">Email</label>
                            <input
                                required
                                id="email"
                                placeholder="email@email.com"
                                type="email"
                                class="metro-input"
                            />
                        </div>
                        <div class="form-group">
                            <label for="name">Phone</label>
                            <input
                                required
                                id="phone"
                                placeholder="tel: 080xxxxxxxxx"
                                type="phone"
                                class="metro-input"
                            />
                        </div>
                        <div class="form-group">
                            <label for="year">Date of Birth</label>
                            <input
                                required
                                id="date"
                                type="date"
                                class="metro-input"
                            />
                        </div>
                        <div class="form-group">
                            <label for="country">Country</label>
                            <select data-role="select" title="">
                                <optgroup label="Africa">
                                    <option selected value="NG" data-template="<img style='width:20px; margin-right:5px;' src='images/flags/nigeria.png' /> $1">Nigeria</option>
                                    <option value="GH" data-template="<img style='width:20px; margin-right:5px;' src='images/flags/ghana.png' /> $1">Ghana</option>
                                    <option value="ZA" data-template="<img style='width:20px; margin-right:5px;' src='images/flags/south-africa.png' /> $1">South Africa</option>
                                    
                                </optgroup>
                                <optgroup label="Others">
                                    
                                    <option value="UK" data-template="<img style='width:20px; margin-right:5px;' src='images/flags/united-kingdom.png' /> $1">United Kingdom</option>
                                    <option value="US" data-template="<img style='width:20px; margin-right:5px;' src='images/flags/united-states.png' /> $1">United States</option>
                                    <option value="CA" data-template="<img style='width:20px; margin-right:5px;' src='images/flags/canada.png' /> $1">Canada</option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                            placeholder="*********"
                                required
                                minlength="8"
                                id="password"
                                type="password"
                                class="metro-input"
                            />
                        </div>
                        <div class="mt-3">
                            <button type="submit" class="button primary">submit</button>
                        </div>
                    </form>
                </div>
            {:else if screen == "banking"}
                <!-- else if content here -->
            {:else}
                <!-- else content here -->
            {/if}
        </div>
    </div>
</div>

<style>
    .scroll-y {
        overflow-y: auto;
        margin-bottom: 20px;
    }
    input {
        padding-left: 10px;
    }
    .image {
        background-image: url("images/market_woman.jpg");
        height: 100vh;
        background-size: cover;
    }
    h2 {
        color: white;
        font-family: "Manrope", sans-serif;
        font-weight: 600;
    }
    .top {
        text-align: center;
        margin-top: 4rem;
    }
    
    .logo {
        height: 60px;
    }
    h3 {
        font-weight: 500;
        color: rgb(68, 172, 233);
    }
    .icon {
        font-size: x-large;
        border-radius: 50%;
        padding: 10px;
    }
    .inactive {
        background-color: gray;
        color: white;
    }
    .active {
        background-color: blue;
        color: white;
    }
    .success {
        background-color: green;
        color: white;
    }
</style>
