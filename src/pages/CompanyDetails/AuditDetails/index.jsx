import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import _ from "lodash";
import { useSnackbar } from "notistack";

import CeroTable from "../../../components/CeroTable";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Header from "./Header";
import {
  getCompanyAuditDetails,
  approveCompanyAudit,
  approveCompanyAuditReset,
  getYearlyAuditStatusSummaryOverview,
} from "../../../redux/actions";
import { STATUS } from "../../../redux/constants";
import CreateTicketDrawer from "../../common/CreateTicketDrawer";
import useStyles from "./styles";
import Status from "./Status";

const AuditDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { company, id, year } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const auditDetailsState = useSelector((state) => state.company.auditDetails);
  const approveAuditStatus = useSelector(
    (state) => state.company.approveAudit.status
  );
  const auditStatusSummaryState = useSelector((state) => state.audit.auditStatusYearlySummaryOverview);

  const auditDetails = auditDetailsState.data;
  const summaryData = _.groupBy(auditDetails.response, "topic");
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
    company &&
      (id || year) &&
      dispatch(getCompanyAuditDetails(company, id, year));
      dispatch(getYearlyAuditStatusSummaryOverview(company, id, year));
  }, [dispatch, company, id, year]);

  useEffect(() => {
    if (auditDetailsState.status === STATUS.ERROR) {
      dispatch(approveCompanyAuditReset());
      enqueueSnackbar(auditDetailsState.message || "Something went wrong", { variant: "error" });
    }
  }, [auditDetailsState, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (approveAuditStatus === STATUS.SUCCESS) {
      dispatch(approveCompanyAuditReset());
      dispatch(getCompanyAuditDetails(company, id, year));
      dispatch(getYearlyAuditStatusSummaryOverview(company, id, year));
      enqueueSnackbar("Successfully approved audit", {
        variant: "success",
      });
    } else if (approveAuditStatus === STATUS.ERROR) {
      dispatch(approveCompanyAuditReset());
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }, [approveAuditStatus, dispatch, enqueueSnackbar, id, company, year]);

  const onApplyFilter = (year) => {
    navigate(`/companies/${company}/year/${year}`);
  };

  const onApproveAudit = () => {
    dispatch(approveCompanyAudit(company, auditDetails.audit_status_id));
  };

  const getWaterData = (data) =>
    data.map((item) => ({
      ...item,
      usage: `${item.usage} ${item.unit}`,
    }));

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Typography className={classes.title}>{`Audit Summary ${auditDetails?.year || ''}`}</Typography>
        <Header
          auditId={id}
          onApplyFilter={onApplyFilter}
          selectedYear={year || auditDetails.year}
          isApproveAuditVisible={auditDetails.status === "pending"}
          onApproveAudit={onApproveAudit}
          onRaiseAuditTicket={() => setIsDrawerOpen(true)}
          isLoading={auditDetailsState === STATUS.RUNNING}
        />
        {auditDetailsState.status !== STATUS.SUCCESS ? (
          <Box className={classes.loader}>
            <Typography variant="h7" component="span">
              {auditDetails === STATUS.RUNNING
                ? "Loading..."
                : auditDetails === STATUS.ERROR
                ? "Something went wrong. Please try again later"
                : ""}
            </Typography>
          </Box>
        ) : (
          ""
        )}
        {auditStatusSummaryState.status === STATUS.SUCCESS && (
          <Status details={auditStatusSummaryState.data} />
        )}
        {auditDetailsState.status === STATUS.SUCCESS && (
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
              onSelectRow={() => {}}
            />
          </Container>
        )}
        {auditDetailsState.status === STATUS.SUCCESS && topicKeys[1] && (
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
              onSelectRow={() => {}}
            />
          </Container>
        )}
        <CreateTicketDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          scope="audit"
          scopeId={id}
          companyId={company}
        />
      </Container>
    </DashboardLayout>
  );
};

export default AuditDetails;
