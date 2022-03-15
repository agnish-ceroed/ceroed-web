import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { sampleYear, months } from "../../../constants";
import { addPurchasedElectricityValidation } from './schema';
import { addPurchasedElectricity, listFacilities, resetAddCombustionStatus, getEmissionInputFormat } from '../../../redux/actions';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import { STATUS } from "../../../redux/constants";
import useStyles from "./styles";

const AddPurchasedElectricityForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [isCalculateDone, setIsCalculateDone] = useState(false);
    const [typesOfEmissionFactors, setTypesOfEmissionFactors] = useState([]);

    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const addEmissionData = useSelector(state => state.emission);
    const emissionInputs = useSelector(state => state.emission.emissionInputs.data);

    const facilitiesList = facilitiesData.map(item => ({ key: item?.id, value: item?.name }));
    const calculationApproach = (emissionInputs.calculation_approaches||[]).map(item => ({ key: item?.id, value: item?.name }));
    const units = (emissionInputs.units||[]).map(item => ({ key: item?.name, value: item?.name }));

    const formik = useFormik({
        initialValues: {
            facility: '',
            year: '',
            month: '',
            calculationApproach: '',
            typeOfEmissionFactor: '',
            unit: '',
            amountOfFuel: '',
        },
        validationSchema: addPurchasedElectricityValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        dispatch(getEmissionInputFormat('purchased_electricity'))
        dispatch(listFacilities())
    }, [])

    useEffect(() => {
        const selectedTypesOfEmissionFactors = (emissionInputs.types_of_emission_factors||[])
        .filter(item => item.calculation_approach_id === formik.values.calculationApproach)
        .map(item => ({ key: item?.id, value: item?.name }));
        setTypesOfEmissionFactors(selectedTypesOfEmissionFactors)
    }, [formik.values.calculationApproach, emissionInputs.types_of_emission_factors])

    useEffect(() => {
        if (addEmissionData.addPurchasedElectricity.status === STATUS.SUCCESS) {
            enqueueSnackbar('Purchased electricity added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            props.onCancel('purchased_electricity');
        } else if (addEmissionData.addPurchasedElectricity.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [addEmissionData.addPurchasedElectricity, enqueueSnackbar])

    const onCalculate = () => {
        //API for calculation
        setIsCalculateDone(true);
    };

    const onAddPurchasedElectricity = () => {
        const requestData = {
            facility_id: formik.values.facility,
            calculation_approach_id: formik.values.calculationApproach,
            year: formik.values.year,
            month: formik.values.month,
            type_of_emission_factors_id: formik.values.typeOfEmissionFactor,
            unit: formik.values.unit + '',
            amount: parseInt(formik.values.amountOfFuel),
            save: true
        }
        dispatch(addPurchasedElectricity(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography variant="h6" component="div" >Add emission data</Typography>
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
                            <CeroSelect
                                required
                                id="year"
                                key="year"
                                name="year"
                                label="Year"
                                fullWidth
                                options={sampleYear}
                                selectedValue={formik.values.year || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.year && formik.errors.year}
                            />
                            <CeroInput
                                required
                                id="amountOfFuel"
                                key="amountOfFuel"
                                name="amountOfFuel"
                                label="Amount of Fuel"
                                value={formik.values.amountOfFuel || ''}
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
                    <Typography variant="subtitle2" component="div" >Emission Preview</Typography>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroInput
                                required
                                id="co2"
                                label="CO2 : 0 (tonnes)"
                                value="0"
                                fullWidth
                                disabled />
                            <CeroInput
                                required
                                id="n2o"
                                label="N2O : 0 (tonnes)"
                                value="0"
                                fullWidth
                                disabled />
                            <CeroInput
                                required
                                id="biofuel"
                                label="Biofuel : 0 tonnes"
                                value="0"
                                fullWidth
                                disabled />
                        </Grid>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroInput
                                required
                                id="co4"
                                label="CO4 : 0 (tonnes)"
                                value="0"
                                fullWidth
                                disabled />
                            <CeroInput
                                required
                                id="co2e"
                                label="CO2e : 0 (tonnes)"
                                value="0"
                                fullWidth
                                disabled />
                            <CeroInput
                                required
                                id="ef"
                                label="EF(kgCO2e/unit)"
                                value="0"
                                fullWidth
                                disabled />
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSeconday)}
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
