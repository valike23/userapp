<script>
  import Button from "../../Components/Button.svelte";
  import TopNav from "../../Components/TopNav.svelte";

</script>

<TopNav name="confirm email"></TopNav>
<div class="container">
    <div class="row">
        <div class="col">
            <h3>verify email</h3>
            <p>enter six digit pin sent to ludike23@gmail.com</p>
            <form >
                <div class="mt-6">
                    <input type="text" data-key-size="70" data-role="keypad" placeholder="Enter 6 digits pin" data-key-length="6">
                </div>
                <div class="mt-5 pt-3">
                    <Button text="submit" type="submit" size="large" color="bg-green fg-white"></Button>
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