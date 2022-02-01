import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    signup: {
        background: theme.backgroundColor,
        minHeight: '100vh'
    },
    signupContainer: {
        padding: theme.spacing(10),
        margin: theme.spacing(10, 0),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(5),
        }
    },
    stepper: {
        padding: theme.spacing(10, 0)
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(5, 0, 0, 0)
    },
    button: {
        margin: theme.spacing(0, 2),
    }
}));

export default useStyles;
