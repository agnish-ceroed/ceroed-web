import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    height: "100%",
  },
  filterContainer: {
    margin: theme.spacing(5, 0)
  }
}));

export default useStyles;
