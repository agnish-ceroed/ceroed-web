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
}));

export default useStyles;