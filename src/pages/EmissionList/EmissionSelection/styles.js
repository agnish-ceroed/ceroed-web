import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 0,
        margin: 0,
    },
    emissionType: {
        width: 300,
        height: 40,
        border: `1px solid ${theme.palette.background.border}`,
        background: theme.palette.Primary.contrastText,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(3, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
    }
}));

export default useStyles;