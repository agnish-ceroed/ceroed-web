import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.white,
        height: '100%',
        width: '100%',
        borderRadius: 14,
        padding: theme.spacing(5, 7),
        position: 'relative',
    },
    innerContainer: {
        // height: 'calc(100% - 80px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '6px'
        },
        '&::-webkit-scrollbar-track': {
            background: 'none'
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.background.darkGray
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.background.darkGray
        }
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        marginTop: theme.spacing(4),
    },
    button: {
        width: 'fit-content',
        height: 42
    },
    buttonPrimary: {
        backgroundColor: theme.palette.text.accent,
    },
    buttonSecondary: {
        color: theme.palette.text.accent,
        marginRight: theme.spacing(4),
    },
    deleteButton: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
        backgroundColor: theme.palette.Primary.main,
        '&:hover': {
            backgroundColor: theme.palette.Primary.dark,
        }
    },
    topContainer: {
        width: '75%',
        margin: theme.spacing(3, 0)
    },
    bottomContainer: {
        width: '75%',
        marginTop: theme.spacing(5),
    },
    previewTitle: {
        margin: theme.spacing(2, 0)
    },
    previewItem: {
        padding: theme.spacing(1, 0)
    },
    tabContainer: {
        marginTop: theme.spacing(4),
    },
}));

export default useStyles;