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

const StationaryCombustionDetails = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, onCancel } = props

    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Stationary Combustion deleted successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onUpdatePurchasedElectricity = () => {
        navigate(`/emissions/edit/stationary_combustion/${emissionId}`);
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
                <Typography variant="h6" component="div" >Stationary Combustion</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction={'column'} xs={12}>
                            <Typography>Facility: {emissionData.facility_name}</Typography>
                            <Typography>Month and year: {emissionData.month}/{emissionData.year}</Typography>
                            <Typography>Fuel: {emissionData.fuel}</Typography>
                            <Typography>Amount: {emissionData.amount}{emissionData.unit}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.bottomContainer}>
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>: {emissionData.co2} tonnes</Typography>
                            <Typography className={classes.previewItem}>CH<sub>4</sub>: {emissionData.ch4} tonnes</Typography>
                            <Typography className={classes.previewItem}>BioFuel CO<sub>2</sub>: {emissionData.biofuel_co2} tonnes</Typography>
                        </Grid>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>e: {emissionData.co2e} tonnes</Typography>
                            <Typography className={classes.previewItem}>N<sub>2</sub>O: {emissionData.n2o} tonnes</Typography>
                            <Typography className={classes.previewItem}>EF: {emissionData.ef} kgCO<sub>2</sub>e/unit</Typography>
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

export default StationaryCombustionDetails;
