import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ResponsiveLine } from '@nivo/line';

import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const OverallStats = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  const initialData=[{id:"test",
  color: tokens("dark").greenAccent[500],
  data:[
    { x: "1", y: getRandomNumberInRange(0,10) },
    { x: "2", y: getRandomNumberInRange(0,10) },
    { x: "3", y: getRandomNumberInRange(0,10) },
    { x: "4", y: getRandomNumberInRange(0,10) },
    { x: "5", y: getRandomNumberInRange(0,10) }
  ]}  
  ];
  const [data, setData] = useState(initialData);
  const [previousDataString, setPreviousDataString] = useState(JSON.stringify([]));

  const generateData = () => {
    return { x: moment().format('HH:mm:ss'), y: getRandomNumberInRange(0,10) } ; 
    
  };



  useEffect(() => {
    // Function to generate random data
    // Update the data every 1 second
    const interval = setInterval(() => {
      console.log("here");
      setData((prevData) => {
        // Create a copy of the current data and remove the first data point
        const updatedData = prevData[0].data.slice(1);

        // Add the new data point to the end of the data array
        updatedData.push(generateData());
        return [{ ...prevData[0], data: updatedData }];
      });
      setPreviousDataString(JSON.stringify(data));
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [data, previousDataString]);

  return (
      <ResponsiveLine
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.primary[100],
            },
          },
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        colors={{ datum: "color" }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        animate={true}
        yScale={{
          type: "linear",
          min: "0",
          max: "10",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: undefined ,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5,
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          legend: undefined,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        />
  );
};

export default OverallStats;
