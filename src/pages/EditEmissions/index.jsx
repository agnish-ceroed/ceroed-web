import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import _ from "lodash";

import { getEmission, getEmissionInputFormat } from '../../redux/actions';
import { rolesEnum } from "../../layouts/DashboardLayout/pages";
import DashboardLayout from '../../layouts/DashboardLayout'
import EditWasteCombustion from "./EditWasteCombustion";
import EditPurchasedElectricityForm from './EditPurchasedElectricityForm';
import EditStationaryCombustionForm from "./EditStationaryCombustionForm";
import EditMobileCombustionForm from "./EditMobileCombustionForm";
import EditWaterDistributionForm from "./EditWaterDistributionForm";
import EditWaterConsumptionForm from "./EditWaterConsumptionForm";
import EditTransportationForm from "./EditTransportationForm";
import EditRefrigerantsForm from "./EditRefrigerantsForm";
import EditUploadEmissionForm from "./EditUploadEmissionForm";
import useStyles from "./styles";

const uploadFileEmissions = [
    'employees_turnover',
    'age_based_statistics',
    'gender_based_statistics',
    'board_diversity',
    'management_diversity',
    'tax',
];

const EditEmissions = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const emissionData = useSelector(state => state.emission.emissionDetails.data)
    const emissionDataStatus = useSelector(state => state.emission.emissionDetails.status)
    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const emissionInputs = useSelector(state => state.emission.emissionInputs.data);
    const userRole = useSelector(state => state.auth.userInfo.role);
    const isDeleteEnable = [rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER].includes(userRole)

    const pathNameArr = pathname.split('/')
    const emissionType = pathNameArr[pathNameArr.length - 2]
    const emissionId = pathNameArr[pathNameArr.length - 1]

    const onCancel = () => {
        navigate('/emissions/' + emissionType);
    };

    useEffect(() => {
        emissionType && dispatch(getEmissionInputFormat(emissionType))
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
                            <EditPurchasedElectricityForm
                                isDeleteEnable={isDeleteEnable}
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />
                        )}

                        {emissionType === "stationary_combustion" && (
                            <EditStationaryCombustionForm
                                isDeleteEnable={isDeleteEnable}
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "mobile_combustion" && (
                            <EditMobileCombustionForm
                                isDeleteEnable={isDeleteEnable}
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "water_discharge" && (
                            <EditWaterDistributionForm
                                isDeleteEnable={isDeleteEnable}
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "water_consumption" && (
                            <EditWaterConsumptionForm
                                isDeleteEnable={isDeleteEnable}
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />)}
                        {emissionType === "refrigerants" && (
                            <EditRefrigerantsForm
                                isDeleteEnable={isDeleteEnable}
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "transportation" && (
                            <EditTransportationForm
                                isDeleteEnable={isDeleteEnable}
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />
                        )}
                        {emissionType === "waste" && (
                            <EditWasteCombustion
                                isDeleteEnable={isDeleteEnable}
                                onCancel={onCancel}
                                emissionId={emissionId}
                                facilitiesData={facilitiesData}
                                emissionInputs={emissionInputs}
                                emissionData={emissionData}
                            />
                        )}
                        {uploadFileEmissions.includes(emissionType) && (
                            <EditUploadEmissionForm
                                isDeleteEnable={isDeleteEnable}
                                onCancel={onCancel}
                                emissionId={emissionId}
                                emissionType={emissionType}
                            />
                        )}
                    </>
                )}
            </Container>
        </DashboardLayout>
    );
};

export default EditEmissions;