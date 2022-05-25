import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { STATUS } from "../../../redux/constants";
import { resetAddCombustionStatus, deleteEmissions } from '../../../redux/actions';
import { getMonth } from '../../../services/utilityService';

import CeroButton from '../../../components/CeroButton';
import useStyles from "./styles";

const WasteCombustionDetails = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { emissionId, emissionData, onCancel, isDeleteEnable, setIsDrawerOpen } = props

    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Waste combustion deleted successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onDeleteWasteCombustion = () => {
        const requestData = {
            id: emissionId
        }
        dispatch(deleteEmissions(requestData))
    };

    const onUpdateWasteCombustion = () => {
        navigate(`/emissions/edit/stationary_combustion/${emissionId}`);
    }

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Box className={classes.header}>
                    <Typography variant="h6" component="div" >Waste Combustion</Typography>
                    <CeroButton
                        variant="outlined"
                        buttonText="Raise a ticket"
                        className={classes.buttonSecondary}
                        onClick={() => setIsDrawerOpen(true)}
                    />
                </Box>
                <Box className={classes.topContainer}>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction='column' xs={12}>
                            <Typography className={classes.previewItem}>Facility: {emissionData.facility_name}</Typography>
                            <Typography className={classes.previewItem}>Month and year: {getMonth[emissionData.month]} {emissionData.year}</Typography>
                            <Typography className={classes.previewItem}>Waste hazard option: {emissionData.waste_hazard_option_name}</Typography>
                            <Typography className={classes.previewItem}>Waste disposal option: {emissionData.waste_disposal_option_name}</Typography>
                            <Typography className={classes.previewItem}>Waste disposal location: {emissionData.waste_disposal_location_name}</Typography>
                            <Typography className={classes.previewItem}>Waste type: {emissionData.waste_type_name}</Typography>
                            <Typography className={classes.previewItem}>Waste disposal operation: {emissionData.waste_disposal_operation_name}</Typography>
                            <Typography className={classes.previewItem}>Amount: {emissionData.amount}{emissionData.unit}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.bottomContainer}>
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>Usage: {emissionData.usage}{emissionData.usage_unit}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className={classes.buttonContainer}>
                {isDeleteEnable && <CeroButton
                    buttonText="Delete Data"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onDeleteWasteCombustion()} />}
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSecondary)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Update Data"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onUpdateWasteCombustion()} />
            </Box>
        </Container>
    )
}

export default WasteCombustionDetails;