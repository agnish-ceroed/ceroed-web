import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import StatisticsCard from "./StatisticsCard";
import { getDashboardStatistics } from "../../../redux/actions/dashboard";
import useStyles from "./styles";

const statsKeys = [
  "approval_statistics",
  "assigned_ticket_statistics",
  "audit_statistics",
  "facility_statistics",
  "owned_ticket_statistics",
  "ticket_statistics",
  "user_statistics",
];

const Statistics = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const statisticsData = useSelector(
    (state) => state.dashboard.getStatistics.data
  );
  const formattedDataKeys = Object.keys(statisticsData).filter((item) =>
    statsKeys.includes(item)
  );

  useEffect(() => {
    dispatch(getDashboardStatistics(props.filter));
  }, [dispatch, props.filter]);

  const getAttributes = (values, key) => ({
    title: key,
    ...values[key],
  });

  return (
    <Grid container spacing={5} className={classes.container}>
      {formattedDataKeys.map((item, index) => {
        const attributes = Object.keys(statisticsData[item]).filter(
          (item) => item !== "prop"
        );
        return (
          <Grid item className={classes.cardItem} xs={4}>
            <StatisticsCard
              index={index}
              title={statisticsData[item]?.prop?.title}
              subtitle={statisticsData[item]?.prop?.description}
              attributes={attributes.map((key) =>
                getAttributes(statisticsData[item], key)
              )}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Statistics;
