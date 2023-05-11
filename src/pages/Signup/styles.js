import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    signup: {
        background: theme.palette.Secondary.background,
        minHeight: '100vh'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(5, 0, 0, 0)
    },
    signupContainer: {
        padding: theme.spacing(6),
        boxShadow: '0px 6px 18px rgb(0 0 0 / 6%)',
        borderRadius: theme.spacing(2),
        margin: theme.spacing(10, 0),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(5),
        }
    },
    stepper: {
        padding: theme.spacing(10, 0),
        "& .MuiStepIcon-active": { color: "#78350F" },
      "& .MuiStepIcon-completed": { color: "#78350F" },
    },
    stepperButton : {
        " .css-sghohy-MuiButtonBase-root-MuiButton-root" : {
            color : '#000000 !important',
            backgroundColor : '#000000 !important'
        }
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(5, 0, 0, 0)
    },
    button: {
        margin: theme.spacing(0, 2),
        background:theme.palette.Primary.background,
        "&:hover": {
            backgroundColor:theme.palette.Primary.light,
            color:theme.palette.Primary.main
          },
        
    },
    root: {
        "& .MuiStepIcon-active": { color: theme.palette.Primary.main },
        "& .MuiStepIcon-completed": { color: theme.palette.Primary.main},
        "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" },
        
      }
}));

export default useStyles;
