import { Container } from "@mui/material";
import CeroTable from '../../../components/CeroTable';

import useStyles from "./styles";


export const approvalMonthlySummaryColumns = [{
    columnKey: 'date',
    columnId: 'date',
    columnHeader: 'Year',
},{
    columnKey: 'approved_by',
    columnId: 'approved_by',
    columnHeader: 'Approved by',
}, {
    columnKey: 'requested_by',
    columnId: 'requested_by',
    columnHeader: 'Approval request raised by',
}, {
    columnKey: 'requested_on',
    columnId: 'requested_on',
    columnHeader: 'Approval request raised on',
}, {
    columnKey: 'status',
    columnId: 'status',
    columnHeader: 'Status',
}]

const MonthlySummaryTable = (props) => {
    const classes = useStyles();

    const onSelectApprovalSummaryData = (row) => {
        console.log(row);
    }

    return (
        <Container className={classes.container}>
            <CeroTable
                columns={approvalMonthlySummaryColumns}
                data={props.summaryData}
                hasMore={false}
                loading={false}
                onSelectRow={onSelectApprovalSummaryData}
            />
        </Container>
    );
};

export default MonthlySummaryTable;