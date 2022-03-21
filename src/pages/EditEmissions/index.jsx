import React, {useEffect} from "react";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getEmission, getEmissionInputFormat, listFacilities } from '../../redux/actions';

import DashboardLayout from '../../layouts/DashboardLayout'
import EditPurchasedElectricityForm from './EditPurchasedElectricityForm';
import useStyles from "./styles";
import _ from "lodash";

const EditEmissions = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const emissionData = useSelector(state => state.emission.emissionDetails.data)
    const emissionDataStatus = useSelector(state => state.emission.emissionDetails.status)
    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const emissionInputs = useSelector(state => state.emission.emissionInputs.data)

    const pathNameArr = pathname.split('/')
    const emissionType = pathNameArr[pathNameArr.length - 2]
    const emissionId = pathNameArr[pathNameArr.length - 1]
    
    const onCancel = () => {
        navigate('/emissions/'+emissionType);
    };

    useEffect(() => {
        emissionType && dispatch(getEmissionInputFormat(emissionType))
        dispatch(listFacilities())
        emissionType && emissionId && dispatch(getEmission({emissionType, emissionId}))
    }, [emissionType, emissionId])

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                {emissionDataStatus === 'running' ? <div>Loading</div> :
                emissionDataStatus === 'error' ? <div>Something went wrong, realod again</div> 
                : (emissionType === 'purchased_electricity' && 
                    <EditPurchasedElectricityForm
                        onCancel={onCancel}
                        emissionId={emissionId}
                        facilitiesData={facilitiesData}
                        emissionInputs={emissionInputs}
                        emissionData={emissionData}/>)
                } 
            </Container>
        </DashboardLayout>
    );
};

export default EditEmissions;