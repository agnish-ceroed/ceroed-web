import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        '& label.Mui-focused': {
            color: theme.palette.Primary.main,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.Primary.main,
        },
        '& .MuiInput-root:hover::before': {
            borderWidth: 1,
            borderBottomColor: theme.palette.Primary.main,
        },
        '& .MuiFilledInput-root:hover::before': {
            borderBottomColor: theme.palette.Primary.main,
        },
        '& .MuiFilledInput-underline:after': {
            borderColor: theme.palette.Primary.main,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.Other.stroke,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.Primary.main,
            },
            '&.Mui-focused fieldset': {
              borderWidth: 2,
              borderColor: theme.palette.Primary.main,
            },
        },
        '& input[type=number]': {
            '-moz-appearance': 'textfield',
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    },
    text:{
        fontSize: 12,
        lineHeight: 1.5,
        fontWeight: 400,
        color: theme.palette.text.secondary,
        textAlign: 'start',
    },
    error: {
        color: theme.palette.Error.main,
    }
}));

export default useStyles;