import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "100%",
        padding: theme.spacing(10),
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minHeight: '100vh',
    },
    card: {
        padding: theme.spacing(8, 5),
        width: 400,
        textAlign: 'center',
        margin: theme.spacing(10, 120),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(5),
        }
    },
    title: {
        marginBottom: theme.spacing(6),
        fontSize: 21,
        fontWeight: 700
    },
    button: {
        marginBottom: theme.spacing(4),
    }
}));

export default useStyles;