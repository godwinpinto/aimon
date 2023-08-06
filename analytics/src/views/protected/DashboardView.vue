<script setup lang="ts">
import { defineComponent, h } from 'vue';
import DashboardStats from '@/components/dashboard/DashboardStats.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import LiveStats from '@/components/dashboard/LiveStats.vue'
import TransactionOverview from '@/components/dashboard/TransactionOverview.vue'
import DayVisits from '@/components/dashboard/DayVisits.vue'
import RestrictedContentTags from '@/components/dashboard/RestrictedContentTags.vue'
import LiveEvents from '@/components/dashboard/LiveEvents.vue'
import UserActivity from '@/components/dashboard/UserActivity.vue'
import SummaryDetails from '@/components/dashboard/SummaryDetails.vue'

</script>
<template>
    <div class="flex-1 overflow-y-auto pt-8 px-6  bg-base-200">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="">
            </div>
            <div class="text-right ">
                <button class="btn btn-ghost btn-sm normal-case">
                    <ArrowPathIcon class="w-4 mr-2" />Refresh Data
                </button>

            </div>
        </div>
        <div class="grid lg:grid-cols-4 mt-2 md:grid-cols-2 gap-6 ml-0">
            <DashboardStats />
        </div>
        <div className="grid lg:grid-cols-12 mt-4 grid-cols-4 gap-6 row-span-4">
            <LiveStats class="col-span-8 row-span-4" />
            <TransactionOverview class="col-span-4 row-span-4 " />
        </div>
        <div className="grid lg:grid-cols-12 mt-4 grid-cols-4 gap-6" style="height:40vh">
            <RestrictedContentTags class="col-span-6" />
            <LiveEvents class="col-span-6" />
            <!--             <TransactionOverview class="col-span-4 row-span-4 "/> -->
        </div>
        <div className="grid lg:grid-cols-12 mt-4 grid-cols-4 gap-6" style="height:40vh">
            <DayVisits class="col-span-6" />
            <UserActivity class="col-span-6" />
            <!--             <TransactionOverview class="col-span-4 row-span-4 "/> -->
        </div>
        <div className="grid lg:grid-cols-12 mt-4 grid-cols-4 gap-6" style="height:40vh">
            <SummaryDetails class="col-span-12"/>
        </div>
</div>
</template>