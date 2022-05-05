import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";

import CeroTable from '../../../components/CeroTable';
import useStyles from "./styles";
import CeroButton from '../../../components/CeroButton';

export const TableColumns = [{
    columnKey: 'company_name',
    columnId: 'company_name',
    columnHeader: 'Company',
}, {
    columnKey: 'company_email',
    columnId: 'company_email',
    columnHeader: 'Email',
}, {
    columnKey: 'company_estd_year',
    columnId: 'company_estd_year',
    columnHeader: 'Estd Year',
}, {
    columnKey: 'company_goal',
    columnId: 'company_goal',
    columnHeader: 'Goal',
}, {
    columnKey: 'action',
    columnId: 'action',
    columnHeader: '',
}]


const CompanyTable = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { companyList, onLoadMore } = props

    const onSelectCompanyData = (company) => {
        navigate(`/company/${company.company_id}`);
    };

    const getCompanyList = () => companyList.map((item) => ({
        ...item,
        action: (
            <Box className={classes.actionContainer}>
                <CeroButton className={classes.editIcon} buttonText="View" onClick={(e) => onSelectCompanyData(e, item.company_id)} />
            </Box>
        ),
    }));

    return (
        <CeroTable
            columns={TableColumns}
            data={getCompanyList()}
            hasMore={false}
            loading={false}
            loadMore={onLoadMore}
            onSelectRow={onSelectCompanyData}
            classes={{ tableContainer: classes.tableContainer }}
        />
    )
}

export default CompanyTable;
