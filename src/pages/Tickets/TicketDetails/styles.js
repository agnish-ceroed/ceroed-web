import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  detailsContainer: {
    flex: 1,
    overflow: "auto",
    padding: theme.spacing(6),
    paddingRight: 0,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.white,
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  ticketInnerContainer: {
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    paddingRight: theme.spacing(6),
  },
  innerContainerWithFooter: {
    height: "calc(100% - 50px)",
  },
  ownerName: {
    marginTop: theme.spacing(3),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(4),
  },
  commentBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  textArea: {
    height: "auto!important",
  },
  commentButton: {
    alignSelf: "flex-end",
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
  },
  secondaryMargin: {
    margin: theme.spacing(0, 5),
  },
  ticketFooter: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(9),
  },
}));

export default useStyles;
