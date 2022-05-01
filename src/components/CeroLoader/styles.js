import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        width: '100vw',
        postion: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000b5',
        zIndex: 400,
    },
    loaderContainer: {
        width: 200,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.text.primary,
    },
}));

export default useStyles;