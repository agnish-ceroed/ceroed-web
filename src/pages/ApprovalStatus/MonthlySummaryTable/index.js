import { Container, Box } from "@mui/material";
import CeroTable from "../../../components/CeroTable";
import { months } from "../../../constants";
import dayjs from "dayjs";

import useStyles from "./styles";

export const approvalMonthlySummaryColumns = [
  {
    columnKey: "yearData",
    columnId: "yearData",
    columnHeader: "Year",
  },
  {
    columnKey: "assigned_by_name",
    columnId: "assigned_by_name",
    columnHeader: "Assigned by",
  },
  {
    columnKey: "facility_name",
    columnId: "facility_name",
    columnHeader: "Facility",
  },
  {
    columnKey: "assigned_to_name",
    columnId: "assigned_to_name",
    columnHeader: "Assignee",
  },
  {
    columnKey: "requested_on",
    columnId: "requested_on",
    columnHeader: "Approval request raised on",
  },
  {
    columnKey: "submitted_by_name",
    columnId: "submitted_by_name",
    columnHeader: "Approval Submitted by",
  },
  {
    columnKey: "status",
    columnId: "status",
    columnHeader: "Status",
  },
];

const MonthlySummaryTable = (props) => {
  const classes = useStyles();
  const { onSelectApprovalSummaryData, summaryData } = props;

  const getSummaryData = () =>
    summaryData.map((item) => ({
      ...item,
      requested_on: dayjs(item.assigned_on).format('DD/MM/YYYY'),
      yearData: (
        <Box className={classes.actionContainer}>
          {`${months.find((month) => month.key === item.month)?.value} ${
            item.year
          }`}
        </Box>
      ),
    }));

  return (
    <Container className={classes.container}>
      <CeroTable
        columns={approvalMonthlySummaryColumns}
        data={getSummaryData()}
        hasMore={false}
        loading={false}
        onSelectRow={onSelectApprovalSummaryData}
        classes={{ tableContainer: classes.tableContainer }}
      />
    </Container>
  );
};

export default MonthlySummaryTable;
