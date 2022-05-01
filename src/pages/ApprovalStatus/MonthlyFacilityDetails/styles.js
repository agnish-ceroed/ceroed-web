import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0, 2),
    height: "100%",
  },
  tableContainer: {
    padding: 0,
    width: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.white,
    marginTop: theme.spacing(5),
  },
  cellContainer: {
    boxShadow: "none",
  },
}));

export default useStyles;
