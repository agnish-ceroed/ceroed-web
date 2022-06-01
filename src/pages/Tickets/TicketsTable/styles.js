import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: "calc(100vh - 370px)",
  },
  container: {
    padding: 0,
    width: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.white,
    margin: theme.spacing(4,0)
  },
}));

export default useStyles;
