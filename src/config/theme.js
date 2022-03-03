import { createTheme } from "@mui/material";

const theme = createTheme({
    spacing: 4,
    status: {
        danger: '#FF4500',
    },
    backgroundColor: '#D9E4CD',
    palette: {
        divider: '#E1E1E1',
        text: {
            primary: '#1D1D1D',
            secondary: '#686868',
            disabled: '#8D8D8D',
            accent: '#109CF1',
            darkBlue: '#334D6E'
        },
        Primary: {
            main: '#F15927',
            dark: '#B72300',
            light: '#FF8B54',
            background: '#FEF2EE',
            border: '#E99D84',
            contrastText: '#FFFFFF',
        },
        Secondary: {
            main: '#26A69A',
            dark: '#00766C',
            light: '#64D8CB',
            background: '#F6F6F6',
            border: '#84C4BE',
            contrastText: '#FFFFFF',
        },
        Other: {
            stroke: '#C4C4C4',
            divider: '#E3E3E3',
            backdrop: '#717171',
            snackbar: '#323232',
            activeRating: '#FFB400',
            background: '#E3E3E3',
        },
        Warning: {
            main: '#FF9800',
            dark: '#C77700',
            light: '#FFB547',
            textDark: '#663D00',
            lightBg: '#FFF5E5',
            border: '#F1BD71',
            contrastText: '#1D1D1D',
        },
        Error: {
            main: '#F44336',
            dark: '#E31B0C',
            light: '#F88078',
            textDark: '#621B16',
            lightBg: '#FEECEB',
            border: '#EB928C',
            contrastText: '#FFFFFF',
        },
        Actions: {
            active: '#F15927',
            hover: '#B72300',
            selected: '#B72300',
            disabled: '#BDBDBD',
            disabledBackground: '#E0E0E0',
            focus: '#F15927',
        },
        background: {
            white: '#FFFFFF',
            gray: '#E5E5E5',
            darkGray: '#707683'
        },
        icon: {
            gray: '#C2CFE0'
        },
        border: {
            gray: '#EBEFF2'
        }
    },
});

export default theme;
