import { useEffect,useState } from "react";
import { Box, Chip, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import axios from "axios"; 


const EventsView = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]); // State to store fetched data


    const fetchData = async () => {
      try {
        // Make the API call using Axios (replace "your_api_endpoint" with the actual endpoint)
        const response = await axios.get(process.env.REACT_APP_SERVER_ENDPOINT+"/api/event_history");
        setData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      // Fetch data from the server when the component mounts
      fetchData();
    }, []); // Empty dependency array to ensure it only fetches once when mounted

    
    const columns = [
      { field: "id", headerName: "ID" },
      {
        field: "user_id",
        headerName: "User ID",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: (params) => (
            <Chip label={params.row.action=="C"?"Copy":params.row.action=="X"?"Cut":params.row.action=="P"?"Paste":params.row.action=="I"?"Visited":"Unknown"} color="error" />            

          ),
      },
      {
        field: "created_dt",
        headerName: "DateTime",
        flex: 1,
      },
      {
        field: "domain",
        headerName: "Domain",
        flex: 1,
        renderCell: (params) => (
          <Typography color={colors.greenAccent[500]}>
            {params.row.domain}
          </Typography>
        ),
      },
      {
        field: "content",
        headerName: "Short Content",
        flex: 1,
      },
    ];
  
    return (
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid getRowId={(row) => row.id} rows={data} columns={columns} />
        </Box>
      </Box>
    );
  };
  
  export default EventsView;
  