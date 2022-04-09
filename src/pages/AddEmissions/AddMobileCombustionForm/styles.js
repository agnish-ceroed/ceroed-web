import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.white,
        height: '100%',
        width: '100%',
        borderRadius: 14,
        padding: theme.spacing(5, 7),
        position:'relative',
    },
    innerContainer: {
        height: 'calc(100% - 80px)',
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
    title: {
        marginBottom: theme.spacing(3),
    },
    buttonContainer: {
        position:'absolute',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
    },
    button: {
        width: 160,
        height: 42
    },
    buttonPrimary: {
        backgroundColor: theme.palette.text.accent,
    },
    buttonSeconday: {
        color: theme.palette.text.accent,
        marginRight: theme.spacing(5),
    },
    topContainer: {
        width: '75%'
    },
    bottomContainer: {
        width: '75%',
        marginTop: theme.spacing(5),
    },
    previewTitle: {
        marginBottom: theme.spacing(3)
    },
    previewItem: {
        margin: theme.spacing(1, 0),
        fontSize: 15
    }
}));

export default useStyles;
