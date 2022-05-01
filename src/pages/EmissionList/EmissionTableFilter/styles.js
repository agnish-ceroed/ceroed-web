import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    filterContainer: {
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    primaryContainer: {
        height: 35,
        width: 'calc(100% - 100px)',
        maxWidth: 800,
        display: 'flex',
    },
    filterItem: {
        marginRight: theme.spacing(2),
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
        margin: 0,
    },
    select: {
        height: 35,
    },
    input: {
        margin: 0,
    }
}));

export default useStyles;