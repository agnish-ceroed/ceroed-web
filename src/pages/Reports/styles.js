import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
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
    width: 160,
    height: 42,
    fontSize: 13,
    backgroundColor: theme.palette.text.accent,
  },
}));

export default useStyles;
