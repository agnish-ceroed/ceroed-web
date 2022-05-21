import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(6),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    color: theme.palette.Error.main,
  },
  divider: {
    borderWidth: 2,
    borderColor: theme.palette.text.primary,
    width: '30%',
    margin: theme.spacing(5, 0),
    animation: `$animateLeft 1000ms`,
  },
  primaryColor: {
    color: theme.palette.text.primary,
  },
  animateLeft: {
    position: "relative",
    animation: `$animateLeft 1000ms`,
  },
  animateTop: {
    position: "relative",
    animation: `$animateTop 1000ms`,
  },
  animateRight: {
    position: "relative",
    animation: `$animateRight 1000ms`,
  },
  animateZoom: {
    animation: `$animateZoom 1000ms`,
  },
  "@keyframes animateTop": {
    from: {
      opacity: 0,
      top: 300,
      transform: "scale(0)",
    },
    to: {
      opacity: 1,
      top: 0,
      transform: "scale(1)",
    },
  },
  "@keyframes animateRight": {
    from: {
      opacity: 0,
      right: -300,
      transform: "scale(0)",
    },
    to: {
      opacity: 1,
      right: 0,
      transform: "scale(1)",
    },
  },
  "@keyframes animateLeft": {
    from: {
      opacity: 0,
      left: -300,
      transform: "scale(0)",
    },
    to: {
      opacity: 1,
      left: 0,
      transform: "scale(1)",
    },
  },
}));

export default useStyles;
