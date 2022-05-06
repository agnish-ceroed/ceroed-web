import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    drawerConainer: {
        width: '256px',
        height: '100%',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    },
    drawer: {
        width: '256px',
        height: '100%'
    },
    drawerCanvas: {
        width: '256px',
        height: '100%',
    },
    icon: {
        minWidth: 35,
        color: `${theme.palette.icon.gray}!important`,
    },
    activeOption: {
        minWidth: 35,
        color: `${theme.palette.text.accent}!important`,
    },
    title: {
        width: '100%',
        height: '60px',
        padding: theme.spacing(2, 4),
        color: theme.palette.text.accent,
        borderBottom: `1px solid ${theme.palette.border.gray}`,
    },
    titleText: {
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '18px',
    },
    userContainer: {
        padding: theme.spacing(4, 4),
        display: 'flex',
        alignItems: 'center',
    },
    avatarContainer: {
        height: '46px',
        width: '46px',
        marginRight: theme.spacing(5),
    },
    avatar: {
        height: '100%',
        width: '100%',
        borderRadius: '100%',
    },
    userInfoContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    secodaryOptions: {
        borderTop: `1px solid ${theme.palette.border.gray}`,
        marginTop: theme.spacing(2.5),
        paddingTop: theme.spacing(2.5),
    }
}));

export default useStyles;