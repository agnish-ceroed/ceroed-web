import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 0,
        margin: 0,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    mainContainer: {
        marginTop: theme.spacing(5),
        borderTop: `1px solid ${theme.palette.background.gray}`,
        overflow: 'auto',
    },
    subContainer: {
        paddingTop: theme.spacing(5),
        borderTop: `1px solid ${theme.palette.background.gray}`,
        overflow: 'auto',
    },
    typeItemGroup: {
        borderBottom: `1px solid ${theme.palette.background.gray}`,
    },
    tyupeItemGroupTitle: {
        backgroundColor: theme.palette.Other.background,
        height: 44,
        padding: theme.spacing(2),
    },
    typeItem: {
        height: 46,
        padding: theme.spacing(0, 3),
        borderBottom: `1px solid ${theme.palette.background.gray}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
    }
}));

export default useStyles;