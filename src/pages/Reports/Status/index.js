import { Container } from "@mui/material";
import dayjs from "dayjs";

import CeroInfoPair from "../../../components/CeroInfoPair";
import useStyles from "./styles";

const Status = ({reportDetails}) => {
  const classes = useStyles();


  return (
    <Container className={classes.container}>
      <CeroInfoPair title="Framework" value={reportDetails.framework_name} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Created By" value={reportDetails.created_by_name} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Created on" value={reportDetails.created_ts && dayjs(reportDetails.created_ts).format('DD MMM YYYY HH:mm')} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Last updated on" value={reportDetails.last_updated_ts && dayjs(reportDetails.last_updated_ts).format('DD MMM YYYY HH:mm')} classes={{ container: classes.infoContainer}} />
    </Container>
  );
};

export default Status;
