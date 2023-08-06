
<template>
    <div class="flex flex-col bg-base-300 min-h-screen">
        <div class="flex-1 flex flex-col sm:flex-row">
            <main class="flex-1  min-h-screen">
                <div class="rounded-lg shadow bg-base-200 ">
                    <div class="items-center justify-center ">
                        <RouterView />
                    </div>
                </div>


            </main>
            <nav class="order-first sm:w-1/6">
</nav>
                <nav class="order-first sm:w-1/6 fixed">

                <LeftSideBar />
            </nav>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import LeftSideBar from '@/containers/LeftSideBar.vue'

</script>
  
