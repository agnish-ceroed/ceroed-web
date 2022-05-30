import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    commentContainer: {
        display: 'flex',
        padding: theme.spacing(2),
        borderBottom: `1px solid #ebe6e6`,
        marginBottom: theme.spacing(2),
    },
    messageContainer: {
        marginLeft: theme.spacing(2),
    },
    name: {
        fontSize: 14,
        fontWeight: 600,
    },
    comment: {
        fontSize: 14,
    },
    date: {
        fontSize: 14,
        marginTop: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

export default useStyles;