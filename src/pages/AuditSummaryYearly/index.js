import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import CeroTable from "../../components/CeroTable";
import { auditStatus } from "../../constants";
import { useNavigate } from "react-router-dom";

import { getAuditSummary } from "../../redux/actions/audit";
import { STATUS } from "../../redux/constants";

import useStyles from "./styles";

export const auditSummaryColumns = [
  {
    columnKey: "assessment_year",
    columnId: "assessment_year",
    columnHeader: "Year",
  },
  {
    columnKey: "audited_by",
    columnId: "audited_by",
    columnHeader: "Audited by",
  },
  {
    columnKey: "audited_on",
    columnId: "audited_on",
    columnHeader: "Audited on",
  },
  {
    columnKey: "assigned_by",
    columnId: "assigned_by",
    columnHeader: "Audit request raised by",
  },
  {
    columnKey: "assigned_on",
    columnId: "assigned_on",
    columnHeader: "Audit request raised on",
  },
  {
    columnKey: "audited_status",
    columnId: "audited_status",
    columnHeader: "Status",
  },
];

const AuditSummaryYearly = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auditSummary = useSelector(
    (state) => state.audit.auditSummaryList.data
  );
  const auditSummaryStatus = useSelector(
    (state) => state.audit.auditSummaryList.status
  );

  const onSelectAuditSummaryData = (row) => {
    navigate(`/audit-status/current-year-approval/${row.assessment_year}`);
  };

  const getAuditData = () =>
    auditSummary.map((item) => ({
      ...item,
      audited_status: auditStatus[item.audited_status],
      audited_on: item.audited_on
        ? new Date(item.audited_on).toDateString()
        : "",
      assigned_on: item.assigned_on
        ? new Date(item.assigned_on).toDateString()
        : "",
    }));

  useEffect(() => {
    dispatch(getAuditSummary());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Typography variant="h7" component="span">
          Yearly aggregate
        </Typography>
        {auditSummaryStatus === STATUS.SUCCESS ? (
          <CeroTable
            columns={auditSummaryColumns}
            data={getAuditData()}
            hasMore={false}
            loading={false}
            onSelectRow={onSelectAuditSummaryData}
            classes={{ tableContainer: classes.tableContainer }}
          />
        ) : (
          <Box className={classes.loader}>
            <Typography variant="h7" component="span">
              {auditSummaryStatus === STATUS.RUNNING
                ? "Loading..."
                : auditSummaryStatus === STATUS.ERROR
                ? "Something went wrong. Please try again later"
                : ""}
            </Typography>
          </Box>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default AuditSummaryYearly;
