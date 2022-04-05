import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { sampleYear, months } from "../../../constants";
import { updateWaterDischargeCombustionValidation } from './schema';
import { resetAddCombustionStatus, deleteEmissions, updateWaterDischargeCombustion } from '../../../redux/actions';

import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import useStyles from "./styles";

const EditWaterDistributionForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, facilitiesData, onCancel } = props

    const isCalculateDone = useSelector(state => state.emission.updateWaterDischargeCombustion.isCalculateDone)
    const updateEmissionData = useSelector(state => state.emission.updateWaterDischargeCombustion)
    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)
    const emissionInputs = useSelector(state => state.emission.emissionInputs.data)

    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));
    const fuelUnits = emissionInputs && (emissionInputs.units || []).map(item => ({ key: item.name, value: item.name }));
    const waterDestinationList = emissionInputs && (emissionInputs.water_destinations || []).map(item => ({ key: item.id, value: item.name }))
    const stressTypeList = emissionInputs && (emissionInputs.water_destination_stress_types || []).map(item => ({ key: item.id, value: item.name }))
    const destinationTypeList = emissionInputs && (emissionInputs.water_destination_types || []).map(item => ({ key: item.id, value: item.name }))
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));

    const formik = useFormik({
        initialValues: {
            facility: emissionData.facility_id || '',
            year: emissionData.year || '',
            month: emissionData.month || '',
            destination: emissionData.water_destination_id || '',
            stressType: emissionData.water_destination_stress_type_id || '',
            destinationType: emissionData.water_destination_type_id || '',
            treatmentRequired: emissionData.treatment_required || '',
            treatmentLevel: emissionData.treatment_level || '',
            amountOfFuel: emissionData.amount || '',
            fuelUnit: emissionData.unit || '',
        },
        validationSchema: updateWaterDischargeCombustionValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        if (updateEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Water discharge combustion updated successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (updateEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [updateEmissionData, enqueueSnackbar, onCancel, dispatch])

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Water discharge combustion deleted successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onCalculate = () => {
        const requestData = {
            id: emissionId,
            facility_id: formik.values.facility,
            year: formik.values.year,
            month: formik.values.month,
            destination_id: formik.values.destination,
            stress_type_id: formik.values.stressType,
            destination_type_id: formik.values.destinationType,
            treatment_required: formik.values.treatmentRequired,
            treatment_level: formik.values.treatmentLevel,
            amount: parseFloat(formik.values.amountOfFuel),
            unit: formik.values.fuelUnit,
            save: false
        }
        dispatch(updateWaterDischargeCombustion(requestData))
    };

    const onUpdateWaterDischargeCombustion = () => {
        const requestData = {
            id: emissionId,
            facility_id: formik.values.facility,
            year: formik.values.year,
            month: formik.values.month,
            destination_id: formik.values.destination,
            stress_type_id: formik.values.stressType,
            destination_type_id: formik.values.destinationType,
            treatment_required: formik.values.treatmentRequired,
            treatment_level: formik.values.treatmentLevel,
            amount: parseFloat(formik.values.amountOfFuel),
            unit: formik.values.fuelUnit,
            save: true
        }
        dispatch(updateWaterDischargeCombustion(requestData))
    };

    const onDeleteWaterDischargeCombustion = () => {
        const requestData = {
            id: emissionId
        }
        dispatch(deleteEmissions(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography variant="h6" component="div" >Edit Water Distribution</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <CeroSelect
                                required
                                id="facility"
                                name="facility"
                                label="Facility"
                                fullWidth
                                options={facilitiesList}
                                selectedValue={formik.values.facility}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.facility && formik.errors.facility}
                            />
                            <CeroSelect
                                required
                                id="month"
                                name="month"
                                label="Month"
                                fullWidth
                                options={months}
                                selectedValue={formik.values.month}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.month && formik.errors.month}
                            />
                            <CeroSelect
                                required
                                id="stressType"
                                name="stressType"
                                label="Stress Type"
                                fullWidth
                                options={stressTypeList}
                                selectedValue={formik.values.stressType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.stressType && formik.errors.stressType}
                            />
                            <CeroSelect
                                required
                                id="treatmentRequired"
                                name="treatmentRequired"
                                label="Treatment Required"
                                fullWidth
                                options={[{ key: true, value: 'Yes' }, { key: false, value: 'No' }]}
                                selectedValue={formik.values.treatmentRequired}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.treatmentRequired && formik.errors.treatmentRequired}
                            />
                            <CeroInput
                                required
                                id="amountOfFuel"
                                name="amountOfFuel"
                                label="Amount of Fuel"
                                value={formik.values.amountOfFuel}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.amountOfFuel && formik.errors.amountOfFuel}
                            />
                        </Grid>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroSelect
                                required
                                id="destination"
                                name="destination"
                                label="Destination"
                                fullWidth
                                options={waterDestinationList}
                                selectedValue={formik.values.destination}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.destination && formik.errors.destination}
                            />
                            <CeroAutoComplete
                                id="year"
                                label="Year"
                                value={formik.values.year}
                                onChange={(e, value) => formik.setFieldValue('year', value.id)}
                                onBlur={formik.handleBlur}
                                error={formik.touched.year && formik.errors.year}
                                options={yearList}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                            />
                            <CeroSelect
                                required
                                id="destinationType"
                                name="destinationType"
                                label="Destination Type"
                                fullWidth
                                options={destinationTypeList}
                                selectedValue={formik.values.destinationType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.destinationType && formik.errors.destinationType}
                            />
                            <CeroInput
                                required
                                id="treatmentLevel"
                                name="treatmentLevel"
                                label="Treatment Level"
                                value={formik.values.treatmentLevel}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.treatmentLevel && formik.errors.treatmentLevel}
                            />
                            <CeroSelect
                                required
                                id="fuelUnit"
                                name="fuelUnit"
                                label="Fuel Unit"
                                fullWidth
                                options={fuelUnits}
                                selectedValue={formik.values.fuelUnit}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fuelUnit && formik.errors.fuelUnit}
                            />
                        </Grid>
                    </Grid>
                    <CeroButton
                        buttonText="Calculate"
                        className={clsx(classes.button, classes.buttonPrimary)}
                        onClick={onCalculate}
                        disabled={!formik.dirty || !formik.isValid}
                    />
                </Box>
                {isCalculateDone && <Box className={classes.bottomContainer}>
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission Preview</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>Usage: {updateEmissionData.data.usage} {updateEmissionData.data.usage_unit}</Typography>
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Delete"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onDeleteWaterDischargeCombustion(formik.values)} />
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSeconday)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Update"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onUpdateWaterDischargeCombustion(formik.values)} />
            </Box>
        </Container>
    )
}

export default EditWaterDistributionForm;
