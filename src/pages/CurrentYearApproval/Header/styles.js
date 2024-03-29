import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    width: "100%",
    padding: 0,
  },
  filterContainer: {
    paddingTop: 20,
    width: "100%",
  },
  yearContainer: {
    display: "flex",
    alignItems: 'center'
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
    marginLeft: theme.spacing(5),
  },
  buttonSecondary: {
    color: theme.palette.text.accent,
    borderColor: theme.palette.text.accent,
    width: 155,
    height: 37,
    fontSize: 13,
  },
}));

export default useStyles;
