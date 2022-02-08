import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    cardFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(5, 0, 0, 0)
    },
    button: {
        margin: theme.spacing(0, 2),
    }
}));

export default useStyles;
