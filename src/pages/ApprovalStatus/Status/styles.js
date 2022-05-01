import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    height: 100,
    width: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.white,
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 20,
  },
}));

export default useStyles;
