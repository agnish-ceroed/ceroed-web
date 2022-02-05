import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    dasboardContainer: {
        height: '100vh',
        display: 'flex',
        width: '100%'
    },
    rightContainer:{
        width: 'calc(100vw - 250px)',
        display: 'flex',
        flexDirection: 'column',
    },
    childContainer: {
        flex: 1,
        background: theme.palette.Secondary.background,
        padding: '20px',
        boxShadow: `inset 0 4px 4px rgba(0, 0, 0, 0.25)`
    }
}));

export default useStyles;