import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { sampleYear, months } from "../../../constants";
import { waterConsumptionValidation } from './schema';
import { resetAddCombustionStatus, deleteEmissions, updateWaterConsumptionCombustion } from '../../../redux/actions';

import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import useStyles from "./styles";

const EditWaterConsumptionCombustionForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, facilitiesData, onCancel, emissionInputs } = props

    const isCalculateDone = useSelector(state => state.emission.updateWaterConsumptionCombustion.isCalculateDone)
    const updateEmissionData = useSelector(state => state.emission.updateWaterConsumptionCombustion)
    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)

    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));
    const stressTypeList = emissionInputs && (emissionInputs.water_source_stress_types||[]).map(item => ({ key: item.id, value: item.name }));
    const sourceTypeList = emissionInputs && (emissionInputs.water_source_types||[]).map(item => ({ key: item.id, value: item.name }));
    const sourceList = emissionInputs && (emissionInputs.water_sources||[]).map(item => ({ key: item.id, value: item.name }));
    const fuelUnits = emissionInputs && (emissionInputs.units||[]).map(item => ({ key: item.name, value: item.name }));
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));

    const formik = useFormik({
        initialValues: {
            facility: emissionData.facility_id || '',
            year: emissionData.year || '',
            month: emissionData.month || '',
            source: emissionData.water_source_id || '',
            stressType: emissionData.water_source_stress_type_id || '',
            sourceType: emissionData.water_source_type_id || '',
            fuelUnit: emissionData.unit || '',
            amountOfFuel: emissionData.amount || ''
        },
        validationSchema: waterConsumptionValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        if (updateEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Water consumption updated successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (updateEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [updateEmissionData, enqueueSnackbar, onCancel, dispatch])

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Water consumption deleted successfully', { variant: 'success' });
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
            source_id: formik.values.source,
            stress_type_id: formik.values.stressType,
            source_type_id: formik.values.sourceType,
            unit: formik.values.fuelUnit,
            amount: parseFloat(formik.values.amountOfFuel),
            save: false
        }
        dispatch(updateWaterConsumptionCombustion(requestData))
    };

    const onUpdateWaterConsumptionCombustion = () => {
        const requestData = {
            id: emissionId,
            facility_id: formik.values.facility,
            year: formik.values.year,
            month: formik.values.month,
            source_id: formik.values.source,
            stress_type_id: formik.values.stressType,
            source_type_id: formik.values.sourceType,
            unit: formik.values.fuelUnit,
            amount: parseFloat(formik.values.amountOfFuel),
            save: true
        }
        dispatch(updateWaterConsumptionCombustion(requestData))
    };

    const onDeleteWaterConsumptionCombustion = () => {
        const requestData = {
            id: emissionId
        }
        dispatch(deleteEmissions(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography variant="h6" component="div" >Edit Water Consumption</Typography>
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
                                id="sourceType"
                                name="sourceType"
                                label="Source type"
                                fullWidth
                                options={sourceTypeList}
                                selectedValue={formik.values.sourceType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.sourceType && formik.errors.sourceType}
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
                                id="source"
                                name="source"
                                label="Source"
                                fullWidth
                                options={sourceList}
                                selectedValue={formik.values.source}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.source && formik.errors.source}
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
                                id="stressType"
                                name="stressType"
                                label="Stress type"
                                fullWidth
                                options={stressTypeList}
                                selectedValue={formik.values.stressType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.stressType && formik.errors.stressType}
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
                    onClick={() => onDeleteWaterConsumptionCombustion(formik.values)} />
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSeconday)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Update"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onUpdateWaterConsumptionCombustion(formik.values)} />
            </Box>
        </Container>
    )
}

export default EditWaterConsumptionCombustionForm;
