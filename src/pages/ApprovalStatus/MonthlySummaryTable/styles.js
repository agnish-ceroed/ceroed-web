import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: 'calc(100vh - 280px)',
  },
  container: {
    padding: 0,
    width: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.white,
  },
}));

export default useStyles;
