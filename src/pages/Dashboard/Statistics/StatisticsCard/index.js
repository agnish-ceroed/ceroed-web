import React from "react";
import { Card, CardContent, Grid, Tooltip, Zoom } from "@mui/material";

import useStyles from "./styles";
import { Box } from "@mui/system";

const StatisticsCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes[`colors${props.index}`]}>
      <Tooltip title={props.subtitle} placement="top" arrow TransitionComponent={Zoom}>
        <CardContent className={classes.cardComponent}>
          <Box className={classes.title}>
            <Box>{props.title}</Box>
          </Box>
          <Grid container justifyContent={"center"} spacing={5}>
            {props.attributes.map((attribute) => (
              <Grid item>
                <Box className={classes.valueContainer}>
                  <Box className={classes.value}>{attribute.value}</Box>
                  <Box className={classes.name}>{attribute.name}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Tooltip>
    </Card>
  );
};

export default StatisticsCard;
