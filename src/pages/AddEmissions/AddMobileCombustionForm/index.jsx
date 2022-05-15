import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { months, sampleYear } from "../../../constants";
import { STATUS } from "../../../redux/constants";
import { addMobileCombustionValidation } from './schema';
import { addMobileCombustion, getMobileCombustionInputs, resetAddCombustionStatus } from '../../../redux/actions';

import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import CeroInfoPair from '../../../components/CeroInfoPair';
import useStyles from "./styles";

const AddMobileCombustionForm = (props) => {
    const { onCancel } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const isCalculateDone = useSelector(state => state.emission.addMobileCombustion.isCalculateDone)
    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const activityTypesData = useSelector(state => state.emission.mobileCombustionInputs.data.activity_types);
    const fuelSourceData = useSelector(state => state.emission.mobileCombustionInputs.data.fuel_sources);
    const vehicleTypeData = useSelector(state => state.emission.mobileCombustionInputs.data.vehicle_types);
    const fuelUnitData = useSelector(state => state.emission.mobileCombustionInputs.data.units);
    const addEmissionData = useSelector(state => state.emission.addMobileCombustion)

    const formik = useFormik({
        initialValues: {
            facility: '',
            year: '',
            month: '',
            activityType: '',
            fuelSource: '',
            vehicleType: '',
            amountOfFuel: '',
            fuelUnit: ''
        },
        validationSchema: addMobileCombustionValidation,
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
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));

    useEffect(() => {
        dispatch(getMobileCombustionInputs('mobile_combustion'))
        return () => { dispatch(resetAddCombustionStatus()) }
    }, [dispatch])

    useEffect(() => {
        if (addEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Mobile combustion added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (addEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [addEmissionData, dispatch, enqueueSnackbar, onCancel])

    const onCalculate = () => {
        const requestData = {
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
        dispatch(addMobileCombustion(requestData))
    };

    const onAddMobileCombustionData = () => {
        const requestData = {
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
        dispatch(addMobileCombustion(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div" >Add Mobile Combustion</Typography>
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
                                name="year"
                                label="Year"
                                onChange={(e, value) => formik.setFieldValue('year', value.id)}
                                onBlur={formik.handleBlur}
                                error={formik.touched.year && formik.errors.year}
                                options={yearList}
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
                            <CeroInfoPair title={<>CO<sub>2</sub></>} value={`${addEmissionData.data.co2} tonnes`} />
                            <CeroInfoPair title={<>CH<sub>4</sub></>} value={`${addEmissionData.data.ch4} tonnes`} />
                            <CeroInfoPair title={<>BioFuel CO<sub>2</sub></>} value={`${addEmissionData.data.biofuel_co2} tonnes`} />
                        </Grid>
                        <Grid className={classes.secondResultContainer} item container direction='column' xs={6}>
                            <CeroInfoPair title={<>CO<sub>2</sub>e</>} value={`${addEmissionData.data.co2e} tonnes`} />
                            <CeroInfoPair title={<>N<sub>2</sub>O</>} value={`${addEmissionData.data.n2o} tonnes`} />
                            <CeroInfoPair title={<>EF</>} value={<>{addEmissionData.data.ef} kgCO<sub>2</sub>e/unit</>} />
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSeconday)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Add Data"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onAddMobileCombustionData(formik.values)} />
            </Box>
        </Container >
    )
}

export default AddMobileCombustionForm;
