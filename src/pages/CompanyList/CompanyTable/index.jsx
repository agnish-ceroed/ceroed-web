import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";

import CeroTable from '../../../components/CeroTable';
import useStyles from "./styles";

export const TableColumns = [{
    columnKey: 'name',
    columnId: 'name',
    columnHeader: 'Company',
}, {
    columnKey: 'email',
    columnId: 'email',
    columnHeader: 'Email',
}, {
    columnKey: 'estd_year',
    columnId: 'estd_year',
    columnHeader: 'Estd Year',
}, {
    columnKey: 'goal',
    columnId: 'goal',
    columnHeader: 'Goal',
}]


const CompanyTable = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { companyList, onLoadMore } = props

    const onSelectCompanyData = (company) => {
        navigate(`/companies/${company.company_id}`);
    };

    const getCompanyList = () => companyList.map((item) => ({
        ...item,
        // action: (
        //     <Box className={classes.actionContainer}>
        //         <CeroButton className={classes.editIcon} buttonText="View" onClick={(e) => onSelectCompanyData(e, item.company_id)} />
        //     </Box>
        // ),
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
