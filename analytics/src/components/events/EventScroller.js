import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './eventScroller.css';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { FlipMove } from 'react-flip-move';


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

  useEffect(() => {
    // Add a new event every second
    const intervalId = setInterval(addEvent, 1000);

    // Cleanup function to remove the interval when the component is unmounted
    return () => clearInterval(intervalId);
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
              key={`${event.datetime}-${index}`}
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
                  google.com
                </Typography>
                <Typography color={colors.grey[100]}>
                  godwin.pinto86@gmail.com
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{event.datetime}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
View
              </Box>
            </Box>
            </CSSTransition>
          ))}
        </TransitionGroup>
  );
};

export default EventScroller;
