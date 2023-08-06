<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import { ChartPieIcon, BookmarkIcon } from '@heroicons/vue/24/outline'
import IconTag from '../components/icons/IconTag.vue'
import IconDashboard from '../components/icons/IconDashboard.vue'
import IconUsers from '../components/icons/IconUsers.vue'
import IconExclude from '../components/icons/IconExclude.vue'
import { ref, watch } from 'vue';
import {  Auth} from 'aws-amplify'

const router = useRouter();
const route = useRoute();


const currentRoute = route.path;
const path = ref(currentRoute)

const goToPage = (val: string) => {
    console.log("called");
    router.push({ name: val }); // Navigate programmatically
};

const signOut = () => {
    Auth.signOut();
    router.push({ name: "login" }); 

}


// Watch for changes in the route path
watch(() => route.path, (newPath, oldPath) => {
    console.log('Route path changed:', newPath, oldPath);
    path.value = newPath;
    // Do something when the route path changes
});


</script>

<template>
    <ul class="menu pt-2 bg-base-100 text-base-content min-h-screen pr-0">

        <li class="mb-2 font-semibold text-xl">
            <router-link to="/secured/dashboard">
                <img class="mask mask-squircle w-10" src="@/assets/logo192.png" alt="DashWind Logo" />
                AI-Mon
            </router-link>
        </li>

        <li :class="path == '/secured/dashboard' ? 'bg-base-200' : ''">
            <div class="flex-row    py-6" @click="goToPage('dashboard')">
                <div class="w-5 h-5  mr-4">
                    <IconDashboard />
                </div>
                <div>Live Dashboard</div>
            </div>
        </li>
        <li :class="path == '/secured/tag' ? 'bg-base-200' : ''">
            <div class="flex-row  py-6" @click="goToPage('tag')">
                <div class="w-5 h-5 mr-4">
                    <IconTag />
                </div>
                <div>Tag Management</div>
            </div>
        </li>
        <li :class="path == '/secured/domain' ? 'bg-base-200' : ''">
            <div class="flex-row   py-6" @click="goToPage('domain')">
                <div class="w-5 h-5  mr-4">
                    <BookmarkIcon />
                </div>
                <div>Domain Management</div>
            </div>
        </li>
        <li :class="path == '/secured/user' ? 'bg-base-200' : ''">
            <div class="flex-row   py-6" @click="goToPage('user')">
                <div class="w-5 h-5  mr-4">
                    <IconUsers />
                </div>
                <div>User Management</div>
            </div>
        </li>
        <li :class="path == '/secured/generated-tags' ? 'bg-base-200' : ''">
            <div class="flex-row   py-6" @click="goToPage('generatedTags')">
                <div class="w-5 h-5  mr-4">
                    <img src="@/assets/tags-o-svgrepo-com.svg">
                    
                </div>
                <div>Generated Tags</div>
            </div>
        </li>
        <li :class="path == '/secured/generated-url' ? 'bg-base-200' : ''">
            <div class="flex-row   py-6" @click="goToPage('generatedUrl')">
                <div class="w-5 h-5  mr-4">
                    <img src="@/assets/url-link-svgrepo-com.svg">
                </div>
                <div>Generated Url</div>
            </div>
        </li>
        <li :class="path == '/secured/generated-ai-domain' ? 'bg-base-200' : ''">
            <div class="flex-row   py-6" @click="goToPage('generatedAiDomain')">
                <div class="w-5 h-5  mr-4">
                    <img src="@/assets/ai-domain.svg">
                </div>
                <div>Generated AI Domain</div>
            </div>
        </li>
        <li :class="path == '/secured/alerts' ? 'bg-base-200' : ''">
            <div class="flex-row   py-6" @click="goToPage('alerts')">
                <div class="w-5 h-5  mr-4">
                    <img src="@/assets/alert.svg">
                </div>
                <div>Alerts Configuration</div>
            </div>
        </li>



    </ul>
    <div style="position: absolute; bottom: 10px; " class="w-full">

        <ul class="menu pt-2 bg-base-100 text-base-content pr-0 w-full">
            <li>        <div class="divider mt-2"></div>
</li>
            <li @click="signOut" class=" w-full">
                <div class="flex-row py-3  w-full" @click="goToPage('user')">
                    <div class="w-5 h-5  mr-4">
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.00195 7C8.01406 4.82497 8.11051 3.64706 8.87889 2.87868C9.75757 2 11.1718 2 14.0002 2H15.0002C17.8286 2 19.2429 2 20.1215 2.87868C21.0002 3.75736 21.0002 5.17157 21.0002 8V16C21.0002 18.8284 21.0002 20.2426 20.1215 21.1213C19.2429 22 17.8286 22 15.0002 22H14.0002C11.1718 22 9.75757 22 8.87889 21.1213C8.11051 20.3529 8.01406 19.175 8.00195 17"
                                stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" />
                            <path
                                d="M8 19.5C5.64298 19.5 4.46447 19.5 3.73223 18.7678C3 18.0355 3 16.857 3 14.5V9.5C3 7.14298 3 5.96447 3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5"
                                stroke="#FFFFFF" stroke-width="1.5" />
                            <path d="M15 12L6 12M6 12L8 14M6 12L8 10" stroke="#FFFFFF" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div>Logout</div>
                </div>
            </li>
        </ul>
</div></template>
  
  