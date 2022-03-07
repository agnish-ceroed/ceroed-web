import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    searchBoxContainer: {
        display: 'flex',
        alignItems: 'center'
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