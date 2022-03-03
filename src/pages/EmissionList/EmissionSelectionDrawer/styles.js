import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 0,
        margin: 0,
    },
    mainContainer: {
        marginTop: theme.spacing(5),
        borderTop: `1px solid ${theme.palette.background.gray}`,
    },
    typeItem: {
        padding: theme.spacing(0, 3),
        borderBottom: `1px solid ${theme.palette.background.gray}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

export default useStyles;