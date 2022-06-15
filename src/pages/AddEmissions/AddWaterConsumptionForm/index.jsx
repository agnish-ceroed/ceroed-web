import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { months, sampleYear } from "../../../constants";
import { STATUS } from "../../../redux/constants";
import { waterConsumptionValidation } from './schema';
import { addWaterConsumptionCombustion, getEmissionInputFormat, resetAddCombustionStatus } from '../../../redux/actions';

import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import CeroInfoPair from '../../../components/CeroInfoPair';
import useStyles from "./styles";

const AddWaterConsumptionForm = (props) => {
    const { onCancel } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const isCalculateDone = useSelector(state => state.emission.addWaterConsumption.isCalculateDone)
    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const addEmissionData = useSelector(state => state.emission.addWaterConsumption)
    const emissionInputs = useSelector(state => state.emission.emissionInputs.data)

    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));
    const stressTypeList = emissionInputs && (emissionInputs.water_source_stress_types || []).map(item => ({ key: item.id, value: item.name }));
    const sourceTypeList = emissionInputs && (emissionInputs.water_source_types || []).map(item => ({ key: item.id, value: item.name }));
    const sourceList = emissionInputs && (emissionInputs.water_sources || []).map(item => ({ key: item.id, value: item.name }));
    const fuelUnits = emissionInputs && (emissionInputs.units || []).map(item => ({ key: item.name, value: item.name }));
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));

    const formik = useFormik({
        initialValues: {
            facility: '',
            year: '',
            month: '',
            source: '',
            stressType: '',
            sourceType: '',
            fuelUnit: '',
            amountOfFuel: '',
        },
        validationSchema: waterConsumptionValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        dispatch(getEmissionInputFormat('water_consumption'))
        return () => { dispatch(resetAddCombustionStatus()) }
    }, [dispatch])

    useEffect(() => {
        if (addEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Water consumption combustion added successfully', { variant: 'success' });
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
            source_id: formik.values.source,
            stress_type_id: formik.values.stressType,
            source_type_id: formik.values.sourceType,
            unit: formik.values.fuelUnit,
            amount: parseFloat(formik.values.amountOfFuel),
            save: false
        }
        dispatch(addWaterConsumptionCombustion(requestData))
    };

    const onAddWaterConsumptionData = () => {
        const requestData = {
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
        dispatch(addWaterConsumptionCombustion(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div" >Add Water Consumption</Typography>
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
                    onClick={() => onCancel('water_consumption')} />
                <CeroButton
                    buttonText="Add Data"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onAddWaterConsumptionData(formik.values)} />
            </Box>
        </Container>
    )
}

export default AddWaterConsumptionForm;
