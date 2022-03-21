import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { months, sampleYear } from "../../../constants";
import { STATUS } from "../../../redux/constants";
import { addStationaryCombustionValidation } from './schema';
import { addStationaryCombustion, getEmissionFuelList, listFacilities, resetAddCombustionStatus } from '../../../redux/actions';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import useStyles from "./styles";

const AddStationaryCombustionForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const isCalculateDone = useSelector(state => state.emission.addStationaryCombustion.isCalculateDone)
    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const fuelData = useSelector(state => state.emission.fuelList.data);
    const fuelUnitData = useSelector(state => state.emission.fuelUnits.data);
    const addEmissionData = useSelector(state => state.emission.addStationaryCombustion)
    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));
    const fuelList = fuelData.map(item => ({ key: item.id, value: item.name }));
    const fuelUnits = fuelUnitData.map(item => ({ key: item.name, value: item.name }));

    useEffect(() => {
        if (addEmissionData.addStationaryCombustion.status === STATUS.SUCCESS) {
            enqueueSnackbar('Stationary combustion added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            props.onCancel('stationary_combustion');
        } else if (addEmissionData.addStationaryCombustion.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [addEmissionData.addStationaryCombustion, enqueueSnackbar])

    const formik = useFormik({
        initialValues: {
            facility: '',
            year: '',
            month: '',
            emissionType: '',
            fuel: '',
            fuelUnit: '',
            amountOfFuel: '',
        },
        validationSchema: addStationaryCombustionValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        dispatch(listFacilities())
        dispatch(getEmissionFuelList('stationary_combustion'))
        return () => { dispatch(resetAddCombustionStatus()) }
    }, [dispatch])

    useEffect(() => {
        if (addEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Stationary combustion added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            props.onCancel();
        } else if (addEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus());
        }
    }, [addEmissionData, dispatch, enqueueSnackbar])

    const onCalculate = () => {
        const requestData = {
            facility_id: formik.values.facility,
            emission_type: formik.values.emissionType,
            year: formik.values.year,
            month: formik.values.month,
            fuel_id: formik.values.fuel,
            unit: formik.values.fuelUnit,
            amount: formik.values.amountOfFuel,
            save: false
        }
        dispatch(addStationaryCombustion(requestData))
    };

    const onAddStationaryData = () => {
        const requestData = {
            facility_id: formik.values.facility,
            emission_type: formik.values.emissionType,
            year: formik.values.year,
            month: formik.values.month,
            fuel_id: formik.values.fuel,
            unit: formik.values.fuelUnit,
            amount: formik.values.amountOfFuel,
            save: true
        }
        dispatch(addStationaryCombustion(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography variant="h6" component="div" >Add emission data</Typography>
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
                                id="fuel"
                                name="fuel"
                                label="Fuel"
                                fullWidth
                                options={fuelList}
                                selectedValue={formik.values.fuel}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fuel && formik.errors.fuel}
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
                                id="emissionType"
                                name="emissionType"
                                label="Custom Emission Filter"
                                fullWidth
                                options={[{ key: "yes", value: "Yes" }, { key: "no", value: "No" }]}
                                selectedValue={formik.values.emissionType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.emissionType && formik.errors.emissionType}
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
                    onClick={() => props.onCancel('stationary_combustion')} />
                <CeroButton
                    buttonText="Add Data"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onAddStationaryData(formik.values)} />
            </Box>
        </Container>
    )
}

export default AddStationaryCombustionForm;
