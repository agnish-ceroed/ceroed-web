import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    height: "100%",
    width: "100%",
    background: theme.palette.background.white,
  },
  quillContainer: {
    height: "calc(100% - 44px)",
  },
}));

export default useStyles;
