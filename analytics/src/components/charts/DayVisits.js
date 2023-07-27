import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const DayVisits = () => {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10*60* 1000); // 10 minutes in milliseconds

    // Clean up the timer on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await  axios.get(process.env.REACT_APP_SERVER_ENDPOINT+"/api/site_visits"); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const data = response.data;

      // Extracting 'series' and 'labels' from the server response
      const seriesData = data.map(item => item.count);
      const labelsData = data.map(item => item.domain);

      setChartData({
        series: [{ data: seriesData }],
        labels: labelsData,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const options = {
        chart: {
          type: 'bar',
          background:"#262D47",
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
        colors: ["#FCCF31"],

        fill: {
          type: "gradient",
          gradient: {
            gradientToColors: ["#d4526e", "#d4526e", "#d4526e", "#d4526e", "#d4526e", "#d4526e", "#d4526e", "#d4526e", "#d4526e", "#d4526e"],
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100]
          }
        },

        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
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
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
		};

  return (
    <ReactApexChart
      options={options}
      series={chartData.series}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default DayVisits;
