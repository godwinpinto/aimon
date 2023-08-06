<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { InformationCircleIcon } from '@heroicons/vue/24/outline'


interface EventInterface {
    id: number,
    datetime: string
    uuid?: string
    user_id?: string
    action?: string
    domain?: string
    created_dt?: string
}

const events = ref<Array<EventInterface>>([]);

// Function to add a new event every second
const addEvent = () => {
    const newEvent = {
        id: new Date().getTime(), // Using the timestamp as the unique ID
        datetime: new Date().toLocaleString(), // Format the current datetime as a string
    };

    const updatedEvents = [newEvent, ...events.value.slice(0, 5)]; // Ensure the list has a maximum of 5 records
    events.value = updatedEvents;
}

let holdData: Array<EventInterface> = [];
let rowId = 1;
const eventAdder = async () => {
    if (holdData.length > 0) {
        let temp = holdData.shift();
        if (temp) {
            temp.id = rowId++;
            temp.action = temp.action == "C" ? "Copy" : temp.action == "X" ? "Cut" : temp.action == "P" ? "Paste" : "Visited"
            //console.log("temp", temp)
            const updatedEvents = [temp, ...events.value];
            events.value = updatedEvents.slice(0, 5); // Ensure the list has a maximum of 5 records
        }
    } else {
        console.log("empty")
    }
}
const fetchEventsFromApi = async () => {
    try {
        const response = await axios.get("/api/live_sensitive_transactions");
        const newEvents = response.data;
        if (newEvents.length > 0) {
            holdData = [...holdData, ...newEvents];
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};

let intervalId:any;
   let intervalEventAdd:any ;

onMounted(() => {

    fetchEventsFromApi();

    // Add a new event every second
    intervalId = setInterval(fetchEventsFromApi, 10000);
    intervalEventAdd = setInterval(eventAdder, 1000);

    // Cleanup function to remove the interval when the component is unmounted
});

onUnmounted(() => {
      // Clear the intervals when the component is unmounted
      clearInterval(intervalId);
      clearInterval(intervalEventAdd);
    });
</script>
<template>
    <div class="card w-full p-6 bg-base-100 shadow-xl mt-6">
        <div class="text-xl font-semibold inline-block">
            Blacklisted Live Events (C/X/P/V)
            <div class="inline-block float-right">
                <div class="tooltip" data-tip="Status of events are  polled at every 10 seconds interval to get any user who has accessed the blacklisted sites">
                    <InformationCircleIcon class="h-6 w-6" />
                </div>
            </div>
        </div>
        <div class="divider mt-2"></div>
        <div class='h-full w-full pb-1 bg-base-100'>


            <table className="table w-full">
                <tbody v-auto-animate>
                    <tr v-for="row in events" :key="row.id">
                        <td class="p-1">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <div className="font-bold text-accent">{{ row.user_id }}</div>
                                    <div className="text-sm text-primary-content">{{ row.domain }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="p-1">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <div className="font-bold text-warning">{{ row.action }}</div>
                                    <div className="text-sm opacity-50 text-base">{{
                                        formatDistanceToNow(parseISO(row.created_dt ?? ''), { addSuffix: true }) }}</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>