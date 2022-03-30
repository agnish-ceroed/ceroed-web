import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    login: {
        background: theme.backgroundColor,
        minHeight: '100vh'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center'
    },
    loginCard: {
        padding: theme.spacing(6),
        boxShadow: '0px 6px 18px rgb(0 0 0 / 6%)',
        borderRadius: theme.spacing(2),
        margin: theme.spacing(10, 0),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(5),
        }
    },
    button: {
        margin: theme.spacing(3, 0, 5, 0),
    },
    forgotLink: {
        display: 'block',
        paddingBottom: theme.spacing(2)
    }
}));

export default useStyles;