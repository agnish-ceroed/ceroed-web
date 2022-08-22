import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { sampleYear, months } from "../../../constants";
import { addPurchasedElectricityValidation } from './schema';
import { addPurchasedElectricity, resetAddCombustionStatus, getEmissionInputFormat } from '../../../redux/actions';

import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import CeroInfoPair from '../../../components/CeroInfoPair';
import useStyles from "./styles";

const AddPurchasedElectricityForm = (props) => {
    const { onCancel } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [typesOfEmissionFactors, setTypesOfEmissionFactors] = useState([]);

    const isCalculateDone = useSelector(state => state.emission.addPurchasedElectricity.isCalculateDone)
    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const addEmissionData = useSelector(state => state.emission.addPurchasedElectricity);
    const emissionInputs = useSelector(state => state.emission.emissionInputs.data);

    const formik = useFormik({
        initialValues: {
            facility: '',
            year: '',
            month: '',
            calculationApproach: '',
            typeOfEmissionFactor: '',
            unit: '',
            amount: '',
            customEmissionType: '',
        },
        validationSchema: addPurchasedElectricityValidation,
        onSubmit: () => { },
    });

    const facilitiesList = facilitiesData.map(item => ({ key: item?.id, value: item?.name }));
    const calculationApproach = (emissionInputs.calculation_approaches || []).map(item => ({ key: item?.id, value: item?.name }));
    const units = (emissionInputs.units || []).map(item => ({ key: item?.name, value: item?.name }));
    const customEmissionTypes = (emissionInputs.custom_types_of_emissions || []).filter(item => item.scope_activity === (emissionInputs.calculation_approaches || []).find(item => item.id === formik.values.calculationApproach)?.scope_activity)
    .map(item => ({ key: item?.id, value: item?.name }));
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));

    useEffect(() => {
        dispatch(getEmissionInputFormat('purchased_electricity'))
        return () => { dispatch(resetAddCombustionStatus()) }
    }, [dispatch])

    useEffect(() => {
        const selectedTypesOfEmissionFactors = (emissionInputs.types_of_emission_factors || [])
            .filter(item => item.calculation_approach_id === formik.values.calculationApproach)
            .map(item => ({ key: item?.id, value: item?.name }));
        setTypesOfEmissionFactors(selectedTypesOfEmissionFactors)
    }, [formik.values.calculationApproach, emissionInputs.types_of_emission_factors])

    useEffect(() => {
        if (addEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Purchased electricity added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel('purchased_electricity');
        } else if (addEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar(addEmissionData.message.message || "Something went wrong", { variant: 'error' });
        }
    }, [addEmissionData, enqueueSnackbar, dispatch, onCancel])

    const onCalculate = () => {
        const requestData = {
            facility_id: formik.values.facility,
            calculation_approach_id: formik.values.calculationApproach,
            year: formik.values.year,
            month: formik.values.month,
            type_of_emission_factors_id: formik.values.typeOfEmissionFactor,
            unit: formik.values.unit + '',
            amount: parseFloat(formik.values.amount),
            custom_type_emission_id: typesOfEmissionFactors.find((item) => item.key === formik.values.typeOfEmissionFactor)?.value === 'Custom emission factor'
                ? formik.values.customEmissionType : null,
            save: false
        }
        dispatch(addPurchasedElectricity(requestData))
    };

    const onAddPurchasedElectricity = () => {
        const requestData = {
            facility_id: formik.values.facility,
            calculation_approach_id: formik.values.calculationApproach,
            year: formik.values.year,
            month: formik.values.month,
            type_of_emission_factors_id: formik.values.typeOfEmissionFactor,
            unit: formik.values.unit + '',
            amount: parseFloat(formik.values.amount),
            custom_type_emission_id: typesOfEmissionFactors.find((item) => item.key === formik.values.typeOfEmissionFactor)?.value === 'Custom emission factor'
                ? formik.values.customEmissionType : null,
            save: true
        }
        dispatch(addPurchasedElectricity(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div">Add Purchased Electricity</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' md={6} xs={12}>
                            <CeroSelect
                                required
                                id="facility"
                                key="facility"
                                name="facility"
                                label="Facility"
                                fullWidth
                                options={facilitiesList}
                                selectedValue={formik.values.facility || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.facility && formik.errors.facility}
                            />
                            <CeroSelect
                                required
                                id="typeOfEmissionFactor"
                                key="typeOfEmissionFactor"
                                name="typeOfEmissionFactor"
                                label="Types of Emission Factor"
                                fullWidth
                                options={typesOfEmissionFactors}
                                selectedValue={formik.values.typeOfEmissionFactor || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.typeOfEmissionFactor && formik.errors.typeOfEmissionFactor}
                                disabled={!formik.values.calculationApproach}
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
                            <CeroInput
                                required
                                id="amount"
                                key="amount"
                                name="amount"
                                label="Amount"
                                value={formik.values.amount || ''}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.amount && formik.errors.amount}
                            />
                        </Grid>
                        <Grid item container direction={'column'} md={6} xs={12}>
                            <CeroSelect
                                required
                                id="calculationApproach"
                                name="calculationApproach"
                                label="Calculation Approach"
                                fullWidth
                                options={calculationApproach}
                                selectedValue={formik.values.calculationApproach || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.calculationApproach && formik.errors.calculationApproach}
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
                            <CeroSelect
                                required
                                id="unit"
                                key="unit"
                                name="unit"
                                label="Unit"
                                fullWidth
                                options={units}
                                selectedValue={formik.values.unit || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.unit && formik.errors.unit}
                            />
                            {typesOfEmissionFactors.find((item) => item.key === formik.values.typeOfEmissionFactor)?.value === 'Custom emission factor' && (<CeroSelect
                                required
                                id="customEmissionType"
                                key="customEmissionType"
                                name="customEmissionType"
                                label="Custom Emission Type"
                                fullWidth
                                options={customEmissionTypes}
                                selectedValue={formik.values.customEmissionType || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.customEmissionType && formik.errors.customEmissionType}
                            />)}
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
                            <CeroInfoPair title={<>CO<sub>4</sub></>} value={`${addEmissionData.data.ch4} tonnes`} />
                            <CeroInfoPair title={<>CO<sub>2</sub>e</>} value={`${addEmissionData.data.co2e} tonnes`} />
                        </Grid>
                        <Grid className={classes.secondResultContainer} item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>N<sub>2</sub>O: {addEmissionData.data.n2o} tonnes</Typography>
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
                    onClick={() => props.onCancel('purchased_electricity')} />
                <CeroButton
                    buttonText="Add Data"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onAddPurchasedElectricity(formik.values)} />
            </Box>
        </Container>
    )
}

export default AddPurchasedElectricityForm;
