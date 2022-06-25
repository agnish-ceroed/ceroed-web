import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    width: "100%",
    padding: 0,
  },
  filterContainer: {
    paddingTop: theme.spacing(2),
    width: "100%",
  },
  yearContainer: {
    display: "flex",
    width: "50%",
    paddingTop: theme.spacing(2)
  },
  buttonContainer: {
    display: "flex",
    paddingTop: theme.spacing(2)
  },
  dropdown: {
    width: 82,
    marginRight: theme.spacing(6),
  },
  monthsDropdown: {
    width: 120,
    marginRight: theme.spacing(6),
  },
  facilityDropdown: {
    width: 150,
    marginRight: theme.spacing(6),
  },
  buttonPrimary: {
    backgroundColor: theme.palette.text.accent,
    width: 'fit-content',
    height: 37,
    fontSize: 13,
  },
  buttonSecondary: {
    color: theme.palette.text.accent,
    borderColor: theme.palette.text.accent,
    width: 'fit-content',
    height: 37,
    fontSize: 13,
    margin: theme.spacing(0, 2),
  },
  requestApproval: {
    width: 163,
  }
}));

export default useStyles;
