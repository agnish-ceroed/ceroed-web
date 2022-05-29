import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    commentContainer: {
        display: 'flex',
        padding: theme.spacing(2),
        borderBottom: `1px solid gray`,
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
    }
}));

export default useStyles;