import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    login: {
        background: theme.backgroundColor,
        minHeight: '100vh'
    },
    loginCard: {
        borderRadius: 16,
        padding: theme.spacing(10),
        margin: theme.spacing(10, 0),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(5),
        }
    },
    button: {
        margin: theme.spacing(3, 0, 5, 0),
    }
}));

export default useStyles;