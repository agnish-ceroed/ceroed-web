import React from "react";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardLayout from '../../layouts/DashboardLayout'
import AddStationaryCombustionForm from './AddStationaryCombustionForm'
import useStyles from "./styles";

const AddEmissions = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const emissionType = pathname.substring(pathname.lastIndexOf('/') + 1)
    // useEffect(() => {
    //     if (addEmissionData.addStationaryCombustion.status === STATUS.SUCCESS) {
    //         enqueueSnackbar('Stationary combustion added successfully', { variant: 'success' });
    //         navigate('/emissions')
    //         dispatch(resetAddCombustionStatus())
    //     } else if (addEmissionData.addMobileCombustion.status === STATUS.SUCCESS) {
    //         enqueueSnackbar('Mobile combustion added successfully', { variant: 'success' });
    //         navigate('/emissions')
    //         dispatch(resetAddCombustionStatus())
    //     } else if (addEmissionData.addMobileCombustion.status === STATUS.ERROR) {
    //         enqueueSnackbar("Something went wrong", { variant: 'error' });
    //         dispatch(resetAddCombustionStatus())
    //     } else if (addEmissionData.addStationaryCombustion.status === STATUS.ERROR) {
    //         enqueueSnackbar("Something went wrong", { variant: 'error' });
    //         dispatch(resetAddCombustionStatus())
    //     }
    // }, [addEmissionData.addStationaryCombustion, addEmissionData.addMobileCombustion, enqueueSnackbar])

    const onCancelAdd = () => {
        navigate('/emissions');
    };

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                { emissionType === 'stationary_combustion' && <AddStationaryCombustionForm onCancel={onCancelAdd} /> }
            </Container>
        </DashboardLayout>
    );
};

export default AddEmissions;