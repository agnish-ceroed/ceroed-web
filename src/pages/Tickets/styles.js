import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
    },
    loader: {
      width: "100%",
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    filterContainer: {
      marginTop: theme.spacing(4)
    }
}));

export default useStyles;