import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { sampleYear, months } from "../../../constants";
import { editPurchasedElectricityValidation } from './schema';
import { updatePurchasedElectricity, resetAddCombustionStatus, deleteEmissions } from '../../../redux/actions';

import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import useStyles from "./styles";

const EditPurchasedElectricityForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, facilitiesData, emissionInputs, onCancel } = props

    const [isFiltered, setIsFiltered] = useState(false);
    const [typesOfEmissionFactors, setTypesOfEmissionFactors] = useState([]);

    const isCalculateDone = useSelector(state => state.emission.updatePurchasedElectricity.isCalculateDone)
    const updateEmissionData = useSelector(state => state.emission.updatePurchasedElectricity)
    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)
    const facilitiesList = facilitiesData.map(item => ({ key: item?.id, value: item?.name }));
    const calculationApproach = (emissionInputs.calculation_approaches || []).map(item => ({ key: item?.id, value: item?.name }));
    const units = (emissionInputs.units || []).map(item => ({ key: item?.name, value: item?.name }));
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));

    const formik = useFormik({
        initialValues: {
            facility: emissionData.facility_id || '',
            year: emissionData.year || '',
            month: emissionData.month || '',
            calculationApproach: emissionData.calculation_approach_id || '',
            typeOfEmissionFactor: emissionData.type_of_emission_factors_id || '',
            unit: emissionData.unit || '',
            amountOfFuel: emissionData.amount || '',
        },
        validationSchema: editPurchasedElectricityValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        const selectedTypesOfEmissionFactors = (emissionInputs.types_of_emission_factors || [])
            .filter(item => item.calculation_approach_id === (formik.values.calculationApproach || emissionData.calculation_approach_id))
            .map(item => {
                return {
                    key: item?.id,
                    value: item?.name
                };
            });
        setTypesOfEmissionFactors(selectedTypesOfEmissionFactors)
        !!selectedTypesOfEmissionFactors && setTimeout(() => setIsFiltered(true), 200)
    }, [formik.values.calculationApproach, emissionInputs.types_of_emission_factors, emissionData.calculation_approach_id])

    useEffect(() => {
        if (updateEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Purchased electricity updated successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (updateEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [updateEmissionData, enqueueSnackbar, onCancel, dispatch])

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Purchased electricity deleted successfully', { variant: 'success' });
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
            calculation_approach_id: formik.values.calculationApproach,
            year: formik.values.year,
            month: formik.values.month,
            type_of_emission_factors_id: formik.values.typeOfEmissionFactor,
            unit: formik.values.unit + '',
            amount: parseInt(formik.values.amountOfFuel),
            save: false
        }
        dispatch(updatePurchasedElectricity(requestData))
    };

    const onUpdatePurchasedElectricity = () => {
        const requestData = {
            id: emissionId,
            facility_id: formik.values.facility,
            calculation_approach_id: formik.values.calculationApproach,
            year: formik.values.year,
            month: formik.values.month,
            type_of_emission_factors_id: formik.values.typeOfEmissionFactor,
            unit: formik.values.unit + '',
            amount: parseInt(formik.values.amountOfFuel),
            save: true
        }
        dispatch(updatePurchasedElectricity(requestData))
    };

    const onDeletePurchasedElectricity = () => {
        const requestData = {
            id: emissionId
        }
        dispatch(deleteEmissions(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography variant="h6" component="div" >Edit Purchased Electricity</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroSelect
                                required
                                id="facility"
                                key="facility"
                                name="facility"
                                label="Facility"
                                fullWidth
                                options={facilitiesList}
                                selectedValue={formik.values['facility'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.facility && formik.errors.facility}
                            />
                            {isFiltered && <CeroSelect
                                required
                                id="typeOfEmissionFactor"
                                key="typeOfEmissionFactor"
                                name="typeOfEmissionFactor"
                                label="Types of Emission Factor"
                                fullWidth
                                options={typesOfEmissionFactors}
                                selectedValue={formik.values['typeOfEmissionFactor'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.typeOfEmissionFactor && formik.errors.typeOfEmissionFactor}
                                disabled={!formik.values.calculationApproach}
                            />}
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
                            <CeroInput
                                required
                                id="amountOfFuel"
                                key="amountOfFuel"
                                name="amountOfFuel"
                                label="Amount of Fuel"
                                value={formik.values['amountOfFuel'] || ''}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.amountOfFuel && formik.errors.amountOfFuel}
                            />
                        </Grid>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroSelect
                                required
                                id="calculationApproach"
                                name="calculationApproach"
                                label="Calculation Approach"
                                fullWidth
                                options={calculationApproach}
                                selectedValue={formik.values['calculationApproach'] || ''}
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
                                selectedValue={formik.values['month'] || ''}
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
                                selectedValue={formik.values['unit'] || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.unit && formik.errors.unit}
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
                            <Typography className={classes.previewItem}>CO<sub>2</sub>: {updateEmissionData.data.co2} tonnes</Typography>
                            <Typography className={classes.previewItem}>CH<sub>4</sub>: {updateEmissionData.data.ch4} tonnes</Typography>
                            <Typography className={classes.previewItem}>CO<sub>2</sub>e: {updateEmissionData.data.co2e} tonnes</Typography>
                            {/* <Typography className={classes.previewItem}>BioFuel CO<sub>2</sub>: {updateEmissionData.data.biofuel_co2} tonnes</Typography> */}
                        </Grid>
                        <Grid item container direction='column' xs={6}>
                            <Typography className={classes.previewItem}>N<sub>2</sub>O: {updateEmissionData.data.n2o} tonnes</Typography>
                            <Typography className={classes.previewItem}>EF: {updateEmissionData.data.ef} kgCO<sub>2</sub>e/unit</Typography>
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Delete"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onDeletePurchasedElectricity(formik.values)} />
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSeconday)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Update"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onUpdatePurchasedElectricity(formik.values)} />
            </Box>
        </Container>
    )
}

export default EditPurchasedElectricityForm;
