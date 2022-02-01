import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';

import RootNavigation from "./routes/RouteNavigation";
import { store } from "./redux/store";
import theme from "./config/theme";

function App() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CssBaseline/>
        <ThemeProvider theme={theme} >
          <SnackbarProvider maxSnack={5} anchorOrigin={{ veritcal: 'top', horizontal: 'right' }} >
            <RootNavigation />
          </SnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
