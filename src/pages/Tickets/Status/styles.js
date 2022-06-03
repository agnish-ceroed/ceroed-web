import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    width: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.white,
    fontSize: 13,
    fontWeight: 500,
    margin: theme.spacing(4, 0),
    position: "relative",
  },
  infoContainer: {
    maxWidth: 400,
  },
  waitingIndicationContainer: {
    height: 10,
    width: 30,
    position: "absolute",
    top: theme.spacing(4),
    right: theme.spacing(4),
  },
  waitingIndication: {
    height: 30,
    width: 30,
    cursor: "pointer",
  },
}));

export default useStyles;
