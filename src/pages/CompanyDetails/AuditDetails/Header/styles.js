import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    width: "100%",
    paddingTop: 20,
    display: 'flex',
  },
  filterContainer: {
    paddingTop: 20,
    width: "100%",
  },
  yearContainer: {
    display: "flex",
  },
  ticketContainer:{
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  dropdown: {
    width: 82,
    marginRight: theme.spacing(6),
  },
  buttonPrimary: {
    backgroundColor: theme.palette.text.accent,
    width: 140,
    height: 37,
    fontSize: 13,
    marginLeft: theme.spacing(6),
  },
  buttonSecondary: {
    color: theme.palette.text.accent,
    borderColor: theme.palette.text.accent,
    width: 155,
    height: 37,
    fontSize: 13,
    marginRight: theme.spacing(2)
  },
  backbuttonContainer: {
    marginRight: theme.spacing(2),
  }
}));

export default useStyles;
