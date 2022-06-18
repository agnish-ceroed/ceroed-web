import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    drawerContainer: {
        maxWidth: '30vw',
        width: '30vw',
    },
    drawerContentArea: {
        padding: theme.spacing(4),
        overflow: 'auto'
    },
    selectContainer: {
        margin: theme.spacing(5, 0),
    }
}));

export default useStyles;