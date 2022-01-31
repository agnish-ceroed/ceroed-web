import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    login: {
        background: theme.backgroundColor,
        minHeight: '100vh'
    },
    loginCard: {
        borderRadius: "16px !important",
        padding: theme.spacing(10),
        margin: theme.spacing(10, 0),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(5),
        }
    },
    button: {
        margin: '12px 0 20px 0 !important'
    }
}));

export default useStyles;