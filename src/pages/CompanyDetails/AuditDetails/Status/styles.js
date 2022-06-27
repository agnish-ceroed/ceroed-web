import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    width: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.white,
    fontSize: 13,
    fontWeight: 500,
    margin: theme.spacing(3, 0, 5, 0),
  },
  infoContainer: {
    maxWidth: 400,
  }
}));

export default useStyles;
