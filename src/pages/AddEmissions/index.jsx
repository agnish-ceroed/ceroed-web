import React from "react";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardLayout from '../../layouts/DashboardLayout'
import AddStationaryCombustionForm from './AddStationaryCombustionForm';
import AddTransportationForm from './AddTransportationForm';
import AddPurchasedElectricityForm from './AddPurchasedElectricityForm';
import AddMobileCombustionForm from "./AddMobileCombustionForm";
import AddWaterDischargeForm from "./AddWaterDischargeForm";
import AddWaterConsumptionForm from "./AddWaterConsumptionForm";
import AddRefrigerantsForm from "./AddRefrigerantsForm";
import AddWasteCombustion from "./AddWasteCombustion";
import AddDevelopmentTrainingForm from "./AddDevelopmentTrainingForm";
import useStyles from "./styles";

const AddEmissions = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const emissionType = pathname.substring(pathname.lastIndexOf('/') + 1)

    const onCancelAdd = () => {
        navigate('/emissions/' + emissionType);
    };

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                {emissionType === 'stationary_combustion' && <AddStationaryCombustionForm onCancel={onCancelAdd} />}
                {emissionType === 'mobile_combustion' && <AddMobileCombustionForm onCancel={onCancelAdd} />}
                {emissionType === 'transportation' && <AddTransportationForm onCancel={onCancelAdd} />}
                {emissionType === 'purchased_electricity' && <AddPurchasedElectricityForm onCancel={onCancelAdd} />}
                {emissionType === 'water_discharge' && <AddWaterDischargeForm onCancel={onCancelAdd} />}
                {emissionType === 'water_consumption' && <AddWaterConsumptionForm onCancel={onCancelAdd} />}
                {emissionType === 'refrigerants' && <AddRefrigerantsForm onCancel={onCancelAdd} />}
                {emissionType === 'waste' && <AddWasteCombustion onCancel={onCancelAdd} />}
                {emissionType === 'development_training' && <AddDevelopmentTrainingForm onCancel={onCancelAdd} />}
            </Container>
        </DashboardLayout>
    );
};

export default AddEmissions;