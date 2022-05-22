import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(6),
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
        borderRadius: theme.spacing(2)
    }
}));

export default useStyles;
