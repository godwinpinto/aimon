import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';



class OverallStats2 extends Component {
  render() {
    return (
      <Line
      height={"auto"}
        data={{
          datasets: [{
            label: 'Copy',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderDash: [8, 4],
            fill: false,
            data: []
          }, {
            label: 'Paste',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            cubicInterpolationMode: 'monotone',
            fill: false,
            data: []
          }]
        }}
        options={{
            plugins: {
                // Change options for ALL axes of THIS CHART
                streaming: {
                  duration: 5000
                }
              },
            maintainAspectRatio: false,
          scales: {
            x: {
              type: 'realtime',

              realtime: {
                delay: 5000,
                onRefresh: chart => {
                  chart.data.datasets.forEach(dataset => {
                    dataset.data.push({
                      x: Date.now(),
                      y: Math.random()
                    });
                  });
                }
              }
            }
          }
        }}
      />
    );
  }
}

export default OverallStats2;