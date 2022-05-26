import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  tableContainer: {
    padding: 0,
    width: "100%",
    maxHeight: "calc(100% - 40px)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.white,
    marginTop: 20,
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
    marginLeft: theme.spacing(6),
  },
  loader: {
    width: "100%",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
