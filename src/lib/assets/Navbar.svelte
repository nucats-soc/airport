<script>
    import Button from "$lib/assets/Button.svelte";
</script>

<!-- 900px w navbar, nucats logo and text left, buttons right -->
<div class="flex items-center justify-between p-4 text-white max-w-225 mx-auto">
    <!-- logo -->
    <div class="flex items-center space-x-2">
        <img src="/nucats.svg" alt="NuCats Logo" width="48" height="48" />
        <span class="text-2xl font-bold">NUCATS</span>
    </div>
    <!-- buttons -->
    <div class="flex space-x-4">
        <!-- all these buttons will show errors, just bc they dont have all values from Button.svelte -->
        <Button value="Home" type="secondary" onClick={() => console.log("Home clicked")} />
        <Button value="Committee" type="secondary" onClick={() => console.log("Committee clicked")} />
        <Button value="Events" type="secondary" onClick={() => console.log("Events clicked")} />
        <Button value="Sponsors" type="secondary" onClick={() => console.log("Sponsors clicked")} />
    </div>
</div> 