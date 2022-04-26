import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { sampleYear, months } from "../../../constants";
import { updateMobileCombustionValidation } from './schema';
import { resetAddCombustionStatus, deleteEmissions, getMobileCombustionInputs, updateMobileCombustion } from '../../../redux/actions';

import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import CeroInfoPair from '../../../components/CeroInfoPair';
import useStyles from "./styles";

const EditMobileCombustionForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, facilitiesData, onCancel } = props

    const isCalculateDone = useSelector(state => state.emission.updateMobileCombustion.isCalculateDone)
    const updateEmissionData = useSelector(state => state.emission.updateMobileCombustion)
    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)
    const activityTypesData = useSelector(state => state.emission.mobileCombustionInputs.data.activity_types);
    const fuelSourceData = useSelector(state => state.emission.mobileCombustionInputs.data.fuel_sources);
    const vehicleTypeData = useSelector(state => state.emission.mobileCombustionInputs.data.vehicle_types);
    const fuelUnitData = useSelector(state => state.emission.mobileCombustionInputs.data.units);
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));

    const formik = useFormik({
        initialValues: {
            facility: emissionData.facility_id || '',
            year: emissionData.year || '',
            month: emissionData.month || '',
            activityType: emissionData.activity_type_id || '',
            fuelSource: emissionData.fuel_source_id || '',
            vehicleType: emissionData.vehicle_type_id || '',
            amountOfFuel: emissionData.amount || '',
            fuelUnit: emissionData.unit || ''
        },
        validationSchema: updateMobileCombustionValidation,
        onSubmit: () => { },
    });

    const selectedUnitType = activityTypesData.find(item => item.id === formik.values.activityType)
    const filteredUnitData = fuelUnitData.filter(unit => unit?.type === selectedUnitType?.unit_type)
    const filteredVehicleType = vehicleTypeData.filter(vehicle => vehicle.fuel_source_id === formik.values.fuelSource)

    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));
    const activityType = activityTypesData.map(item => ({ key: item.id, value: item.name }));
    const fuelUnits = filteredUnitData.map(unit => ({ key: unit.name, value: unit.name }))
    const vehicleTypes = filteredVehicleType.map(item => ({ key: item.id, value: item.name }));
    const fuelSource = fuelSourceData.map(item => ({ key: item.id, value: item.name }));

    useEffect(() => {
        dispatch(getMobileCombustionInputs('mobile_combustion'))
    }, [dispatch])

    useEffect(() => {
        if (updateEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Mobile combustion updated successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (updateEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [updateEmissionData, enqueueSnackbar, onCancel, dispatch])

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Mobile combustion deleted successfully', { variant: 'success' });
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
            emission_type: formik.values.emissionType,
            year: formik.values.year,
            month: formik.values.month,
            activity_type_id: formik.values.activityType,
            fuel_source_id: formik.values.fuelSource,
            vehicle_type_id: formik.values.vehicleType,
            amount: parseFloat(formik.values.amountOfFuel),
            unit: formik.values.fuelUnit,
            save: false
        }
        dispatch(updateMobileCombustion(requestData))
    };

    const onUpdateMobileCombustion = () => {
        const requestData = {
            id: emissionId,
            facility_id: formik.values.facility,
            emission_type: formik.values.emissionType,
            year: formik.values.year,
            month: formik.values.month,
            activity_type_id: formik.values.activityType,
            fuel_source_id: formik.values.fuelSource,
            vehicle_type_id: formik.values.vehicleType,
            amount: parseFloat(formik.values.amountOfFuel),
            unit: formik.values.fuelUnit,
            save: true
        }
        dispatch(updateMobileCombustion(requestData))
    };

    const onDeleteMobileCombustion = () => {
        const requestData = {
            id: emissionId
        }
        dispatch(deleteEmissions(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div" >Edit Mobile Combustion</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' md={6} xs={12}>
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
                                id="fuelSource"
                                name="fuelSource"
                                label="Fuel Source"
                                fullWidth
                                options={fuelSource}
                                selectedValue={formik.values.fuelSource}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fuelSource && formik.errors.fuelSource}
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
                        <Grid item container direction={'column'} md={6} xs={12}>
                            <CeroSelect
                                required
                                id="activityType"
                                name="activityType"
                                label="Activity Type"
                                fullWidth
                                options={activityType}
                                selectedValue={formik.values.activityType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.activityType && formik.errors.activityType}
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
                                id="vehicleType"
                                name="vehicleType"
                                label="Vehicle Type"
                                fullWidth
                                options={vehicleTypes}
                                selectedValue={formik.values.vehicleType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.vehicleType && formik.errors.vehicleType}
                            />
                            <CeroSelect
                                required
                                id="fuelUnit"
                                name="fuelUnit"
                                label="Fuel Unit"
                                fullWidth
                                options={fuelUnits || [{ name: 'select' }]}
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
                        <Grid item container direction='column' xs={12} md={6}>
                            <CeroInfoPair title={<>CO<sub>2</sub></>} value={`${updateEmissionData.data.co2} tonnes`} />
                            <CeroInfoPair title={<>CH<sub>4</sub></>} value={`${updateEmissionData.data.ch4} tonnes`} />
                            <CeroInfoPair title={<>BioFuel CO<sub>2</sub></>} value={`${updateEmissionData.data.biofuel_co2} tonnes`} />
                        </Grid>
                        <Grid className={classes.secondResultContainer} item container direction='column' xs={6}>
                            <CeroInfoPair title={<>CO<sub>2</sub>e</>} value={`${updateEmissionData.data.co2e} tonnes`} />
                            <CeroInfoPair title={<>N<sub>2</sub>O</>} value={`${updateEmissionData.data.n2o} tonnes`} />
                            <CeroInfoPair title={<>EF</>} value={<>{updateEmissionData.data.ef} kgCO<sub>2</sub>e/unit</>} />
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Delete"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onDeleteMobileCombustion(formik.values)} />
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSeconday)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Update"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onUpdateMobileCombustion(formik.values)} />
            </Box>
        </Container>
    )
}

export default EditMobileCombustionForm;
