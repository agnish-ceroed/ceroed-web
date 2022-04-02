import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { STATUS } from "../../../redux/constants";
import { resetAddCombustionStatus, deleteEmissions } from '../../../redux/actions';

import CeroButton from '../../../components/CeroButton';
import CeroInput from '../../../components/CeroInput';
import useStyles from "./styles";

const WasteCombustion = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { emissionId, emissionData, onCancel } = props

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
                <Typography variant="h6" component="div" >Edit Waste Combustion</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <CeroInput
                                required
                                id="facility"
                                name="facility"
                                label="Facility"
                                fullWidth
                                value={emissionData.facility_name}
                                inputProps={{ readOnly: true }}
                            />
                            <CeroInput
                                required
                                id="month"
                                name="month"
                                label="Month"
                                fullWidth
                                value={emissionData.month}
                                inputProps={{ readOnly: true }}
                            />
                            <CeroInput
                                required
                                id="wasteHazardOption"
                                name="wasteHazardOption"
                                label="Waste hazard option"
                                fullWidth
                                value={emissionData.waste_hazard_option_name}
                                inputProps={{ readOnly: true }}
                            />
                            <CeroInput
                                required
                                id="wasteDisposalLocation"
                                name="wasteDisposalLocation"
                                label="Waste disposal location"
                                fullWidth
                                value={emissionData.waste_disposal_location_name}
                                inputProps={{ readOnly: true }}
                            />
                            <CeroInput
                                required
                                id="amount"
                                name="amount"
                                label="Amount"
                                value={emissionData.amount}
                                inputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroInput
                                required
                                id="wasteType"
                                name="wasteType"
                                label="Waste type"
                                fullWidth
                                value={emissionData.waste_type_name}
                                inputProps={{ readOnly: true }}
                            />
                            <CeroInput
                                required
                                id="year"
                                name="year"
                                label="Year"
                                fullWidth
                                value={emissionData.year}
                                inputProps={{ readOnly: true }}
                            />
                            <CeroInput
                                required
                                id="wasteDisposalOption"
                                name="wasteDisposalOption"
                                label="Waste disposal option"
                                fullWidth
                                value={emissionData.waste_disposal_option_name}
                                inputProps={{ readOnly: true }}
                            />
                            <CeroInput
                                required
                                id="wasteDisposalOperation"
                                name="wasteDisposalOperation"
                                label="Waste disposal operation"
                                fullWidth
                                value={emissionData.waste_disposal_operation_name}
                                inputProps={{ readOnly: true }}
                            />
                            <CeroInput
                                required
                                id="unit"
                                name="unit"
                                label="Fuel Unit"
                                fullWidth
                                value={emissionData.unit}
                                inputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.bottomContainer}>
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission Preview</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>Usage: {`${emissionData.usage} ${emissionData.usage_unit}`}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Delete Data"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onDeleteWasteCombustion()} />
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSeconday)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Update Data"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onUpdateWasteCombustion()} />
            </Box>
        </Container>
    )
}

export default WasteCombustion;