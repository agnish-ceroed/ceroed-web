import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        height: 'calc(100% - 20px)',
        width: '100%',
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(4),
    },
    questionsListContainer:{
        height: 'calc(100% - 40px)',
        overflow: 'auto',
    },
    accordionHeader: {
        background: theme.palette.Actions.disabled
    },
    secondaryHeader: {
        background: theme.palette.Secondary.background,
        color: theme.palette.text.secondary
    },
    loader: {
      width: "100%",
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
}));

export default useStyles;