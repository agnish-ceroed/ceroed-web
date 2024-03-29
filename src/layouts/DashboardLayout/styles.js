import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    dashboardContainer: {
        height: '100vh',
        display: 'flex',
        width: '100%'
    },
    rightContainer: {
        width: 'calc(100vw - 250px)',
        display: 'flex',
        flexDirection: 'column',
    },
    childContainer: {
        flex: 1,
        background: theme.palette.Secondary.background,
        padding: theme.spacing(5, 5, 0, 5),
        height: 'calc(100% - 60px)',
        overflowY: 'scroll',
    }
}));

export default useStyles;