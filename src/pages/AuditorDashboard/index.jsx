import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";

import { getCompanyList, getDashboardSummary } from "../../redux/actions";

import DashboardLayout from '../../layouts/DashboardLayout'
import CompanyFilter from "../CompanyList/CompanyListHeader";
import CompanyTable from "../CompanyList/CompanyTable";
import ProfileDetails from "./ProfileDetails";
import { sampleYear } from "../../constants";
import useStyles from "./styles";

const savedPage = { // To be used from the api response
    pageNumber: 1,
};

const DEFAULT_ITEMS_PER_PAGE = 20;

const AuditorDashboard = () => {
    const [filter, setFilter] = useState({ year: sampleYear[0].key });

    const dispatch = useDispatch()
    const classes = useStyles();
    const companyList = useSelector(state => state.company.companyList.data)

    useEffect(() => {
        dispatch(getCompanyList());
        dispatch(getDashboardSummary(filter)) 
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
                <ProfileDetails />
                <CompanyTable companyList={companyList} onLoadMore={onLoadMore} />
            </Container>
        </DashboardLayout>
    )
}

export default AuditorDashboard