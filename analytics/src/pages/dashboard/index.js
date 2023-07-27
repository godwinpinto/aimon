import { Box, Typography, useTheme, Tooltip } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import OverallStats from "../../components/charts/OverallStats";
import OverallStats2 from "../../components/charts/OverallStats2";
import OverallStats3 from "../../components/charts/OverallStats3";
import EventScroller from "../../components/events/EventScroller";
import DayVisits from "../../components/charts/DayVisits";
import ContentTags from "../../components/charts/RestrictedContentTags";
import TransactionsOverview from "../../components/charts/TransactionsOverview";
import EventsView from "../../components/details/EventsView";
import { InfoRounded } from "@mui/icons-material";
import UserActivity from "../../components/charts/UserActivity";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"

          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Realtime Copy/Cut/Paste Events
            </Typography>
            <Tooltip title="Status of events are  polled at every 1 minute interval" style={{ marginRight: "10px", float: "right" }}>
              <InfoRounded />
            </Tooltip>
          </Box>
          {/*  <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          <Box height="300px" m="20px 20px 20px 20px">
            <OverallStats3 />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 8"
          backgroundColor={colors.primary[400]}
          overflowY="none"
        >
          <Box
            display="flex"
            overflowY="none"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
            <Tooltip title="Employees visiting or actioned CTRL+C/X/P on the blacklisted sites" style={{ marginRight: "10px", float: "right" }}>
              <InfoRounded />
            </Tooltip>

          </Box>
          <EventScroller />
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box
            display="flex"
            overflowY="none"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top 10 Site Visits (last 24 hours)
            </Typography>
            <Tooltip title="Sites visited by employees which are to be logged" style={{ marginRight: "10px", float: "right" }}>
              <InfoRounded />
            </Tooltip>

          </Box>
          {/*  <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          <DayVisits />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box
            display="flex"
            overflowY="none"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Events under restricted content tags (last 24 hours)
            </Typography>
            <Tooltip title="Content are tagged when Copy/Pasted by ChatGPT. This chart show users who may have content that map to restricited contents. This is a batch program and schedule every hour" style={{ marginRight: "10px", float: "right" }}>
              <InfoRounded />
            </Tooltip>

          </Box>
          {/*  <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          <ContentTags />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
        >
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
        >
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            display="flex"
            overflowY="none"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top 10 User by Activity (last 24 hours)
            </Typography>
            <Tooltip title="User activities grouped by activity. This could be visiting such sites or C/X/P actions on those sites." style={{ marginRight: "10px", float: "right" }}>
              <InfoRounded />
            </Tooltip>

          </Box>
          {/*  <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          <UserActivity />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            display="flex"
            overflowY="none"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Events Summary (last 24 hours) 
            </Typography>
            <Tooltip title="Overall event summary in last 24hours. Includes visits / C/X/P events on those sites" style={{ marginRight: "10px", float: "right" }}>
              <InfoRounded />
            </Tooltip>

          </Box>
          {/*  <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          <ContentTags />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            display="flex"
            overflowY="none"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Transaction Overview
            </Typography>
            <Tooltip title="Overall event summary in last 24hours. Includes visits / C/X/P events on those sites" style={{ marginRight: "10px", float: "right" }}>
              <InfoRounded />
            </Tooltip>

          </Box>
          <TransactionsOverview />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
        >
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
        >
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
        >
        </Box>

        <Box
          gridColumn="span 12"
          gridRow="span 6"
          backgroundColor={colors.primary[400]}
        >
          <Box
            display="flex"
            overflowY="none"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Events History (Past 24 hours)
            </Typography>
            <Tooltip title="Full Event History. Currently restricted to last 100 events for demo purpose" style={{ marginRight: "10px", float: "right" }}>
              <InfoRounded />
            </Tooltip>

          </Box>
          <EventsView />

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
