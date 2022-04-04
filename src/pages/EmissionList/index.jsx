import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";

import DashboardLayout from '../../layouts/DashboardLayout'
import { clearEmissionList, getEmissionList } from "../../redux/actions";
import EmissionTable from "./EmissionTable";
import EmissionHeader from "./EmissionHeader";
import useStyles from "./styles";

const savedPage = { // To be used from the api response
    pageNumber: 1,
};

const DEFAULT_ITEMS_PER_PAGE = 20;

const EmissionList = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const emissionData = useSelector(state => state.emission.emissionList.data)
    const emissionType = pathname.substring(pathname.lastIndexOf('/') + 1);

    const [filter, setFilter] = useState({});

    useEffect(() => {
        emissionType !== 'emissions'  ? onLoadMore(DEFAULT_ITEMS_PER_PAGE, 1) : navigate('stationary_combustion');
        return () => {
            clearEmissionList();
        }
    }, [emissionType]);

    useEffect(() => {
        onLoadMore(DEFAULT_ITEMS_PER_PAGE, 1);
        return () => {
            clearEmissionList();
        }
    }, [filter])

    const onLoadMore = (limit = DEFAULT_ITEMS_PER_PAGE, pageNumber) => {
        const filterRequest = {
            limit,
            skip: ((pageNumber || ((savedPage.pageNumber || 0) + 1)) - 1)  * limit,
            ...filter
        };
        dispatch(getEmissionList(emissionType, filterRequest))
    };

    const onApplyFilter = (filter) => {
        setFilter(filter);
    }

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <EmissionHeader
                    onApplyFilter={onApplyFilter}
                    onAddData={() => navigate(`/emissions/add/${emissionType}`)}
                    emissionType={emissionType || 'stationary_combustion'}
                    setEmissionType={(type) => navigate(`/emissions/${type}`)}
                />
                <EmissionTable emissionData={emissionData} onLoadMore={onLoadMore} emissionType={emissionType} />
            </Container>
        </DashboardLayout>
    );
};

export default EmissionList;