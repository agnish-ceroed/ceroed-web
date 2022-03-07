import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addMobileCombustion, addStationaryCombustion, resetAddCombustionStatus } from "../../redux/actions";
import DashboardLayout from '../../layouts/DashboardLayout'
import { STATUS } from "../../redux/constants";
import AddEmissionForm from './AddEmissionForm'
import useStyles from "./styles";

const AddEmissions = () => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const navigate = useNavigate();
    const addEmissionData = useSelector(state => state.emission)

    useEffect(() => {
        if (addEmissionData.addStationaryCombustion.status === STATUS.SUCCESS) {
            enqueueSnackbar('Stationary combustion added successfully', { variant: 'success' });
            navigate('/emissions')
            dispatch(resetAddCombustionStatus())
        } else if (addEmissionData.addMobileCombustion.status === STATUS.SUCCESS) {
            enqueueSnackbar('Mobile combustion added successfully', { variant: 'success' });
            navigate('/emissions')
            dispatch(resetAddCombustionStatus())
        } else if (addEmissionData.addMobileCombustion.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        } else if (addEmissionData.addStationaryCombustion.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [addEmissionData.addStationaryCombustion, addEmissionData.addMobileCombustion, enqueueSnackbar])

    const onAddEmissionData = (type, data) => {
        const requestData = {
            facility_id: data.facility,
            emission_type: data.emissionType,
            year: data.year,
            month: data.month,
            fuel_type_id: data.fuelType,
            fuel_id: data.fuel,
            unit: data.fuelUnit,
            amount: data.amountOfFuel,
            save: true
        }
        if (type === 'stationary_combustion') {
            dispatch(addStationaryCombustion(requestData))
        } else {
            dispatch(addMobileCombustion(requestData))
        }
    };

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <AddEmissionForm onCancel={() => navigate('/emissions')} onAddEmissionData={onAddEmissionData} />
            </Container>
        </DashboardLayout>
    );
};

export default AddEmissions;