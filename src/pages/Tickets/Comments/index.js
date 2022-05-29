import { Paper, Grid, Avatar, Typography } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import useStyles from "./styles";
import dayjs from "dayjs";

const Comments = ({ owner, time, description, key }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.commentContainer} key={key}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>
            <PersonOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography sx={{ fontWeight: "bold" }} variant="h7" component="div">
            {owner}
          </Typography>
          <Typography variant="h7">{description}</Typography>
          <Typography
            variant="h7"
            component="div"
            className={classes.time}
          >{`Commented on: ${dayjs(time).format(
            "DD MMM YYYY HH:mm"
          )}`}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comments;
