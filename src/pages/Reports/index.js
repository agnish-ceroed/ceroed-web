// import { useDispatch } from "react-redux";
import { Container, Typography, Box } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import CeroTable from "../../components/CeroTable";
import CeroButton from "../../components/CeroButton";

import useStyles from "./styles";
// import { useNavigate } from "react-router-dom";

const summaryData = [
  {
    year: "2015",
    reportName: "SASB report 1",
    framework: "SASB",
    country: "India",
    recent: "5 minutes ago",
  },
  {
    year: "2015",
    reportName: "SASB report 2",
    framework: "SASB",
    country: "India",
    recent: "5 minutes ago",
  },
  {
    year: "2015",
    reportName: "SASB report 3",
    framework: "SASB",
    country: "India",
    recent: "5 minutes ago",
  },
  {
    year: "2015",
    reportName: "SASB report 4",
    framework: "SASB",
    country: "India",
    recent: "5 minutes ago",
  },
];

export const auditSummaryColumns = [
  {
    columnKey: "reportName",
    columnId: "reportName",
    columnHeader: "Report Name",
  },
  {
    columnKey: "year",
    columnId: "year",
    columnHeader: "Year",
  },
  {
    columnKey: "framework",
    columnId: "framework",
    columnHeader: "Framework",
  },
  {
    columnKey: "country",
    columnId: "country",
    columnHeader: "Country",
  },
  {
    columnKey: "recent",
    columnId: "recent",
    columnHeader: "Recent activity",
  },
];

const AuditSummaryYearly = () => {
  const classes = useStyles();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const onSelectAuditSummaryData = (row) => {
    //
  };

  const onCreateReport = () => {
    //
  };

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Typography variant="h7" component="span">
          Reports
        </Typography>
        <Box className={classes.buttonContainer}>
          <CeroButton
            buttonText="Create report"
            className={classes.buttonPrimary}
            onClick={onCreateReport}
          />
        </Box>
        <Container className={classes.tableContainer}>
          <CeroTable
            columns={auditSummaryColumns}
            data={summaryData}
            hasMore={false}
            loading={false}
            onSelectRow={onSelectAuditSummaryData}
          />
        </Container>
      </Container>
    </DashboardLayout>
  );
};

export default AuditSummaryYearly;
