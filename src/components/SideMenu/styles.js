import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    drawerConainer: {
        width: '256px',
        height: '100%',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    },
    drawer: {
        width: '100%',
        height: '100%'
    },
    drawerCanvas: {
        width: '256px',
        height: '100%',
    },
    icon: {
        color: `${theme.palette.icon.gray}!important`,
    },
    activeOption: {
        color: `${theme.palette.text.accent}!important`,
    },
    title: {
        width: '100%',
        height: '60px',
        padding: '16px',
        color: theme.palette.text.accent,
        borderBottom: `1px solid ${theme.palette.border.gray}`
    },
    userContainer: {
        padding: '30px 16px',
        display: 'flex',
        alignItems: 'center',
    },
    avatarContainer: {
        height: '46px',
        width: '46px',
        marginRight: '20px'
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
        marginTop: '10px',
        paddingTop: '10px',
    }
}));

export default useStyles;