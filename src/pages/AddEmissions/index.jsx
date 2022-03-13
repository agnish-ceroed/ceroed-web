import React from "react";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardLayout from '../../layouts/DashboardLayout'
import AddStationaryCombustionForm from './AddStationaryCombustionForm';
import AddTransportationForm from './AddTransportationForm';
import useStyles from "./styles";

const AddEmissions = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const emissionType = pathname.substring(pathname.lastIndexOf('/') + 1)
    
    const onCancelAdd = () => {
        navigate('/emissions');
    };

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                { emissionType === 'stationary_combustion' && <AddStationaryCombustionForm onCancel={onCancelAdd} /> }
                { emissionType === 'transportation' && <AddTransportationForm onCancel={onCancelAdd} /> }
            </Container>
        </DashboardLayout>
    );
};

export default AddEmissions;