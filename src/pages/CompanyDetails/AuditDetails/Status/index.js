import React from "react";
import { Container } from "@mui/material";
import dayjs from "dayjs";

import CeroInfoPair from "../../../../components/CeroInfoPair";
import useStyles from "./styles";

const Status = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <CeroInfoPair title="Assigned To" value={props.details.assigned_to_name} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Assigned on" value={props.details.assigned_on ? dayjs(props.details.assigned_on).format('DD/MM/YYYY'):''} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Audited By" value={props.details.audited_by_name} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Status" value={props.details.status} classes={{ container: classes.infoContainer}} />
    </Container>
  );
};

export default Status;
