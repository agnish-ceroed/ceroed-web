import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { months, sampleYear } from "../../../constants";
import { STATUS } from "../../../redux/constants";
import { addWaterDischargeCombustionValidation } from './schema';
import { addWaterDischargeCombustion, getEmissionInputFormat, listFacilities, resetAddCombustionStatus } from '../../../redux/actions';

import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
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
    const fuelUnits = emissionInputs && (emissionInputs.units||[]).map(item => ({ key: item.name, value: item.name }));
    const waterDestinationList = emissionInputs && (emissionInputs.water_destinations||[]).map(item => ({ key: item.id, value: item.name }))
    const stressTypeList = emissionInputs && (emissionInputs.water_destination_stress_types||[]).map(item => ({ key: item.id, value: item.name }))
    const destinationTypeList = emissionInputs && (emissionInputs.water_destination_types||[]).map(item => ({ key: item.id, value: item.name }))

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
        dispatch(listFacilities())
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
            amount: formik.values.amountOfFuel,
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
            amount: formik.values.amountOfFuel,
            unit: formik.values.fuelUnit,
            save: true
        }
        dispatch(addWaterDischargeCombustion(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography variant="h6" component="div" >Add Water Discharge</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
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
                                options={[{ key: 'yes', value: 'Yes' }, { key: 'no', value: 'No' }]}
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
                            <CeroSelect
                                required
                                id="year"
                                name="year"
                                label="Year"
                                fullWidth
                                options={sampleYear}
                                selectedValue={formik.values.year}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.year && formik.errors.year}
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
                            <Typography className={classes.previewItem}>CO<sub>2</sub>: {addEmissionData.data.co2} tonnes</Typography>
                            <Typography className={classes.previewItem}>CH<sub>4</sub>: {addEmissionData.data.ch4} tonnes</Typography>
                            <Typography className={classes.previewItem}>BioFuel CO<sub>2</sub>: {addEmissionData.data.biofuel_co2} tonnes</Typography>
                        </Grid>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>e: {addEmissionData.data.co2e} tonnes</Typography>
                            <Typography className={classes.previewItem}>N<sub>2</sub>O: {addEmissionData.data.n2o} tonnes</Typography>
                            <Typography className={classes.previewItem}>EF: {addEmissionData.data.ef} kgCO<sub>2</sub>e/unit</Typography>
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSeconday)}
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
