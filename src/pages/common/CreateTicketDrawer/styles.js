import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    drawerContentArea: {
        padding: theme.spacing(4),
        overflow: 'auto'
    },
    textAreaContainer: {
        margin: theme.spacing(6, 0),
        height: 'auto'
    },
}));

export default useStyles;