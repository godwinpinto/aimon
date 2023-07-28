import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './eventScroller.css';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { FlipMove } from 'react-flip-move';
import axios from 'axios';

const EventScroller = () => {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
  
  const [events, setEvents] = useState([]);

  // Function to add a new event every second
  const addEvent = () => {
    const newEvent = {
      id: new Date().getTime(), // Using the timestamp as the unique ID
      datetime: new Date().toLocaleString(), // Format the current datetime as a string
    };

    setEvents(prevEvents => {
      const updatedEvents = [newEvent, ...prevEvents.slice(0, 10)]; // Ensure the list has a maximum of 10 records
      return updatedEvents;
    });
  };

let holdData=[];
let rowId=1;
const eventAdder = async () => {
  if(holdData.length>0){
    let temp=holdData.shift();
    temp.id=rowId++;
    console.log("temp",temp)
    setEvents(prevEvents => {
      const updatedEvents = [temp,...prevEvents ];
      return updatedEvents.slice(0, 10); // Ensure the list has a maximum of 10 records
    });
  }else{
    console.log("empty")
  }
}
  const fetchEventsFromApi = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT+"/api/live_sensitive_transactions");
      const newEvents = response.data;
      if (newEvents.length > 0) {
        holdData=[...holdData,...newEvents];
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {

    fetchEventsFromApi();

    // Add a new event every second
    const intervalId = setInterval(fetchEventsFromApi, 5000);
    const intervalEventAdd = setInterval(eventAdder, 1000);

    // Cleanup function to remove the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalEventAdd);
    }
  }, []);

  return (
        <TransitionGroup>
          {events.map((event, index) => (
            <CSSTransition key={event.id} timeout={500} classNames={{
                enter: 'event-item-enter',
                enterActive: 'event-item-enter-active',
                exit: 'event-item-exit',
                exitActive: 'event-item-exit-active',
                appear: 'event-item-move', // Handle movement of existing elements when a new element is added
                appearActive: 'event-item-move', // Handle movement of existing elements when a new element is added
              }}>
<Box className="event-item-entered" style={{ animationDelay: `${(events.length - index) * 100}ms` }}
              key={`${event.id}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {event.domain}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {event.user_id}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{event.created_dt}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
{event.action=="C"?"Copy":event.action=="X"?"Cut":event.action=="P"?"Paste":event.action=="I"?"Visited":"Unknown"}
              </Box>
            </Box>
            </CSSTransition>
          ))}
        </TransitionGroup>
  );
};

export default EventScroller;
