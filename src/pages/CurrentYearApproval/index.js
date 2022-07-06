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
  getYearlyAuditSummaryOverview,
} from "../../redux/actions";
import { STATUS } from "../../redux/constants";

import useStyles from "./styles";

const CurrentYearApproval = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { year } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const queryParams = new URLSearchParams(window.location.search);
  const statusId = queryParams.get("id");

  const auditYearlySummary = useSelector(
    (state) => state.audit.auditYearlySummary.data
  );
  const auditYearlySummaryOverView = useSelector(
    (state) => state.audit.auditYearlySummaryOverview.data
  );
  const auditYearlySummaryStatus = useSelector(
    (state) => state.audit.auditYearlySummary.status
  );
  const requestAuditStatus = useSelector(
    (state) => state.audit.requestAudit.status
  );

  const onSelectData = (row) => {
    navigate(`/emissions/${row.type}/?year=${year}`);
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

  const generalColumnConfig = [
    {
      columnKey: "sector",
      columnId: "sector",
      columnHeader: "Sector",
      classes: { column: classes.generalCellContainer },
    },
    {
      columnKey: "detailsColumn",
      columnId: "detailsColumn",
      columnHeader: "Details",
      classes: { column: classes.cellContainer },
    },
  ];

  useEffect(() => {
    if (year) {
      dispatch(getYearlyAuditSummary(year));
      dispatch(getYearlyAuditSummaryOverview(year));
    }
  }, [dispatch, year]);

  useEffect(() => {
    statusId && dispatch(getYearlyAuditSummary({ statusId }));
  }, [dispatch, statusId]);

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

  const getData = (columnData) => {
    if (columnData.type === "development_training") {
      return `Attended: ${columnData.attended}, Hours: ${columnData.hours}`;
    } else if (
      columnData.type === "employee_health_safety_incident_record" ||
      columnData.type === "discrimination_incident_record"
    ) {
      return `Affected: ${columnData.affected}`;
    } else if (
      columnData.type === "worker_safety_training_procedures" ||
      columnData.type === "operational_human_rights_training" ||
      columnData.type === "anti_corruption_training" ||
      columnData.type === "social_engagement_human_rights_training"
    ) {
      return `Attended: ${columnData.attended}`;
    } else if (
      columnData.type === "political_contributions" ||
      columnData.type === "subsidies_financial_assistance"
    ) {
      return `Amount: ${columnData.amount}`;
    } else return `Records: ${columnData.records}`;
  };

  const getGeneralTableData = (data) =>
    data.map((item) => ({
      ...item,
      detailsColumn: getData(item),
    }));

  const getColumnConfig = (topic) => {
    if (topic === "Green house gas emissions") {
      return combustionSummaryColumns;
    } else if (topic === "Water & Waste") {
      return waterSummaryColumns;
    } else return generalColumnConfig;
  };

  const getTableData = (topic) => {
    if (topic === "Green house gas emissions") {
      return summaryData[topic];
    } else if (topic === "Water & Waste") {
      return getWaterData(summaryData[topic]);
    } else {
      return getGeneralTableData(summaryData[topic]);
    }
  };

  const getTable = () => {
    return topicKeys.map((topic) => {
      return (
        <Container className={classes.tableContainer} key={topic}>
          <Typography
            variant="h7"
            component="div"
            className={classes.tableHeaderContainer}
          >
            {topic}
          </Typography>
          <CeroTable
            columns={getColumnConfig(topic)}
            data={getTableData(topic) || []}
            hasMore={false}
            loading={false}
            onSelectRow={onSelectData}
          />
        </Container>
      );
    });
  };
  
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
          statusId={auditYearlySummary && auditYearlySummary.audit_status_id}
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
        {auditYearlySummaryStatus === STATUS.SUCCESS &&
          !!auditYearlySummary.response?.length && (
            <Status
              status={auditStatus[auditYearlySummaryOverView.status]}
              assignedTo={auditYearlySummaryOverView.assigned_to_name}
              auditedBy={auditYearlySummaryOverView.audited_by_name}
              auditedOn={auditYearlySummaryOverView.audited_on}
              noOfTickets={auditYearlySummaryOverView.total_tickets}
            />
          )}
        {auditYearlySummaryStatus === STATUS.SUCCESS &&
          topicKeys &&
          topicKeys.length &&
          getTable()}
      </Container>
    </DashboardLayout>
  );
};

export default CurrentYearApproval;
