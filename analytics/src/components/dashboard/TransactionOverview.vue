<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts';
import type VueApexCharts from 'vue3-apexcharts';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import TransactionOverviewDialog from '@/components/dialogs/TransactionOverviewDialog.vue'

const series = ref<Array<number>>([0, 0, 0]);
const labels = ref<Array<string>>(['Copy', 'Cut', 'Paste']);

const handleDirectionSelection = (event: any, chartContext: any, config: any) => {
    console.log(event, chartContext, config);
    const clickedIndex = config.dataPointIndex;

    // Get the label of the clicked segment using the index
    const clickedLabel = options.labels[clickedIndex];

    // Do something with the clicked label (e.g., display it in a console)
    console.log('Clicked Label:', clickedLabel);

    dialogProps.value={
        params:clickedLabel,
        title:"Events data for "+clickedLabel
    }
    modalStatus.value=true;
//    viewDetails.showModal()

    // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
}
/* const clickChart = (event, chartContext, config) => {
    console.log(config.config.series[config.seriesIndex])
    console.log(config.config.series[config.seriesIndex].name)
    console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex])
}
 */

const options = {
    chart: {
        width: 380,
        type: 'pie',
        background: "#2C3159",
    },

    theme: {
        mode: 'dark',
        palette: 'palette2',
        monochrome: {
            enabled: false,
            color: '#3F51B5',
            shadeTo: 'dark',
            shadeIntensity: 0.65
        },
    },
    labels: labels.value,
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

const fetchData = () => {
    // Make an API call using Axios to fetch the data for the chart
    axios.get("/api/transaction_overview")
        .then(response => {
            // Assuming the API response contains an array of numbers for the chart series
            // Update the series state with the fetched data


            const dataMap: any = {};
            response.data.forEach((item: any) => {
                dataMap[item.action == 'C' ? "Copy" : item.action == 'P' ? "Paste" : item.action == 'X' ? "Cut" : "Visit"] = item.count;
            });

            // Update the series state with the fetched data in the order of the labels
            const updatedSeries = labels.value.map((label: any) => dataMap[label] || 0);
            series.value = updatedSeries;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

onMounted(() => {
    fetchData();
    // Set up a timer to refresh data every 5 minutes
    const intervalId = setInterval(() => {
        fetchData();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

})

const modalStatus=ref(false);
const dialogProps=ref({
    title:"",
    params:""
});

const closeDialog=()=>{
    modalStatus.value=false;
}
</script>
<template>
    <div class="card w-full p-6 bg-base-100 shadow-xl mt-6">
        <div class="text-xl font-semibold inline-block">
            Blacklisted Summary (24 hours)
            <div class="inline-block float-right">
                <div class="tooltip"
                    data-tip="Overall event summary in last 24hours. Includes visits / C/X/P events on blacklisted sites">
                    <InformationCircleIcon class="h-6 w-6" />
                </div>
            </div>
        </div>
        <div class="divider mt-2"></div>
        <div class='h-full w-full pb-1 bg-base-100'>
            <apexchart :options="options" :series="series" :type="'pie'" width="100%" height="100%"
                @dataPointSelection="handleDirectionSelection" />
        </div>
        <TransactionOverviewDialog v-if="modalStatus" :title="dialogProps.title" :params="dialogProps.params" :closeDialog="closeDialog"/>
    </div>
</template>