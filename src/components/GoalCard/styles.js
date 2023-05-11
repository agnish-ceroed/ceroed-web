import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

    goalCard: {
        padding: theme.spacing(4),
        cursor: 'pointer',
        width: '100%',
        margin: theme.spacing(1, 0),
        '&.MuiPaper-root:hover': {
            background: theme.palette.Primary.light
        },
        borderColor:theme.palette.Primary.main
    },
    active: {
        '&.MuiPaper-root': {
            background: theme.palette.Primary.light
        },
    }
}));

export default useStyles;
