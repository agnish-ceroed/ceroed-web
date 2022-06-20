import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    padding: theme.spacing(2),
    width: 400,
    minHeight: 200,
    maxHeight: 425,
  },
  scrollContainer: {
    maxHeight: 400,
    width: "100%",
    overflow: "auto",
  },
  markAll: {
    textAlign: "right",
    fontSize: 12,
    color: theme.palette.text.accent,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  label: {
    fontSize: "12px!important",
    color: theme.palette.text.accent,
    cursor: "pointer",
    margin: 0,
  },
  menuItem: {
    width: "100%",
    minHeight: 50,
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.border.gray}`,
    "&:hover": {
      background: theme.palette.Secondary.background,
    },
  },
  menuItemEnabled: {
    cursor: "pointer",
  },
  menuItemDisabled: {
    cursor: "not-allowed",
  },
  unread: {
    width: 10,
    height: 10,
    padding: theme.spacing(2),
  },
  hidden: {
    visibility: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  empty: {
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    "&.MuiMenu-root": {
      padding: 0,
    },
  },
}));

export default useStyles;
