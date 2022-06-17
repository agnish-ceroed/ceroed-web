import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    paddingBottom: theme.spacing(3),
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  detailsContainer: {
    flex: 1,
    minHeight: 'calc( 100vh + 30px )',
    overflow: "hidden",
    padding: theme.spacing(4),
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.white,
    position: "relative",
    margin: 0,
  },
  loader: {
    width: "100%",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  },
  buttonSecondary: {
    color: theme.palette.text.accent,
    borderColor: theme.palette.text.accent,
    width: 140,
    height: 37,
    fontSize: 13,
    margin: theme.spacing(0, 5),
  },
  buttonTeritiary:{
    height: 37,
    fontSize: 13,
    margin: theme.spacing(0, 5),
  },
  editorContainer: {
    height: "calc(100% - 50px)",
    width: "100%",
  },
  saveButton: {
    float: "right",
    marginTop: theme.spacing(2),
  },
  tooltip: {
    position: "absolute",
    top: theme.spacing(3),
    right: theme.spacing(3),
    cursor: "pointer",
    color: theme.palette.text.accent,
  },
  footer: {
    marginTop: theme.spacing(3)
  }
}));

export default useStyles;
