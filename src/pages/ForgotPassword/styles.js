import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    forgotPassword: {
        background: theme.backgroundColor,
        minHeight: '100vh'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        margin: theme.spacing(10, 0),
        padding: theme.spacing(6),
        boxShadow: '0px 6px 18px rgb(0 0 0 / 6%)',
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(5),
        },
    },
    buttonContainer: {
        padding: theme.spacing(2, 0)
    },
    cardTitle: {
        marginBottom: theme.spacing(8),
        fontWeight: 500
    }
}));

export default useStyles;
