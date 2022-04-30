import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 0,
        margin: 0
    },
    topContainer: {
        marginBottom: theme.spacing(4),
        backgroundColor: theme.palette.background.white,
        width: '100%',
        borderRadius: 14,
        padding: theme.spacing(5, 7),
        position: 'relative',
    },
    previewTitle: {
        marginBottom: theme.spacing(2)
    },
    previewItem: {
        margin: theme.spacing(1, 0),
        fontSize: 15
    },
}));

export default useStyles;