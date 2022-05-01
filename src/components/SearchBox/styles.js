import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    searchBoxContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    inputRoot: {
        height: 'auto',
    },
    input: {
        height: 'auto',
        padding: theme.spacing(1.5),
    },
    icon: {
        color: `${theme.palette.icon.gray}!important`,
        marginRight: theme.spacing(1)
    },
    inputBox: {
        border: 'none',
        outline: 'none',
        width: '100%',
        height: theme.spacing(2)

    }
}));

export default useStyles;