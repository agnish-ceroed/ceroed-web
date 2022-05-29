import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    commentContainer: {
        padding: theme.spacing(7, 4),
        marginTop: theme.spacing(4),
        background: theme.palette.Secondary.background
    },
    time: {
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(2),
    }
}));

export default useStyles;