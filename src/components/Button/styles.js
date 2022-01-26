import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        width: 40,
        height: 26,
        border: '1px solid',
        borderColor: theme.palette.Primary.border,
        color: theme.palette.text.secondary,
        '&:hover .MuiIconButton-root .MuiButton-outlined': {
            borderColor: theme.palette.Primary.border,
            background: theme.palette.Primary.background,
        },
    },
}));

export default useStyles;