import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    attachmentContainer: {
        display: 'flex',
        padding: theme.spacing(2),
        borderBottom: `1px solid #ebe6e6`,
        marginBottom: theme.spacing(2),
    },
    fileContainer: {
        width: 180,
        marginLeft: theme.spacing(2),
        overflow: 'hidden',
    },
    name: {
        fontSize: 14,
        fontWeight: 600,
    },
    image: {
        maxWidth: 150,
        maxHeight: 100,
    },
    buttonContainer: {
        width: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

export default useStyles;