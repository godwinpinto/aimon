import ReactApexChart from "react-apexcharts";
import { useRef } from "react";
import ApexCharts from "apexcharts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';


var data=[];

var initialSeries = [{
  name: "Copy",
  data: data.slice()
}, {
  name: "Paste",
  data: data.slice()
}, {
  name: "Cut",
  data: data.slice()
}]; 

var copyData=[];
var cutData=[];
var pasteData=[];

  

var TICKINTERVAL = 10*1000
let XAXISRANGE =   200000
var lastDate = new Date().getTime();


const getNewSeries=(baseval, yrange)=> {
  var newDate = baseval + TICKINTERVAL;
  lastDate = newDate

  for(var i = 0; i< data.length - 10; i++) {
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

  data.push({
    x: newDate,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  })
}

const getTime=()=>{
  const currentDateTime = moment();

// Subtract 1 minute from the current datetime
const oneMinuteAgo = moment(currentDateTime).subtract(1, 'minutes');

// Format the datetime as "HH:mm"
const formattedTime = oneMinuteAgo.format('HH:mm');
return formattedTime;
}


let options= {
    series: initialSeries,
    chart: {
      id: 'realtime',
      type: 'line',
      background:"#262D47",
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
    xaxis: {
      type: 'numeric',
      range: XAXISRANGE,
      tickAmount: 20, 
      labels: {
        rotate:-45,
        rotateAlways:true,
        formatter: function (value, timestamp) {
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
    tooltip:{
      x: {
        formatter: function (timestamp, opts) {
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



const OverallStats3=()=> {

  const fetchData = async () => {

    var newDate = lastDate + TICKINTERVAL;
    lastDate = newDate
  
    for(var i = 0; i< data.length - 10; i++) {
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

    
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT+"/api/live_cntrl_events"); // Replace with your server API endpoint
      const serverData = response.data; // Assuming the response contains an array of data objects with properties x and y
      const dataMap = serverData.reduce((map, item) => {
        map[item.action] = item.count;
        return map;
      }, {});

      console.log(dataMap);

      copyData.push({
        x: newDate,
        y:dataMap.hasOwnProperty("C") ? dataMap["C"] : 0})
      pasteData.push({
        x: newDate,
        y:dataMap.hasOwnProperty("P") ? dataMap["P"] : 0})
      cutData.push({
        x: newDate,
        y:dataMap.hasOwnProperty("X") ? dataMap["X"] : 0})

      ApexCharts.exec('realtime', 'updateSeries', [{
        name: "Copy",
        data: copyData
      }, {
        name: "Paste",
        data: pasteData
      }, {
        name: "Cut",
        data: cutData
      }],true)


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    // Fetch initial data
    fetchData();

    // Set up a timer to refresh data every 5 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 10* 1000); // 10 seconds in milliseconds

    // Clean up the timer on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the API call is made only once on component mount





 
return (<ReactApexChart
              options={options}
              series={options.series}
              type="line"
              width="100%"
              height="100%"
            />
  );

}

export default OverallStats3