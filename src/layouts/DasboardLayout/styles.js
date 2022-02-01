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
        flexDirection: 'column'
    },
    childContainer: {
        flex: 1,
        backgroundColor: theme.palette.background.gray,
    }
}));

export default useStyles;