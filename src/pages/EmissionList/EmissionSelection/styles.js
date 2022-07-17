import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 0,
        margin: 0,
    },
    emissionType: {
        width: 260,
        height: 40,
        border: `1px solid ${theme.palette.border.gray}`,
        background: theme.palette.Primary.contrastText,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(3, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        cursor: 'pointer',
    },
    disabled: {
        pointerEvents: 'none',
        opacity: '0.6'
    }
}));

export default useStyles;