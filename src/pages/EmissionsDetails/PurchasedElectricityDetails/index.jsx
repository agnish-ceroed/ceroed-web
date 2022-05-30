import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { resetAddCombustionStatus, deleteEmissions } from '../../../redux/actions';
import { getMonth } from '../../../services/utilityService';
import CeroButton from '../../../components/CeroButton';
import ListComments from '../ListComment';
import useStyles from "./styles";

const PurchasedElectricityDetails = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, onCancel, isDeleteEnable, setIsDrawerOpen } = props

    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Purchased electricity deleted successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onUpdatePurchasedElectricity = () => {
        navigate(`/emissions/edit/purchased_electricity/${emissionId}`);
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
                <Box className={classes.header}>
                    <Typography variant="h6" component="div" >Purchased Electricity</Typography>
                    <CeroButton
                        variant="outlined"
                        buttonText="Raise a ticket"
                        className={classes.buttonSecondary}
                        onClick={() => setIsDrawerOpen(true)}
                    />
                </Box>
                <Box className={classes.topContainer}>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction={'column'} xs={12}>
                            <Typography className={classes.previewItem}>Facility: {emissionData.facility_name}</Typography>
                            <Typography className={classes.previewItem}>Type of emission factor: {emissionData.type_of_emission_factors}</Typography>
                            <Typography className={classes.previewItem}>Month and year: {getMonth[emissionData.month]} {emissionData.year}</Typography>
                            <Typography className={classes.previewItem}>Calculation approach: {emissionData.calculation_approach}</Typography>
                            <Typography className={classes.previewItem}>Amount: {emissionData.amount}{emissionData.unit}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.bottomContainer}>
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>: {emissionData.co2} tonnes</Typography>
                            <Typography className={classes.previewItem}>CH<sub>4</sub>: {emissionData.ch4} tonnes</Typography>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>e: {emissionData.co2e} tonnes</Typography>
                            {/* <Typography className={classes.previewItem}>BioFuel CO<sub>2</sub>: {emissionData.biofuel_co2} tonnes</Typography> */}
                        </Grid>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>N<sub>2</sub>O: {emissionData.n2o} tonnes</Typography>
                            <Typography className={classes.previewItem}>EF: {emissionData.ef} kgCO<sub>2</sub>e/unit</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className={classes.buttonContainer}>
                {isDeleteEnable && <CeroButton
                    buttonText="Delete Data"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onDeletePurchasedElectricity} />}
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSecondary)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Update Data"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onUpdatePurchasedElectricity} />
            </Box>
            <ListComments emissionId={emissionId} />
        </Container>
    )
}

export default PurchasedElectricityDetails;
