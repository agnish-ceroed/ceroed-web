import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getEmission } from '../../redux/actions';

import DashboardLayout from '../../layouts/DashboardLayout'
import PurchasedElectricityDetails from './PurchasedElectricityDetails'
import MobileCombustionDetails from './MobileCombustionDetails'
import StationaryCombustionDetails from './StationaryCombustionDetails'
import RefrigerantsDetails from './RefrigerantsDetails'
import WaterConsumptionDetails from './WaterConsumptionDetails'
import WaterDischargeDetails from './WaterDischargeDetails'
import WasteCombustionDetails from "./WasteCombustionDetails";
import TransportationDetails from "./Transportation";
import useStyles from "./styles";
import _ from "lodash";

const EmissionsDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const emissionData = useSelector(state => state.emission.emissionDetails.data)
    const emissionDataStatus = useSelector(state => state.emission.emissionDetails.status)

    const pathNameArr = pathname.split('/')
    const emissionType = pathNameArr[pathNameArr.length - 2]
    const emissionId = pathNameArr[pathNameArr.length - 1]

    const onCancel = () => {
        navigate('/emissions/' + emissionType);
    };

    useEffect(() => {
        emissionType && emissionId && dispatch(getEmission({ emissionType, emissionId }))
    }, [emissionType, emissionId, dispatch])

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                {(emissionDataStatus === "running") ? (
                    <div>Loading</div>
                ) : emissionDataStatus === "error" ? (
                    <div>Something went wrong, reload again</div>
                ) : (
                    <>
                        {emissionType === "purchased_electricity" && (
                            <PurchasedElectricityDetails
                                onCancel={onCancel}
                                emissionId={emissionId}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "mobile_combustion" && (
                            <MobileCombustionDetails
                                onCancel={onCancel}
                                emissionId={emissionId}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "stationary_combustion" && (
                            <StationaryCombustionDetails
                                onCancel={onCancel}
                                emissionId={emissionId}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "refrigerants" && (
                            <RefrigerantsDetails
                                onCancel={onCancel}
                                emissionId={emissionId}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "transportation" && (
                            <TransportationDetails
                                onCancel={onCancel}
                                emissionId={emissionId}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "water_consumption" && (
                            <WaterConsumptionDetails
                                onCancel={onCancel}
                                emissionId={emissionId}
                                emissionData={emissionData}
                            />)}
                        {emissionType === "water_discharge" && (
                            <WaterDischargeDetails
                                onCancel={onCancel}
                                emissionId={emissionId}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "waste" && (
                            <WasteCombustionDetails
                                onCancel={onCancel}
                                emissionId={emissionId}
                                emissionData={emissionData}
                            />
                        )}
                    </>
                )}
            </Container>
        </DashboardLayout>
    );
};

export default EmissionsDetails;