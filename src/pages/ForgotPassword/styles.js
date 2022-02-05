import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    forgotPassword: {
        background: theme.backgroundColor,
        minHeight: '100vh'
    },
    container: {
        padding: theme.spacing(10),
        margin: theme.spacing(10, 0),
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
