import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        // backgroundColor: theme.palette.background.white,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        marginBottom: theme.spacing(4),
    },
    emissionSelector: {
        marginBottom: theme.spacing(3)
    }
}));

export default useStyles;