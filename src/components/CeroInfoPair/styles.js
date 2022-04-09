import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        height: 28,
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.text.primary,
    },
    value: {
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.text.secondary,
    },
    subTitle: {
        marginLeft: theme.spacing(0),
    }
}));

export default useStyles;