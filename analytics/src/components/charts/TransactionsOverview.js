import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import axios from 'axios';

const TransactionsOverview = () => {
  const [series, setSeries] = useState([0, 0, 0]);
  const [labels, setLabels] = useState(['Copy', 'Cut', 'Paste']);

  const options = {
    chart: {
      width: 380,
      type: 'pie',
      background: "#262D47",
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
    labels: labels,
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
    axios.get(process.env.REACT_APP_SERVER_ENDPOINT+"/api/transaction_overview")
      .then(response => {
        // Assuming the API response contains an array of numbers for the chart series
        // Update the series state with the fetched data


        const dataMap = {};
        response.data.forEach(item => {
          dataMap[item.action=='C'?"Copy":item.action=='P'?"Paste":item.action=='X'?"Cut":"Visit"] = item.count;
        });

        // Update the series state with the fetched data in the order of the labels
        const updatedSeries = labels.map(label => dataMap[label] || 0);
        setSeries(updatedSeries);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    // Fetch initial data
    fetchData();

    // Set up a timer to refresh data every 5 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 5*60* 1000); // 5 minutes in milliseconds

    // Clean up the timer on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the API call is made only once on component mount

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      width="100%"
      height="100%"
    />
  );
}

export default TransactionsOverview;
