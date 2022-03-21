import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.Secondary.main,
        marginRight: theme.spacing(2)
    }
}));

export default useStyles;
