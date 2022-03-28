import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 0,
        width: '100%',
        // height: '100%'
    },
    gridContainer: {
        height: 'calc(100% - 64px)',
    }
}));

export default useStyles;