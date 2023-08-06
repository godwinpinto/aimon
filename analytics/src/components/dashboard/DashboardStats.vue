<script setup lang="ts">
import { ChartPieIcon } from '@heroicons/vue/24/outline'
import axios from 'axios';
import { onMounted, ref } from 'vue';


interface Stats {
    users: number
    visits: number
    paste: number
    cutCopy: number
}

const stats = ref<Stats>({
    users: 0,
    visits: 0,
    paste: 0,
    cutCopy: 0
})

const fetchData = async () => {
    try {
        const response = await axios.get("/api/stats"); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const data = response.data;
        if (data && data.length > 0) {
            stats.value = {
                users: data[0].total_users,
                visits: data[0].total_visit,
                paste: data[0].total_paste,
                cutCopy: data[0].total_cut_copy

            }
        } else {
            stats.value = {
                users: 0,
                visits: 0,
                paste: 0,
                cutCopy: 0
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

onMounted(() => {
    fetchData();
    const intervalId = setInterval(() => {
        fetchData();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    // Clean up the timer on component unmount
    return () => clearInterval(intervalId);
});

</script>
<template>
    <div class="stats shadow">
        <div class="stat">
            <div class="stat-figure w-10 h-10">
                <svg id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" fill="currentColor"
                    viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                        <path
                            d="M64,42c-13.2,0-24,10.8-24,24s10.8,24,24,24s24-10.8,24-24S77.2,42,64,42z M64,82c-8.8,0-16-7.2-16-16s7.2-16,16-16   s16,7.2,16,16S72.8,82,64,82z" />
                        <path
                            d="M64,100.8c-14.9,0-29.2,6.2-39.4,17.1l-2.7,2.9l5.8,5.5l2.7-2.9c8.8-9.4,20.7-14.6,33.6-14.6s24.8,5.2,33.6,14.6l2.7,2.9   l5.8-5.5l-2.7-2.9C93.2,107.1,78.9,100.8,64,100.8z" />
                        <path d="M97,47.9v8c9.4,0,18.1,3.8,24.6,10.7l5.8-5.5C119.6,52.7,108.5,47.9,97,47.9z" />
                        <path
                            d="M116.1,20c0-10.5-8.6-19.1-19.1-19.1S77.9,9.5,77.9,20S86.5,39.1,97,39.1S116.1,30.5,116.1,20z M85.9,20   c0-6.1,5-11.1,11.1-11.1s11.1,5,11.1,11.1s-5,11.1-11.1,11.1S85.9,26.1,85.9,20z" />
                        <path d="M31,47.9c-11.5,0-22.6,4.8-30.4,13.2l5.8,5.5c6.4-6.9,15.2-10.7,24.6-10.7V47.9z" />
                        <path
                            d="M50.1,20C50.1,9.5,41.5,0.9,31,0.9S11.9,9.5,11.9,20S20.5,39.1,31,39.1S50.1,30.5,50.1,20z M31,31.1   c-6.1,0-11.1-5-11.1-11.1S24.9,8.9,31,8.9s11.1,5,11.1,11.1S37.1,31.1,31,31.1z" />
                    </g>
                </svg>
            </div>
            <div class="stat-title dark:text-slate-300">Users</div>
            <div class="stat-value dark:text-slate-300 text-white">{{ stats.users }}</div>
            <div class="stat-desc">Active today</div>
        </div>
    </div>
    <div class="stats shadow">
        <div class="stat">
            <div class="stat-figure w-10 h-10">
                <svg id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" fill="currentColor"
                    viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                        <path
                            d="M64,126c34.2,0,62-27.8,62-62S98.2,2,64,2S2,29.8,2,64S29.8,126,64,126z M16,88.7l25.2-0.2c2.8,10.1,7.5,19.9,13.9,28.7   C38,114.4,23.7,103.5,16,88.7z M47.6,47H79c2.3,11,2.3,22.3,0.2,33.3l-31.6,0.2C45.3,69.4,45.3,58,47.6,47z M63.3,114.9   c-6.3-8.1-10.9-17-13.7-26.4l27.5-0.2C74.2,97.7,69.6,106.7,63.3,114.9z M71.3,117.5c6.6-9,11.3-18.9,14.1-29.3l26.9-0.2   C104.5,103.7,89.3,115,71.3,117.5z M118,64c0,5.6-0.9,11-2.4,16l-28.3,0.2c2-11,1.9-22.2-0.2-33.2h28.1C117,52.3,118,58.1,118,64z    M111.8,39H85.2c-2.9-10-7.5-19.7-13.9-28.5C89,12.9,103.9,23.8,111.8,39z M76.9,39H49.7c2.9-9.2,7.4-17.9,13.6-25.9   C69.5,21.1,74,29.8,76.9,39z M55.1,10.8C48.8,19.5,44.2,29,41.4,39H16.2C23.9,24.3,38.1,13.6,55.1,10.8z M39.5,47   c-2.1,11.1-2.1,22.4-0.1,33.5l-26.7,0.2C10.9,75.4,10,69.8,10,64c0-5.9,1-11.7,2.8-17H39.5z" />
                    </g>
                </svg>
            </div>
            <div class="stat-title dark:text-slate-300">Visits today</div>
            <div class="stat-value dark:text-slate-300 text-white">{{ stats.visits }}</div>
            <div class="stat-desc">Total Visits</div>
        </div>
    </div>
    <div class="stats shadow">
        <div class="stat">
            <div class="stat-figure w-10 h-10">
                <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 32 32" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M29.1,2H7A1,1,0,0,0,6,3V6H3A1,1,0,0,0,2,7V29a1,1,0,0,0,1,1H25a1,1,0,0,0,1-1V26h3.1a1,1,0,0,0,1-1V3A1,1,0,0,0,29.1,2ZM24,28H4V8H24Zm4.1-4h-2V7a1,1,0,0,0-1-1H8V4H28.1Z" />
                    <path d="M6.1,13a1,1,0,0,0,1,1H21a1,1,0,0,0,0-2H7.1A1,1,0,0,0,6.1,13Z" />
                    <path d="M21,17H7.1a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z" />
                    <path d="M21,22H7.1a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z" />
                </svg>
            </div>
            <div class="stat-title dark:text-slate-300">Paste Events</div>
            <div class="stat-value dark:text-slate-300 text-white">{{ stats.paste }}</div>
            <div class="stat-desc">Events today</div>
        </div>
    </div>
    <div class="stats shadow">
        <div class="stat">
            <div class="stat-figure w-10 h-10">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <title />
                    <g data-name="trim, cut, copy, tool, rotate, reflect, editing"
                        id="trim_cut_copy_tool_rotate_reflect_editing">
                        <path d="M16,2a1,1,0,0,0-1,1V29a1,1,0,0,0,2,0V3A1,1,0,0,0,16,2Z" />
                        <path d="M29,6H20a1,1,0,0,0-1,1V25a1,1,0,0,0,1,1h9a1,1,0,0,0,1-1V7A1,1,0,0,0,29,6ZM28,24H21V8h7Z" />
                        <path d="M12,6H3A1,1,0,0,0,2,7V25a1,1,0,0,0,1,1h9a1,1,0,0,0,1-1V7A1,1,0,0,0,12,6ZM11,24H4V8h7Z" />
                        <path
                            d="M22.79,18.71a1,1,0,0,0,1.42,0l2-2a1,1,0,0,0,0-1.42l-2-2a1,1,0,0,0-1.42,1.42L24.09,16l-1.3,1.29A1,1,0,0,0,22.79,18.71Z" />
                        <path
                            d="M7.79,18.71a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L7.91,16l1.3-1.29a1,1,0,0,0-1.42-1.42l-2,2a1,1,0,0,0,0,1.42Z" />
                    </g>
                </svg>
            </div>
            <div class="stat-title dark:text-slate-300">Cut/Copy Events</div>
            <div class="stat-value dark:text-slate-300 text-white">{{ stats.cutCopy }}</div>
            <div class="stat-desc">Events today</div>
        </div>
    </div>
</template>