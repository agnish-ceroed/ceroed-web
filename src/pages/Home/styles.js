import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(10),
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minHeight: '60vh'
    },
    card: {
        padding: theme.spacing(8, 5),
        width: 400,
        textAlign: 'center'
    },
    title: {
        marginBottom: theme.spacing(6),
        fontSize: 21,
        fontWeight: 700
    },
    button: {
        marginBottom: theme.spacing(4)
    }
}));

export default useStyles;