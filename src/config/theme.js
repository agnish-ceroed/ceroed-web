import { createTheme } from "@mui/material";

const theme = createTheme({
    spacing: 4,
    status: {
      danger: '#FF4500',
    },
    palette: {
        divider: '#E1E1E1',
        text: {
            primary: '#1D1D1D',
            secondary: '#686868',
            disabled: '#8D8D8D'
        },
    }
});

export default theme;
