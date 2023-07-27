import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./components/global/Topbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import {Chart as ReactChart} from 'react-chartjs-2';
import StreamingPlugin from 'chartjs-plugin-streaming';
import Chart from "chart.js/auto";
import "chartjs-adapter-luxon";

Chart.register(StreamingPlugin);

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar/>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
