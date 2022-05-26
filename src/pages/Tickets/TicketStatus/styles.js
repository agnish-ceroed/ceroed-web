import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        margin: theme.spacing(1, 0, 5, 0),
    },
    cardItem: {
        minWidth: 150,
        cursor: 'pointer',
    },
    firstItem: {
        paddingLeft: '0px!important',
    }
}));

export default useStyles;
