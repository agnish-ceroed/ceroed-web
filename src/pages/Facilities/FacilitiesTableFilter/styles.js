import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    filterContainer: {
        height: 40
    },
    button: {
        width: '100%',
        fontWeight: '600',
        fontSize: '13px'
    },
    container: {
        padding: 0,
        margin: 0,
    },
    select: {
        padding: theme.spacing(2),
    },
    input: {
        padding: 0,
    }
}));

export default useStyles;
