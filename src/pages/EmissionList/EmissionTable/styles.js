import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        maxHeight: 'calc(100vh - 208px)',
    },
    actionContainer: {
        display: 'flex',
    },
    button: {
        backgroundColor: theme.palette.Secondary.main,
    },
    editIcon: {
        marginLeft: theme.spacing(3)
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