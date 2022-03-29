import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getEmission } from '../../redux/actions';

import DashboardLayout from '../../layouts/DashboardLayout'
import PurchasedElectricityDetails from './PurchasedElectricityDetails'
import useStyles from "./styles";
import _ from "lodash";

const EmissionsDetails = () => {
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
        navigate('/emissions/' + emissionType);
    };

    useEffect(() => {
        emissionType && emissionId && dispatch(getEmission({ emissionType, emissionId }))
    }, [emissionType, emissionId, dispatch])

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                {(emissionDataStatus === "running" || _.isEmpty(emissionInputs)) ? (
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

                        {/* {emissionType === "stationary_combustion" && (
                            <EditStationaryCombustionForm
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "mobile_combustion" && (
                            <EditMobileCombustionForm
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "water_discharge" && (
                            <EditWaterDistributionForm
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "water_consumption" && (
                            <EditWaterConsumptionForm
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />)}
                        {emissionType === "refrigerants" && (
                            <EditRefrigerantsForm
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />
                        )} */}
                    </>
                )}
            </Container>
        </DashboardLayout>
    );
};

export default EmissionsDetails;