import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0, 2),
    height: "100%",
  },
  tableContainer: {
    maxHeight: "calc(100vh - 120px)",
    marginTop: theme.spacing(5),
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
