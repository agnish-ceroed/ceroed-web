import React from "react";
import { Box } from "@mui/material";

import EmissionTableFilter from "../EmissionTableFilter";
import EmissionSelection from "../EmissionSelection";
import useStyles from "./styles";

const EmissionHeader = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <EmissionSelection
        emissionType={props.emissionType}
        onSelectEmission={props.setEmissionType}
        isDisabled={props.isDisabled}
      />
      <EmissionTableFilter
        emissionType={props.emissionType}
        onAddData={props.onAddData}
        onApplyFilter={props.onApplyFilter}
        filter={props.filter}
        isDisabled={props.isDisabled}
      />
    </Box>
  );
};

export default EmissionHeader;
