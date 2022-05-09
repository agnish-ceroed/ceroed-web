import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import _ from "lodash";
import { useSnackbar } from "notistack";

import DashboardLayout from "../../layouts/DashboardLayout";
import CeroTable from "../../components/CeroTable";
import Header from "./Header";
import Status from "./Status";
import { auditStatus } from "../../constants";

import {
  resetRequestAuditData,
  getYearlyAuditSummary,
  requestAudit,
} from "../../redux/actions";
import { STATUS } from "../../redux/constants";

import useStyles from "./styles";

const CurrentYearApproval = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { year } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const auditYearlySummary = useSelector(
    (state) => state.audit.auditYearlySummary.data
  );
  const auditYearlySummaryStatus = useSelector(
    (state) => state.audit.auditYearlySummary.status
  );
  const requestAuditStatus = useSelector(
    (state) => state.audit.requestAudit.status
  );

  const onSelectData = (row) => {
    navigate(`/emissions/${row.id}/year-${year}`);
  };
  const summaryData = _.groupBy(auditYearlySummary.response, "topic");
  const topicKeys = _.keys(summaryData);

  const combustionSummaryColumns = [
    {
      columnKey: "sector",
      columnId: "sector",
      columnHeader: "Sector",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_co2",
      columnId: "total_co2",
      columnHeader: "CO2 (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_ch4",
      columnId: "total_ch4",
      columnHeader: "CH4 (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_n2o",
      columnId: "total_n2o",
      columnHeader: "N2O (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_co2e",
      columnId: "total_co2e",
      columnHeader: "CO2e (tonnes)",
      classes: { column: classes.cellContainer },
    },
  ];

  const waterSummaryColumns = [
    {
      columnKey: "sector",
      columnId: "sector",
      columnHeader: "Sector",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "usage",
      columnId: "usage",
      columnHeader: "Usage",
      classes: { column: classes.cellContainer },
    },
  ];

  useEffect(() => {
    year && dispatch(getYearlyAuditSummary(year));
  }, [dispatch, year]);

  useEffect(() => {
    if (requestAuditStatus === STATUS.SUCCESS) {
      dispatch(resetRequestAuditData());
      enqueueSnackbar("Successfully requested for audit", {
        variant: "success",
      });
    } else if (requestAuditStatus === STATUS.ERROR) {
      dispatch(resetRequestAuditData());
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }, [requestAuditStatus, dispatch, enqueueSnackbar]);

  const onApplyFilter = (year) => {
    navigate(`/audit-status/current-year-approval/${year}`);
  };

  const onRequestAudit = () => {
    dispatch(
      requestAudit({
        auditor_id: auditYearlySummary.actions.auditor_id,
        audit_status_id: auditYearlySummary.audit_status_id,
      })
    );
  };

  const getWaterData = (data) =>
    data.map((item) => ({
      ...item,
      usage: `${item.usage} ${item.unit}`,
    }));

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Header
          onApplyFilter={onApplyFilter}
          selectedYear={year}
          isRequestAuditVisible={
            auditYearlySummary &&
            auditYearlySummary.actions &&
            auditYearlySummary.actions.perform_request_audit &&
            auditYearlySummary.actions.auditor_id
          }
          onRequestAudit={onRequestAudit}
          isLoading={requestAuditStatus === STATUS.RUNNING}
        />
        {auditYearlySummaryStatus !== STATUS.SUCCESS ? (
          <Box className={classes.loader}>
            <Typography variant="h7" component="span">
              {auditYearlySummaryStatus === STATUS.RUNNING
                ? "Loading..."
                : auditYearlySummaryStatus === STATUS.ERROR
                ? "Something went wrong. Please try again later"
                : ""}
            </Typography>
          </Box>
        ) : (
          ""
        )}
        {auditYearlySummaryStatus === STATUS.SUCCESS && (
          <Status
            // status={auditStatus[auditYearlySummary.status]}
            assignedTo={auditYearlySummary.actions.auditor_name}
            auditStatus={auditStatus[auditYearlySummary.status]}
            // noOfTickets="01/04"
          />
        )}
        {auditYearlySummaryStatus === STATUS.SUCCESS && (
          <Container className={classes.tableContainer}>
            <Typography
              variant="h7"
              component="div"
              className={classes.tableHeaderContainer}
            >
              {topicKeys[0]}
            </Typography>
            <CeroTable
              columns={combustionSummaryColumns}
              data={summaryData[topicKeys[0]] || []}
              hasMore={false}
              loading={false}
              onSelectRow={onSelectData}
            />
          </Container>
        )}
        {auditYearlySummaryStatus === STATUS.SUCCESS && topicKeys[1] && (
          <Container className={classes.tableContainer}>
            <Typography
              variant="h7"
              component="div"
              className={classes.tableHeaderContainer}
            >
              {topicKeys[1]}
            </Typography>
            <CeroTable
              columns={waterSummaryColumns}
              data={getWaterData(summaryData[topicKeys[1]] || [])}
              hasMore={false}
              loading={false}
              onSelectRow={onSelectData}
            />
          </Container>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default CurrentYearApproval;
