import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    home: {
        background: theme.backgroundColor,
        minHeight: '100vh'
    },
    container: {
        padding: theme.spacing(2),
    },
    title: {
        padding: theme.spacing(4)
    },
    card: {
        margin: theme.spacing(15, 0),
        padding: theme.spacing(10),
        borderRadius: '16px !important',
    },
    cardContainer: {
        textAlign: 'center',
    },
    cardTitle: {
        padding: theme.spacing(0, 0, 10, 0),
        fontWeight: 700
    },
    button: {
        width: 200,
    }
}));

export default useStyles;
