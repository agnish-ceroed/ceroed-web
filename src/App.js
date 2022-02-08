import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from "notistack";

import RootNavigation from "./routes/RouteNavigation";
import { store } from "./redux/store";
import theme from "./config/theme";

function App() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CssBaseline/>
        <ThemeProvider theme={theme} >
          <SnackbarProvider maxSnack={3} >
            <RootNavigation />
          </SnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
