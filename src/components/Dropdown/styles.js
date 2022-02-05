import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        margin:0
    },
    input: {
        width: '100%',
        height: '100%',
    },
    select: {
        padding: theme.spacing(2),
    },
    text: {
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
