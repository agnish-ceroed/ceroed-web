import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        marginBottom: theme.spacing(5),
    },
    cardItem: {
        minWidth: 150,
    }
}));

export default useStyles;
