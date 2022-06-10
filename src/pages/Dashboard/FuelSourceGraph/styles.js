import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        width: '100%',
        height: '100%'
    },
    graphTitle: {
        fontSize: 20,
        fontWeight: 600,
        margin: theme.spacing(2, 0)
    },
}));

export default useStyles;