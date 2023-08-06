<template>
    <div class="card w-full p-6 bg-base-100 shadow-xl mt-6">
        <div class="text-xl font-semibold inline-block">
            Live Events (across all sites events:C/X/P)
            <div class="inline-block float-right">

                <div class="tooltip" data-tip="Employees visiting or actioned CTRL+C/X/P on sites">
                    <InformationCircleIcon class="h-6 w-6" />
                </div>
            </div>
        </div>
        <div class="divider mt-2"></div>
        <div class='h-full w-full pb-1 bg-base-100'>

            <ApexCharts ref="chart" :options="options" :series="series" type="line" width="100%" height="300px" />
        </div>
    </div>
</template>
  
<script setup  lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ApexCharts from 'vue3-apexcharts';
import type VueApexCharts from 'vue3-apexcharts';
import axios from 'axios';
//import moment from 'moment';
import { format, subMinutes } from 'date-fns'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

// Your TICKINTERVAL, XAXISRANGE, and other constants
const TICKINTERVAL = 60 * 1000;
let XAXISRANGE = 1200000;
let lastDate = new Date().getTime();

// Your data arrays
let data: Array<any> = [];
let copyData: Array<any> = [];
let cutData: Array<any> = [];
let pasteData: Array<any> = [];

// Your initial series
let initialSeries = [
    { name: 'Copy', data: data.slice() },
    { name: 'Paste', data: data.slice() },
    { name: 'Cut', data: data.slice() },
];



const getTime = () => {
    const currentDateTime = new Date();

    // Subtract 1 minute from the current datetime
    const oneMinuteAgo = subMinutes(currentDateTime, 1);

    // Format the datetime as "HH:mm"
    const formattedTime = format(oneMinuteAgo, 'HH:mm');
    return formattedTime;
};

// Your options
let options = {
    series: initialSeries,
    chart: {
        id: 'realtime',
        type: 'line',
        background: "#2C3159",
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 1000
            }
        },
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
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
    dataLabels: {
        enabled: true
    },
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 3
    },
    yaxis:{
        tickAmount:5,
        min:0,
        max:15
    },
    xaxis: {
        type: 'numeric',
        range: XAXISRANGE,
        tickAmount: 20,
        labels: {
            rotate: -45,
            rotateAlways: true,
            formatter: function (value: any, timestamp: any) {
                // Format the timestamp value into hours:minutes:seconds
                var date = new Date(timestamp);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            }
        }
    },
    legend: {
        show: true
    },
    tooltip: {
        x: {
            formatter: function (timestamp: any, opts: any) {
                // Format the timestamp value into hours:minutes:seconds
                var date = new Date(timestamp);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            }
        }
    }
};

const chart = ref<typeof VueApexCharts>();

// Your fetchData function
const fetchData = async () => {

    var newDate = lastDate + TICKINTERVAL;
    lastDate = newDate

    for (var i = 0; i < data.length - 10; i++) {
        // IMPORTANT
        // we reset the x and y of the data which is out of drawing area
        // to prevent memory leaks
        copyData[i].x = newDate - XAXISRANGE - TICKINTERVAL
        copyData[i].y = 0
        cutData[i].x = newDate - XAXISRANGE - TICKINTERVAL
        cutData[i].y = 0
        pasteData[i].x = newDate - XAXISRANGE - TICKINTERVAL
        pasteData[i].y = 0
    }

    console.log("newDate",newDate)
        console.log(newDate - XAXISRANGE - TICKINTERVAL)

    try {
        const response = await axios.get("/api/live_cntrl_events"); // Replace with your server API endpoint
        const serverData = response.data; // Assuming the response contains an array of data objects with properties x and y
        const dataMap = serverData.reduce((map: any, item: any) => {
            map[item.action] = item.count;
            return map;
        }, {});

        console.log(dataMap);

        copyData.push({
            x: newDate,
            y: dataMap.hasOwnProperty("C") ? dataMap["C"] : 0
        })
        pasteData.push({
            x: newDate,
            y: dataMap.hasOwnProperty("P") ? dataMap["P"] : 0
        })
        cutData.push({
            x: newDate,
            y: dataMap.hasOwnProperty("X") ? dataMap["X"] : 0
        })


        if (chart.value) {
            chart.value.updateSeries([{
                name: "Copy",
                data: copyData
            }, {
                name: "Paste",
                data: pasteData
            }, {
                name: "Cut",
                data: cutData
            }])
        }
        /* ApexCharts.exec('realtime'
        , 'updateSeries',[{
                    name: "Copy",
                    data: copyData
                }, {
                    name: "Paste",
                    data: pasteData
                }, {
                    name: "Cut",
                    data: cutData
                }], true)
         */

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
// Use ref for the series and chart component
const series = ref(initialSeries);

let intervalId:any;

// Fetch data and set up interval on mounted
onMounted(async () => {
    fetchData();

    intervalId = setInterval(fetchData, 60 * 1000); // 60 seconds in milliseconds

    // Clean up the interval on component unmount
});

onUnmounted(() => {
      // Clear the intervals when the component is unmounted
      clearInterval(intervalId);
    });

</script>
  