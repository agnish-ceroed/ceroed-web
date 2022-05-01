import { Container, Box } from "@mui/material";
import CeroTable from "../../../components/CeroTable";
import { months } from "../../../constants";

import useStyles from "./styles";

export const approvalMonthlySummaryColumns = [
  {
    columnKey: "yearData",
    columnId: "yearData",
    columnHeader: "Year",
  },
  {
    columnKey: "approved_by",
    columnId: "approved_by",
    columnHeader: "Approved by",
  },
  {
    columnKey: "requested_by",
    columnId: "requested_by",
    columnHeader: "Approval request raised by",
  },
  {
    columnKey: "requested_on",
    columnId: "requested_on",
    columnHeader: "Approval request raised on",
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
      />
    </Container>
  );
};

export default MonthlySummaryTable;
