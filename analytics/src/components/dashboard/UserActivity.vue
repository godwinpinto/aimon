<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts';
import VueApexCharts from 'vue3-apexcharts';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { InformationCircleIcon } from '@heroicons/vue/24/outline'


const chartData = reactive({
    series: [] as Array<any>,
    labels: [] as Array<string>,
});


const fetchData = async () => {
    try {
        const response = await axios.get("/api/top_user_activity"); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const data = response.data;

        // Extracting 'series' and 'labels' from the server response
        const seriesData1 = data.map((item: any) => item.count);
        const labelsData = data.map((item: any) => item.user_id);
        chartData.series = [{ data: seriesData1 }];
        chartData.labels = labelsData;
        /*         chartData.value = {
                    series: [{ "data": seriesData }],
                    labels: labelsData,
                };
         */
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const options = ref({
    chart: {
        id: 'dayVisitsChart',
        type: 'bar',
        background: "#2C3159",
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    plotOptions: {
        bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
                position: 'bottom'
            },
        }
    },
    colors: ["#FCCF31", "#58B7FF", "#FF8C42", "#FF6B6B", "#7ED321", "#BB6BD9", "#F17E5D", "#4A4A4A", "#5E81AC", "#FFD166"],

/*     fill: {
        type: "gradient",
        gradient: {
            gradientToColors: ["#FCCF31", "#58B7FF", "#FF8C42", "#FF6B6B", "#7ED321", "#BB6BD9", "#F17E5D", "#4A4A4A", "#5E81AC", "#FFD166"],
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100]
        }
    },

 */    dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
            colors: ['#fff']
        },
        formatter: function (val: any, opt: any) {
            return chartData.labels[opt.dataPointIndex] + ":  " + val
        },
        offsetX: 0,
        dropShadow: {
            enabled: true
        }
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    xaxis: {
        categories: chartData.labels
        ,
        labels: {
            style: {
                colors: ['#FFF']
            }
        }
    },
    yaxis: {
        labels: {
            show: false
        }
    },
    legend: {
        show: false
    },
    tooltip: {
        theme: 'dark',
    }
});
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
    <div class="card w-full p-6 bg-base-100 shadow-xl mt-6">
        <div class="text-xl font-semibold inline-block">
            User Activity (24 hours)
            <div class="inline-block float-right">
                <div class="tooltip"
                    data-tip="User activities grouped by activity. This could be visiting such sites or C/X/P actions on those sites.">
                    <InformationCircleIcon class="h-6 w-6" />
                </div>
            </div>
        </div>
        <div class="divider mt-2"></div>
        <div class='h-full w-full pb-1 bg-base-100'>
            <apexchart :options="options" :series="chartData.series" type="bar" width="100%" height="100%" />
        </div>
    </div>
</template>