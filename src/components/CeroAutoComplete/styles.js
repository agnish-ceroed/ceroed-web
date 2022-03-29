import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(3, 0),
        display: 'flex',
        flexDirection: 'column',
    },
    text: {
        fontSize: 12,
        lineHeight: 1.5,
        fontWeight: 400,
        color: theme.palette.text.secondary,
        textAlign: 'start',
    },
    error: {
        color: theme.palette.Error.main,
    },
    selectError: {
        '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${theme.palette.Error.main}`,
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.Error.main,
        },
        '& .css-czrb7a-MuiFormLabel-root-MuiInputLabel-root,.css-kyi7ki-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
            color: theme.palette.Error.main
        },
        '& .css-j0qy1l-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.Error.main,
        }
    }
}));

export default useStyles;
