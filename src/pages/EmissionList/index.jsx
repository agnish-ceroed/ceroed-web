import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";

import DashboardLayout from '../../layouts/DashboardLayout'
import { getEmissionList } from "../../redux/actions";
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
    const {pathname} = useLocation();
    const emissionData = useSelector(state => state.emission.emissionList.data)
    const emissionType = pathname.substring(pathname.lastIndexOf('/') + 1)

    // const [emissionType, setEmissionType] = useState('stationary_combustion')

    useEffect(() => {
        emissionType !== 'emissions'  ? dispatch(getEmissionList(emissionType)) : navigate('stationary_combustion')
    }, [emissionType])
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

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <EmissionHeader onAddData={() => navigate(`/emissions/add/${emissionType}`)} emissionType={emissionType} setEmissionType={(type) => navigate(`/emissions/${type}`)} />
                <EmissionTable emissionData={emissionData} onLoadMore={onLoadMore} emissionType={emissionType} />
            </Container>
        </DashboardLayout>
    );
};

export default EmissionList;