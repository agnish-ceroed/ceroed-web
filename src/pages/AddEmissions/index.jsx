import { Container } from "@mui/material";

import { useNavigate } from "react-router-dom";

import DashboardLayout from '../../layouts/DashboardLayout'
import AddEmissionForm from './AddEmissionForm'

import useStyles from "./styles";

const AddEmissions = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    
    const onAddEmissionData = (data) => {
        console.log(data);
        // API for add emission data filter
    };

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <AddEmissionForm onCancel={() => navigate('/emissions') } onAddEmissionData={onAddEmissionData}/>
            </Container>
        </DashboardLayout>
    );
};

export default AddEmissions;