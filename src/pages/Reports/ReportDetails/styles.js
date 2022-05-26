import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    height: "100%",
    display: 'flex',
    flexDirection: 'column'
  },
  detailsContainer: {
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing(4),
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.white,
    marginBottom: theme.spacing(2),
  },
  loader: {
    width: "100%",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonPrimary: {
    backgroundColor: theme.palette.text.accent,
    width: 140,
    height: 37,
    fontSize: 13,
  },
  buttonSecondary: {
    color: theme.palette.text.accent,
    borderColor: theme.palette.text.accent,
    width: 140,
    height: 37,
    fontSize: 13,
    margin: theme.spacing(0, 5),
  },
}));

export default useStyles;
