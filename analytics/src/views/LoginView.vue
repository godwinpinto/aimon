<script setup lang="ts">
import LandingIntro from '@/components/global/LandingIntro.vue'
import TheAuth from '@/components/auth/TheAuth.vue'

</script>
<template>
    <div className="min-h-screen bg-base-200 flex items-center">
        <div className="card mx-auto w-full max-w-5xl  shadow-xl">
            <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                    <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <TheAuth/>
                </div>
            </div>
        </div>
</div></template>