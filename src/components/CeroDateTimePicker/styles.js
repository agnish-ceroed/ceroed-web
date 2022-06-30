import makeStyles from '@mui/styles/makeStyles';

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
  errorInput: {
    '& .MuiInput': {
      borderColor: theme.palette.Error.main,
    },
  },
  error: {
    color: theme.palette.Error.main,
  },
}));

export default useStyles;
