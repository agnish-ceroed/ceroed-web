import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    drawerContentArea: {
        padding: theme.spacing(4),
        overflow: 'auto',
        display: 'flex',
        justifyContent:'center'
    },
    textAreaContainer: {
        margin: theme.spacing(6, 0),
        height: 'auto'
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '70%',
    },
    title: {
        fontSize: 15,
        fontWeight: 600,
        marginTop: theme.spacing(2),
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(10),
    },
    buttonContainer: {
        width: 200,
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default useStyles;