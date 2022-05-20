import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip } from "@mui/material";
import dayjs from 'dayjs';

import CeroTable from '../../../components/CeroTable';
import useStyles from "./styles";

export const TableColumns = [{
    columnKey: 'assessment_year',
    columnId: 'assessment_year',
    columnHeader: 'Year',
}, {
    columnKey: 'audited_by',
    columnId: 'audited_by',
    columnHeader: 'Audited by',
}, {
    columnKey: 'audited_on',
    columnId: 'audited_on',
    columnHeader: 'Audited on',
}, {
    columnKey: 'assigned_by',
    columnId: 'assigned_by',
    columnHeader: 'Assigned by',
}, {
    columnKey: 'assigned_to',
    columnId: 'assigned_to',
    columnHeader: 'Assigned to',
}, {
    columnKey: 'assigned_on',
    columnId: 'assigned_on',
    columnHeader: 'Assigned on',
}, {
    columnKey: 'audited_status',
    columnId: 'audited_status',
    columnHeader: 'Status',
}]

const AuditHistory = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { auditData, onLoadMore } = props

    const onSelectAuditData = (audit) => {
        navigate(`/companies/${props.companyId}/audit/${audit.audit_status_id}`);
    };

    const getStatus = (status) => {
        if (status === 'approved') {
            return <Chip label={status} color="primary" variant='outlined' />
        } else if (status === 'audited') {
            return <Chip label={status} color="secondary" variant='outlined' />
        } else if (status === 'reported') {
            return <Chip label={status} color="warning" variant='outlined' />
        } else {
            return <Chip label={status} color="info" variant='outlined' />
        }
    };

    const getAuditList = () => auditData.map((item) => ({
        ...item,
        audited_status: getStatus(item.audited_status),
        audited_on: item.audited_on ? dayjs(item.audited_on).format('DD/MM/YYYY') : '-',
        assigned_on: item.assigned_on ? dayjs(item.assigned_on).format('DD/MM/YYYY') : '-',
        // action: (
        //     <Box className={classes.actionContainer}>
        //         <CeroButton className={classes.editIcon} buttonText="View" onClick={(e) => onSelectAuditData(e, item.company_id)} />
        //     </Box>
        // ),
    }));

    return (
        <CeroTable
            columns={TableColumns}
            data={getAuditList()}
            hasMore={false}
            loading={false}
            loadMore={onLoadMore}
            onSelectRow={onSelectAuditData}
        />
    )
}

export default AuditHistory;
