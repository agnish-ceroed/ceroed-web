import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    signup: {
        background: theme.palette.Secondary.background,
        minHeight: '100vh'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(5, 0, 0, 0)
    },
    signupContainer: {
        padding: theme.spacing(6),
        boxShadow: '0px 6px 18px rgb(0 0 0 / 6%)',
        borderRadius: theme.spacing(2),
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
