import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.text.Primary,
        '&:hover .MuiIconButton-root .MuiButton-outlined': {
            borderColor: theme.palette.Primary.border,
            background: theme.palette.Primary.main,
        },
    },
}));

export default useStyles;