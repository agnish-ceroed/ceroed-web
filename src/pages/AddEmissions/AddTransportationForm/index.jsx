import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { sampleYear, months } from "../../../constants";
import { addTransportationCombutionValidation } from './schema';
import { addTransportationCombustion, getEmissionInputFormat, resetAddCombustionStatus } from '../../../redux/actions';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import { STATUS } from "../../../redux/constants";
import CeroAutoComplete from '../../../components/CeroAutoComplete';
import useStyles from "./styles";

const AddTransportationForm = (props) => {
    const { onCancel } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const addEmissionData = useSelector(state => state.emission.addTransportationCombustion);
    const emissionInputs = useSelector(state => state.emission.emissionInputs.data);

    const isCalculateDone = addEmissionData.isCalculateDone;

    const formik = useFormik({
        initialValues: {
            description: '',
            category: '',
            emissionFactorDataset: '',
            activityType: '',
            year: '',
            month: '',
            modeOfTransport: '',
            vehicleType: '',
            amount: '',
            unit: '',
        },
        validationSchema: addTransportationCombutionValidation,
        onSubmit: () => { },
    });

    const vehicleTypes = (emissionInputs?.vehicle_types || []).filter((item) => !formik.values.modeOfTransport || item.transport_mode_id === formik.values.modeOfTransport)
        .map(item => ({ key: item?.id, value: item?.name }));
    const activityTypes = (emissionInputs?.activity_types || []).map(item => ({ key: item?.id, value: item?.name, type: item?.unit_type }));
    const units = (emissionInputs?.units || []).filter((item) => !formik.values.activityType || item.type === activityTypes.find(item => item.key === formik.values.activityType)?.type)
        .map(item => ({ key: item?.name, value: item?.description }));
    const transportModes = (emissionInputs?.transport_modes || []).map(item => ({ key: item?.id, value: item?.name }));
    const emissionFactorDataset = (emissionInputs?.ef_dataset || []).map(item => ({ key: item?.id, value: item?.name }));
    const categories = (emissionInputs?.categories || []).map(item => ({ key: item?.id, value: item?.name }));
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));


    useEffect(() => {
        dispatch(getEmissionInputFormat('transportation'));
        return () => {
            dispatch(resetAddCombustionStatus());
        }
    }, [dispatch]);

    useEffect(() => {
        if (addEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Transportation combustion added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus());
            onCancel('transportation');
        } else if (addEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus());
        }
    }, [addEmissionData, enqueueSnackbar, dispatch, onCancel])

    const onCalculate = () => {
        const requestData = {
            description: formik.values.description,
            category_id: formik.values.category,
            ef_dataset_id: formik.values.emissionFactorDataset,
            activity_type_id: formik.values.activityType,
            year: formik.values.year,
            mode_of_transport_id: formik.values.modeOfTransport,
            vehicle_type_id: formik.values.vehicleType,
            amount: parseFloat(formik.values.amount),
            month: formik.values.month,
            unit: formik.values.unit,
            save: false,
        }
        dispatch(addTransportationCombustion(requestData))
    };

    const onAddTransportationData = () => {
        const requestData = {
            description: formik.values.description,
            category_id: formik.values.category,
            ef_dataset_id: formik.values.emissionFactorDataset,
            activity_type_id: formik.values.activityType,
            year: formik.values.year,
            mode_of_transport_id: formik.values.modeOfTransport,
            vehicle_type_id: formik.values.vehicleType,
            amount: parseFloat(formik.values.amount),
            month: formik.values.month,
            unit: formik.values.unit,
            save: true
        }
        dispatch(addTransportationCombustion(requestData));
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography variant="h6" component="div" >Add Transportation</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroSelect
                                required
                                id="category"
                                name="category"
                                label="Category"
                                fullWidth
                                options={categories}
                                selectedValue={formik.values.category || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.category && formik.errors.category}
                            />
                            <CeroSelect
                                required
                                id="emissionFactorDataset"
                                name="emissionFactorDataset"
                                label="Emission Factor Dataset"
                                fullWidth
                                options={emissionFactorDataset}
                                selectedValue={formik.values.emissionFactorDataset || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.emissionFactorDataset && formik.errors.emissionFactorDataset}
                            />
                            <CeroSelect
                                required
                                id="activityType"
                                name="activityType"
                                label="Activity Type"
                                fullWidth
                                options={activityTypes}
                                selectedValue={formik.values.activityType || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.activityType && formik.errors.activityType}
                            />
                            <CeroAutoComplete
                                id="year"
                                label="Year"
                                onChange={(e, value) => formik.setFieldValue('year', value.id)}
                                onBlur={formik.handleBlur}
                                error={formik.errors.year}
                                options={yearList}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                            />
                            <CeroSelect
                                required
                                id="month"
                                name="month"
                                label="Month"
                                fullWidth
                                options={months}
                                selectedValue={formik.values.month || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.month && formik.errors.month}
                            />
                        </Grid>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroSelect
                                required
                                id="modeOfTransport"
                                name="modeOfTransport"
                                label="Mode of Transport"
                                fullWidth
                                options={transportModes}
                                selectedValue={formik.values.modeOfTransport || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.modeOfTransport && formik.errors.modeOfTransport}
                            />
                            <CeroSelect
                                required
                                id="vehicleType"
                                name="vehicleType"
                                label="Vehicle Type"
                                fullWidth
                                options={vehicleTypes}
                                selectedValue={formik.values.vehicleType || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.vehicleType && formik.errors.vehicleType}
                            />
                            <CeroInput
                                required
                                id="amount"
                                name="amount"
                                label="Amount of Activity Type"
                                value={formik.values.amount || ''}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.amount && formik.errors.amount}
                            />
                            <CeroSelect
                                required
                                id="unit"
                                name="unit"
                                label="Unit"
                                fullWidth
                                options={units}
                                selectedValue={formik.values.unit || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.unit && formik.errors.unit}
                            />
                            <CeroInput
                                required
                                id="description"
                                name="description"
                                label="Description"
                                value={formik.values.description || ''}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                    </Grid>
                    {/* <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction={'column'} xs={6}>
                            
                            
                        </Grid>
                    </Grid> */}
                    <CeroButton
                        buttonText="Calculate"
                        className={clsx(classes.button, classes.buttonPrimary)}
                        onClick={onCalculate}
                        disabled={!formik.dirty || !formik.isValid}
                    />
                </Box>
                {isCalculateDone && <Box className={classes.bottomContainer}>
                    <Typography variant="subtitle2" component="div" >Emission Preview</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>: {addEmissionData.data.co2} tonnes</Typography>
                            <Typography className={classes.previewItem}>CH<sub>4</sub>: {addEmissionData.data.ch4} tonnes</Typography>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>e: {addEmissionData.data.co2e} tonnes</Typography>
                            {/* <Typography className={classes.previewItem}>BioFuel CO<sub>2</sub>: {addEmissionData.data.biofuel_co2} tonnes</Typography> */}
                        </Grid>
                        <Grid item container direction='column' xs={6}>
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
                    onClick={() => props.onCancel('transportation')} />
                <CeroButton
                    buttonText="Add Data"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onAddTransportationData(formik.values)} />
            </Box>
        </Container>
    )
}

export default AddTransportationForm;
