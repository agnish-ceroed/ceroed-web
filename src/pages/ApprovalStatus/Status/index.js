import { useEffect } from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { getApprovalDetails } from "../../../redux/actions";
import CeroInfoPair from "../../../components/CeroInfoPair";
import useStyles from "./styles";

const Status = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const approvalSummaryDetails = useSelector( (state) => state.approval.approvalDetails.data );

  useEffect(() => {
    dispatch(getApprovalDetails(props.year));
  }, [props.year, dispatch]);

  return (
    <Container className={classes.container}>
      <CeroInfoPair title="Assigned By" value={approvalSummaryDetails.assigned_by} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Assigned on" value={dayjs(approvalSummaryDetails.assigned_on).format('DD/MM/YYYY')} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Audited By" value={approvalSummaryDetails.audited_by_name} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Audited on" value={approvalSummaryDetails.audited_on ? dayjs(approvalSummaryDetails.audited_on).format('DD/MM/YYYY'): ''} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Status" value={approvalSummaryDetails.audited_status} classes={{ container: classes.infoContainer}} />
    </Container>
  );
};

export default Status;
