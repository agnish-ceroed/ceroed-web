import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { resetAddCombustionStatus, deleteEmissions } from '../../../redux/actions';

import CeroButton from '../../../components/CeroButton';
import CeroInput from '../../../components/CeroInput';
import useStyles from "./styles";

const WaterDischargeDetails = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, onCancel } = props

    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Water Discharge deleted successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onUpdatePurchasedElectricity = () => {
        navigate(`/emissions/edit/water_discharge/${emissionId}`);
    };

    const onDeletePurchasedElectricity = () => {
        const requestData = {
            id: emissionId
        }
        dispatch(deleteEmissions(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography variant="h6" component="div" >Water Discharge</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroInput
                                required
                                id="facility"
                                key="facility"
                                name="facility"
                                label="Facility"
                                fullWidth
                                value={emissionData.facility_name}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="month"
                                name="month"
                                label="Month"
                                fullWidth
                                value={emissionData.month}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="stressType"
                                key="stressType"
                                name="stressType"
                                label="Stress Type"
                                fullWidth
                                value={emissionData.water_destination_stress_type_name}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="treatmentRequired"
                                key="treatmentRequired"
                                name="treatmentRequired"
                                label="Treatment Required"
                                fullWidth
                                value={emissionData.treatment_required}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="amountOfFuel"
                                key="amountOfFuel"
                                name="amountOfFuel"
                                label="Amount of Water Consumption"
                                value={emissionData.amount}
                                fullWidth
                                inputProps={{readOnly: true}}
                            />
                        </Grid>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroInput
                                required
                                id="destination"
                                name="destination"
                                label="Water Destination"
                                fullWidth
                                value={emissionData.water_destination_name}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="year"
                                key="year"
                                name="year"
                                label="Year"
                                fullWidth
                                value={emissionData.year}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="destinationType"
                                key="destinationType"
                                name="destinationType"
                                label="Destination Type"
                                fullWidth
                                value={emissionData.water_destination_type_name}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="treatmentLevel"
                                key="treatmentLevel"
                                name="treatmentLevel"
                                label="Treatment Level"
                                fullWidth
                                value={emissionData.treatment_level}
                                inputProps={{readOnly: true}}
                            />
                            <CeroInput
                                required
                                id="fuelUnit"
                                key="fuelUnit"
                                name="fuelUnit"
                                label="Unit"
                                fullWidth
                                value={emissionData.unit}
                                inputProps={{readOnly: true}}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.bottomContainer}>
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission Preview</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>e: {emissionData.co2e} tonnes</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Delete Data"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onDeletePurchasedElectricity} />
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSeconday)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Update Data"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onUpdatePurchasedElectricity} />
            </Box>
        </Container>
    )
}

export default WaterDischargeDetails;