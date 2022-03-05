import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from "notistack";

import { refreshToken } from "./redux/actions";
import RootNavigation from "./routes/RouteNavigation";
import theme from "./config/theme";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ThemeProvider theme={theme} >
        <SnackbarProvider maxSnack={3} >
          <RootNavigation />
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
