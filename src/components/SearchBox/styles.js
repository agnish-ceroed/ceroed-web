import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    searchBoxContainer: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.white,
        display: 'flex',
        alignItems: 'center',
        height: '36px',
    },
    icon: {
        color: `${theme.palette.icon.gray}!important`,
    },
    inputBox: {
        border: 'none',
        outline: 'none',
        width: '100%'
    }
}));

export default useStyles;