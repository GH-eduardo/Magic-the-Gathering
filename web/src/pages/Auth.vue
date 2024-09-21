<script setup lang="ts">

</script>

<template>
    <div class="d-flex w-100 h-100">
        <div id="image-container" class="w-66 h-100">

        </div>
        <div class="w-33 d-flex justify-center align-center">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
    #image-container {
        background-image: url("https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2023/07/The-Lord-Of-The-Rings-Heroes-Of-Middle-Earth-Fwllowship-Artwork.jpg");
        background-position: center;
        background-size: cover;
    }
</style>