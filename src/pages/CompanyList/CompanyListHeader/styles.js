import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    filterContainer: {
        height: '40px',
        justifyContent: 'left',
    },
    button: {
        width: '100%',
        backgroundColor: `${theme.palette.text.accent}!important`,
        fontStyle: 'normal',
        fontWeight: '600!important',
        fontSize: '13px!important'
    },
    container: {
        padding: 0,
        marginBottom: theme.spacing(4),
    },
    select: {
        padding: theme.spacing(2),
    },
    input: {
        padding: 0,
    }
}));

export default useStyles;