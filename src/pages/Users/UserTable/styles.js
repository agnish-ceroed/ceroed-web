import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        maxHeight: 'calc(100vh - 140px)',
    },
    button: {
        backgroundColor: theme.palette.Secondary.main,
        marginRight: theme.spacing(2)
    }
}));

export default useStyles;
