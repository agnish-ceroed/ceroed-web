import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0, 2),
    height: "100%",
  },
  loader: {
    width: "100%",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    backgroundColor: theme.palette.background.white,
    width: "100%",
    height: 'calc(100% - 75px)',
    borderRadius: 14,
    padding: theme.spacing(5, 7),
    marginTop: theme.spacing(5),
    position: "relative",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
  buttonTeritiary: {
    width: 140,
    height: 37,
    fontSize: 13,
  },
  infoContainer: {
    marginTop: theme.spacing(3)
  },
  title: {
      width: '50%'
  }
}));

export default useStyles;
