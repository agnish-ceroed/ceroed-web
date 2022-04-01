import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    header: {
        width: '100%',
        height: '60px',
        padding: '0px 30px;',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: `0 4px 4px rgb(0 0 0 / 10%)`,
        zIndex: 99
    },
    icon: {
        color: `${theme.palette.icon.gray}!important`,
    },
    searchBoxContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    searchBox: {
        border: 'none',
        outline: 'none',

    },
    notificationIcon: {
        color: `${theme.palette.icon.gray}!important`,
    },
}));

export default useStyles;