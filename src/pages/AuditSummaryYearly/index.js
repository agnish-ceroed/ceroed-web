// import { useDispatch } from "react-redux";
import { Container, Typography } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import CeroTable from "../../components/CeroTable";

import useStyles from "./styles";
import { useNavigate } from "react-router-dom";

const summaryData = [
  {
    year: "2021",
    audited_by: "John Doe",
    requested_by: "Thomas Doe",
    requested_on: "01/12/2021",
    status: "Pending",
  },
  {
    year: "2020",
    audited_by: "Marshal Doe",
    requested_by: "Thomas Doe",
    requested_on: "05/08/2021",
    status: "Audited",
  },
  {
    year: "2019",
    audited_by: "James Doe",
    requested_by: "John Doe",
    requested_on: "02/09/2021",
    status: "Pending",
  },
  {
    year: "2018",
    audited_by: "Carol Doe",
    requested_by: "Susan Doe",
    requested_on: "11/07/2021",
    status: "Audited",
  },
  {
    year: "2017",
    audited_by: "Rose Geller",
    requested_by: "Monica Geller",
    requested_on: "10/10/2021",
    status: "Audited",
  },
  {
    year: "2016",
    audited_by: "Chandler Bing",
    requested_by: "Joy Thomas",
    requested_on: "05/06/2021",
    status: "Audited",
  },
  {
    year: "2015",
    audited_by: "Will Smith",
    requested_by: "Penny Smith",
    requested_on: "06/04/2021",
    status: "Audited",
  },
];

export const auditSummaryColumns = [
  {
    columnKey: "year",
    columnId: "year",
    columnHeader: "Year",
  },
  {
    columnKey: "audited_by",
    columnId: "audited_by",
    columnHeader: "Audited by",
  },
  {
    columnKey: "requested_by",
    columnId: "requested_by",
    columnHeader: "Audit request raised by",
  },
  {
    columnKey: "requested_on",
    columnId: "requested_on",
    columnHeader: "Audit request raised on",
  },
  {
    columnKey: "status",
    columnId: "status",
    columnHeader: "Status",
  },
];

const AuditSummaryYearly = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const onSelectAuditSummaryData = (row) => {
    navigate(`/audit-status/current-year-approval/${row.year}`);
  };

  // useEffect(() => {
  //   dispatch(listFacilities())
  // }, []);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Typography variant="h7" component="span">
          Yearly aggregate
        </Typography>
        <CeroTable
          columns={auditSummaryColumns}
          data={summaryData}
          hasMore={false}
          loading={false}
          onSelectRow={onSelectAuditSummaryData}
          classes={{ tableContainer: classes.tableContainer }}
        />
      </Container>
    </DashboardLayout>
  );
};

export default AuditSummaryYearly;
