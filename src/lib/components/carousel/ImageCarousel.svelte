<script lang="ts">
    import { onMount } from "svelte";
    
    let { images } = $props();
    let current = $state(0);

    function nextImg() {
      current = (current + 1) % images.length;
    }

    function prevImg() {
        current = (current - 1 + images.length) % images.length;
    }

    // auto image scrolling, every 3000ms
    onMount(() => {
      const interval = setInterval(nextImg, 3000);
      return () => clearInterval(interval);
    });

</script>

