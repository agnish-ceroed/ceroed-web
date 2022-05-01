import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        padding: theme.spacing(4),
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        background: theme.palette.background.white,
        marginBottom: 20,
    },
    firstContainer: {
        width: 300,
        paddingRight: theme.spacing(4),
        borderRight: '1px solid gray',
        display: 'flex',
        flexDirection: 'column'
    },
    secondContainer: {
        width: 300,
        paddingLeft: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column'
    }
}));

export default useStyles;