import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(30, 10),
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    card: {
        padding: theme.spacing(8, 5),
        width: theme.spacing(100),
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