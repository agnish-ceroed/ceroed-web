import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { months, sampleYear } from "../../../constants";
import { STATUS } from "../../../redux/constants";
import { addWaterDischargeCombustionValidation } from './schema';
import { addWaterDischargeCombustion, getEmissionInputFormat, resetAddCombustionStatus } from '../../../redux/actions';

import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import CeroInfoPair from '../../../components/CeroInfoPair';
import useStyles from "./styles";

const AddWaterDischargeForm = (props) => {
    const { onCancel } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const isCalculateDone = useSelector(state => state.emission.addWaterDischarge.isCalculateDone)
    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const addEmissionData = useSelector(state => state.emission.addWaterDischarge)
    const emissionInputs = useSelector(state => state.emission.emissionInputs.data)

    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));
    const fuelUnits = emissionInputs && (emissionInputs.units || []).map(item => ({ key: item.name, value: item.name }));
    const waterDestinationList = emissionInputs && (emissionInputs.water_destinations || []).map(item => ({ key: item.id, value: item.name }))
    const stressTypeList = emissionInputs && (emissionInputs.water_destination_stress_types || []).map(item => ({ key: item.id, value: item.name }))
    const destinationTypeList = emissionInputs && (emissionInputs.water_destination_types || []).map(item => ({ key: item.id, value: item.name }))
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));

    const formik = useFormik({
        initialValues: {
            facility: '',
            year: '',
            month: '',
            destination: '',
            stressType: '',
            destinationType: '',
            treatmentRequired: '',
            treatmentLevel: '',
            amountOfFuel: '',
            fuelUnit: '',
        },
        validationSchema: addWaterDischargeCombustionValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        dispatch(getEmissionInputFormat('water_discharge'))
        return () => { dispatch(resetAddCombustionStatus()) }
    }, [dispatch])

    useEffect(() => {
        if (addEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Water discharge combustion added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (addEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus());
        }
    }, [addEmissionData, dispatch, enqueueSnackbar, onCancel])

    const onCalculate = () => {
        const requestData = {
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
        dispatch(addWaterDischargeCombustion(requestData))
    };

    const onAddWaterDischargeData = () => {
        const requestData = {
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
        dispatch(addWaterDischargeCombustion(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div">Add Water Discharge</Typography>
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
                                label="Amount of Water"
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
                            <CeroAutoComplete
                                id="year"
                                label="Year"
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
                                label="Unit"
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
                        <Grid item container direction='column' xs={12} md={6}>
                            <CeroInfoPair title="Usage" value={`${addEmissionData.data.usage} ${addEmissionData.data.usage_unit}`} />
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSecondary)}
                    onClick={() => props.onCancel('water_discharge')} />
                <CeroButton
                    buttonText="Add Data"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onAddWaterDischargeData(formik.values)} />
            </Box>
        </Container>
    )
}

export default AddWaterDischargeForm;
