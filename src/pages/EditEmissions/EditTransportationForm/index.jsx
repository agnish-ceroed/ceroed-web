import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { sampleYear, months } from "../../../constants";
import { addTransportationCombutionValidation } from './schema';
import { getEmissionInputFormat, deleteEmissions, editTransportationCombustion, resetAddCombustionStatus } from '../../../redux/actions';

import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import CeroInfoPair from '../../../components/CeroInfoPair';
import useStyles from "./styles";

const EditTransportationForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, onCancel } = props

    const isCalculateDone = useSelector(state => state.emission.editTransportationCombustion.isCalculateDone)
    const updateEmissionData = useSelector(state => state.emission.editTransportationCombustion)
    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)
    const emissionInputs = useSelector(state => state.emission.emissionInputs.data);

    const formik = useFormik({
        initialValues: {
            description: emissionData.description || '',
            category: emissionData.category_id || '',
            emissionFactorDataset: emissionData.ef_dataset_id || '',
            activityType: emissionData.activity_type_id || '',
            year: emissionData.year || '',
            month: emissionData.month || '',
            modeOfTransport: emissionData.mode_of_transport_id || '',
            vehicleType: emissionData.vehicle_type_id || '',
            amount: emissionData.amount || '',
            unit: emissionData.unit || '',
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

    useEffect(() => {
        dispatch(getEmissionInputFormat('transportation'));
        return () => {
            dispatch(resetAddCombustionStatus());
        }
    }, [dispatch]);

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Stationary combustion deleted successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    useEffect(() => {
        if (updateEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Transportation combustion updated successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus());
            onCancel('transportation');
        } else if (updateEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus());
        }
    }, [updateEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onCalculate = () => {
        const requestData = {
            id: emissionId,
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
        dispatch(editTransportationCombustion(requestData))
    };

    const onEditTransportationData = () => {
        const requestData = {
            id: emissionId,
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
        dispatch(editTransportationCombustion(requestData));
    };

    const onDeleteStationaryCombustion = () => {
        const requestData = {
            id: emissionId
        }
        dispatch(deleteEmissions(requestData));
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div" >Edit Transportation</Typography>
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
                                options={activityTypes}
                                selectedValue={formik.values.activityType || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.activityType && formik.errors.activityType}
                            />
                            <CeroSelect
                                required
                                id="year"
                                name="year"
                                label="Year"
                                fullWidth
                                options={sampleYear}
                                selectedValue={formik.values.year || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.year && formik.errors.year}
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
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission Preview</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={12} md={6}>
                            <CeroInfoPair title={<>CO<sub>2</sub></>} value={`${updateEmissionData.data.co2} tonnes`} />
                            <CeroInfoPair title={<>CH<sub>4</sub></>} value={`${updateEmissionData.data.ch4} tonnes`} />
                            <CeroInfoPair title={<>CO<sub>2</sub>e</>} value={`${updateEmissionData.data.co2e} tonnes`} />
                        </Grid>
                        <Grid className={classes.secondResultContainer} item container direction='column' xs={6}>
                            <CeroInfoPair title={<>N<sub>2</sub>O</>} value={`${updateEmissionData.data.n2o} tonnes`} />
                            <CeroInfoPair title={<>EF</>} value={<>{updateEmissionData.data.ef} kgCO<sub>2</sub>e/unit</>} />
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Delete Data"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onDeleteStationaryCombustion} />
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSecondary)}
                    onClick={onCancel} />
                <CeroButton
                    buttonText="Update"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onEditTransportationData} />
            </Box>
        </Container>
    )
}

export default EditTransportationForm;
