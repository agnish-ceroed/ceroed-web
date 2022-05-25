import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { sampleYear, months } from "../../../constants";
import { updateStationaryCombustionValidation } from './schema';
import { updateStationaryCombustion, resetAddCombustionStatus, deleteEmissions, getEmissionFuelList } from '../../../redux/actions';

import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import useStyles from "./styles";
import CeroInfoPair from '../../../components/CeroInfoPair';

const EditStationaryCombustionForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, facilitiesData, onCancel } = props

    const isCalculateDone = useSelector(state => state.emission.updateStationaryCombustion.isCalculateDone)
    const updateEmissionData = useSelector(state => state.emission.updateStationaryCombustion)
    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)
    const fuelData = useSelector(state => state.emission.fuelList.data);
    const fuelUnitData = useSelector(state => state.emission.fuelUnits.data);

    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));
    const fuelList = fuelData.map(item => ({ key: item.id, value: item.name }));
    const fuelUnits = fuelUnitData.map(item => ({ key: item.name, value: item.name }));
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));

    const formik = useFormik({
        initialValues: {
            facility: emissionData.facility_id || '',
            year: emissionData.year || '',
            month: emissionData.month || '',
            emissionType: emissionData.emission_type || 'no',
            fuel: emissionData.fuel_id || '',
            fuelUnit: emissionData.unit || '',
            amountOfFuel: emissionData.amount || ''
        },
        validationSchema: updateStationaryCombustionValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        dispatch(getEmissionFuelList('stationary_combustion'))
    }, [dispatch])

    useEffect(() => {
        if (updateEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Stationary combustion updated successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (updateEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [updateEmissionData, enqueueSnackbar, onCancel, dispatch])

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

    const onCalculate = () => {
        const requestData = {
            id: emissionId,
            facility_id: formik.values.facility,
            emission_type: formik.values.emissionType,
            year: formik.values.year,
            month: formik.values.month,
            fuel_id: formik.values.fuel,
            unit: formik.values.fuelUnit,
            amount: parseFloat(formik.values.amountOfFuel),
            save: false
        }
        dispatch(updateStationaryCombustion(requestData))
    };

    const onUpdateStationaryCombustion = () => {
        const requestData = {
            id: emissionId,
            facility_id: formik.values.facility,
            emission_type: formik.values.emissionType,
            year: formik.values.year,
            month: formik.values.month,
            fuel_id: formik.values.fuel,
            unit: formik.values.fuelUnit,
            amount: parseFloat(formik.values.amountOfFuel),
            save: true
        }
        dispatch(updateStationaryCombustion(requestData))
    };

    const onDeleteStationaryCombustion = () => {
        const requestData = {
            id: emissionId
        }
        dispatch(deleteEmissions(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div" >Edit Stationary Combustion</Typography>
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
                        <Grid item container direction={'column'} md={6} xs={12}>
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
                        <Grid item container direction='column' xs={12} md={6}>
                            <CeroInfoPair title={<>CO<sub>2</sub>e</>} value={`${updateEmissionData.data.co2} tonnes`} />
                            <CeroInfoPair title={<>CH<sub>4</sub>e</>} value={`${updateEmissionData.data.ch4} tonnes`} />
                            <CeroInfoPair title={<>BioFuel CO<sub>2</sub></>} value={`${updateEmissionData.data.biofuel_co2} tonnes`} />
                        </Grid>
                        <Grid className={classes.secondResultContainer} item container direction='column' xs={6}>
                            <CeroInfoPair title={<>CO<sub>2</sub>e</>} value={`${updateEmissionData.data.co2e} tonnes`} />
                            <CeroInfoPair title={<>N<sub>2</sub>O</>} value={`${updateEmissionData.data.n2o} tonnes`} />
                            <CeroInfoPair title={'EF'} value={<>{updateEmissionData.data.ef} kgCO<sub>2</sub>e/unit</>} />
                            <Typography className={classes.previewItem}></Typography>
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Delete"
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onDeleteStationaryCombustion(formik.values)} />
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSecondary)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Update"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onUpdateStationaryCombustion(formik.values)} />
            </Box>
        </Container>
    )
}

export default EditStationaryCombustionForm;
