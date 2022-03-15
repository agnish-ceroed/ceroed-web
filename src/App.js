import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from "notistack";

import { refreshToken } from "./redux/actions";
import RootNavigation from "./routes/RouteNavigation";
import theme from "./config/theme";
import { STATUS } from "./redux/constants";

function App() {
  const dispatch = useDispatch()
  const refreshStatus = useSelector(state => state.auth.refreshStatus)
  const authToken = useSelector(state => state.auth.isAuthenticated)

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ThemeProvider theme={theme} >
        <SnackbarProvider maxSnack={3}>
          {!authToken && refreshStatus === STATUS.RUNNING ? <p>loading</p> : <RootNavigation />}
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
