import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(6, 0),
    },
    commentContainer: {
        padding: theme.spacing(4, 0),
    },
    commentBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    textArea: {
        height: "auto!important",
    },
    commentButton: {
        alignSelf: "flex-end",
    },
}));

export default useStyles;