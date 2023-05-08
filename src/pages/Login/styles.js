import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    login: {
        background: theme.palette.Secondary.background,
        maxHeight: '100vh',
        display: 'flex',
        gap:'2px'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center'
    },
    loginCard: {
        padding: theme.spacing(6),
        margin: theme.spacing(2, 0),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(5),
        }
    },
    button: {
        margin: theme.spacing(7, 0, 5, 0),
        background:theme.palette.Primary.background,
        width:"100%",
    },
    buttonActive: {
        margin: theme.spacing(2, 0, 5, 0),
        background:theme.palette.Primary.background,
        width:"100%",
        borderRadius:"0 !important"
    },
    buttonInactive: {
        margin: theme.spacing(2, 0, 5, 0),
        color:theme.palette.Primary.main,
        background:theme.palette.Primary.light,
        width:"100%",
        borderRadius:"0 !important"
    },
    
    forgotLink: {
        display: 'block',
        paddingBottom: theme.spacing(2),
        color:theme.palette.Primary.main,
        textDecoration:"none",
        margin: theme.spacing(0, 0, 0, 68),
        fontWeight:"500",
        fontSize:"12px"
    },
    newUser:{
        color:theme.palette.Primary.main,
        textDecoration:"none",
        margin: theme.spacing(5, 0, 0, 25),
    },
    leftSide : {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    leftSideLogo : {
        height : '100vh',
        width: '100%',
        padding : '20px 0px',
        objectFit : 'contain'

    },
    rightSide : {
        width: '50%',
    },
    options:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    }
}));

export default useStyles;