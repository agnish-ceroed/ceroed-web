import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";

import { getCompanyList } from "../../redux/actions";

import DashboardLayout from '../../layouts/DashboardLayout'
import CompanyFilter from "./CompanyListHeader";
import useStyles from "./styles";
import CompanyTable from "./CompanyTable";

const savedPage = { // To be used from the api response
    pageNumber: 1,
};

const DEFAULT_ITEMS_PER_PAGE = 20;

const CompanyList = () => {
    const [filter, setFilter] = useState({});

    const dispatch = useDispatch()
    const classes = useStyles();
    const companyList = useSelector(state => state.company.companyList.data)

    useEffect(() => {
        dispatch(getCompanyList())
    }, [dispatch])

    const onLoadMore = (pageSize = DEFAULT_ITEMS_PER_PAGE, pageNumber) => {
        const filter = {
            emissionFilter: {},
            page: {
                pageSize,
                pageNumber: pageNumber || (savedPage.pageNumber || 0) + 1,
            }
        };
        // api call with filter
    };


    const onApplyFilter = (filter) => {
        setFilter(filter);
    }

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <CompanyFilter onApplyFilter={onApplyFilter} />
                <CompanyTable companyList={companyList} onLoadMore={onLoadMore} />
            </Container>
        </DashboardLayout>
    )
}

export default CompanyList