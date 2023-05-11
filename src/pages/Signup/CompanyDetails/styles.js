import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
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
    backButton:{
        backgroundColor:theme.palette.Primary.light,
            color:theme.palette.Primary.main,
            "&:hover": {
                backgroundColor:theme.palette.Primary.main,
                color:theme.palette.Primary.contrastText
              },
    }
}));

export default useStyles;
