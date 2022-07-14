import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { sampleYear, months } from "../../../constants";
import { addTransportationCombutionValidation } from './schema';
import { addTransportationCombustion, getEmissionInputFormat, resetAddCombustionStatus } from '../../../redux/actions';

import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroInfoPair from '../../../components/CeroInfoPair';
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
    const customActivityTypes = (emissionInputs?.custom_activity_types || []).map(item => ({ key: item?.id, value: item?.name, type: item?.unit_type }));
    const units = (emissionInputs?.units || []).filter((item) => !formik.values.activityType || item.type === activityTypes.find(item => item.key === formik.values.activityType)?.type)
        .map(item => ({ key: item?.name, value: item?.description }));
    const customUnits = (emissionInputs?.units || []).filter((item) => item.type === 'distance')
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
            vehicle_type_id: emissionFactorDataset.find((item) => item.key === formik.values.emissionFactorDataset)?.value !== 'Custom emission factor'
                ? formik.values.vehicleType :  null,
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
            vehicle_type_id: emissionFactorDataset.find((item) => item.key === formik.values.emissionFactorDataset)?.value !== 'Custom emission factor'
            ? formik.values.vehicleType :  null,
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
                <Typography className={classes.title} variant="h6" component="div" >Add Transportation</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' md={6} xs={12}>
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
                                options={emissionFactorDataset.find((item) => item.key === formik.values.emissionFactorDataset)?.value !== 'Custom emission factor'
                                    ? activityTypes : customActivityTypes }
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
                                error={formik.touched.year && formik.errors.year}
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
                        <Grid item container direction={'column'} md={6} xs={12}>
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
                            { emissionFactorDataset.find((item) => item.key === formik.values.emissionFactorDataset)?.value !== 'Custom emission factor' && (
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
                            />)}
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
                                options={emissionFactorDataset.find((item) => item.key === formik.values.emissionFactorDataset)?.value !== 'Custom emission factor'
                                ? units : customUnits }
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
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission Preview</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={12} md={6}>
                            <CeroInfoPair title={<>CO<sub>2</sub></>} value={`${addEmissionData.data.co2} tonnes`} />
                            <CeroInfoPair title={<>CH<sub>4</sub></>} value={`${addEmissionData.data.ch4} tonnes`} />
                            <CeroInfoPair title={<>CO<sub>2</sub>e</>} value={`${addEmissionData.data.co2e} tonnes`} />
                        </Grid>
                        <Grid className={classes.secondResultContainer} item container direction='column' xs={6}>
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
                    className={clsx(classes.button, classes.buttonSecondary)}
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
