import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { months, sampleYear } from "../../../constants";
import { STATUS } from "../../../redux/constants";
import { addWasteCombustionValidation } from './schema';
import { addWasteCombustion, getEmissionInputFormat, listFacilities, resetAddCombustionStatus } from '../../../redux/actions';

import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import useStyles from "./styles";

const AddWasteCombustion = (props) => {
    const { onCancel } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const isCalculateDone = useSelector(state => state.emission.addWasteCombustion.isCalculateDone)
    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const addEmissionData = useSelector(state => state.emission.addWasteCombustion)
    const emissionInputs = useSelector(state => state.emission.emissionInputs.data)

    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));
    const fuelUnits = emissionInputs && (emissionInputs.units || []).map(item => ({ key: item.name, value: item.name }));
    const wasteTypes = emissionInputs && (emissionInputs.waste_types_collection || []).map(item => ({ key: item.id, value: item.name }))
    const wasteHazardOption = emissionInputs && (emissionInputs.waste_hazard_options || []).map(item => ({ key: item.id, value: item.name }))
    const wasteDisposalOption = emissionInputs && (emissionInputs.waste_disposal_options || []).map(item => ({ key: item.id, value: item.name }))
    const wasteDisposalOperation = emissionInputs && (emissionInputs.waste_disposal_operations || []).map(item => ({ key: item.id, value: item.name }))
    const wasteDisposalLocation = emissionInputs && (emissionInputs.waste_disposal_locations || []).map(item => ({ key: item.id, value: item.name }))

    const formik = useFormik({
        initialValues: {
            facility: '',
            year: 0,
            month: 0,
            wasteType: '',
            wasteHazardOption: '',
            wasteDisposalOption: '',
            wasteDisposalOperation: '',
            wasteDisposalLocation: '',
            amount: 0,
            unit: ''
        },
        validationSchema: addWasteCombustionValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        dispatch(listFacilities())
        dispatch(getEmissionInputFormat('waste'))
        return () => { dispatch(resetAddCombustionStatus()) }
    }, [dispatch])

    useEffect(() => {
        if (addEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Waste combustion added successfully', { variant: 'success' });
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
            waste_type_id: formik.values.wasteType,
            waste_hazard_option_id: formik.values.wasteHazardOption,
            waste_disposal_option_id: formik.values.wasteDisposalOption,
            waste_disposal_operation_id: formik.values.wasteDisposalOperation,
            waste_disposal_location_id: formik.values.wasteDisposalLocation,
            amount: formik.values.amount,
            unit: formik.values.unit,
            save: false
        }
        dispatch(addWasteCombustion(requestData))
    };

    const onAddWasteCombustionData = () => {
        const requestData = {
            facility_id: formik.values.facility,
            year: formik.values.year,
            month: formik.values.month,
            waste_type_id: formik.values.wasteType,
            waste_hazard_option_id: formik.values.wasteHazardOption,
            waste_disposal_option_id: formik.values.wasteDisposalOption,
            waste_disposal_operation_id: formik.values.wasteDisposalOperation,
            waste_disposal_location_id: formik.values.wasteDisposalLocation,
            amount: formik.values.amount,
            unit: formik.values.unit,
            save: true
        }
        dispatch(addWasteCombustion(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography variant="h6" component="div" >Add Waste Combustion</Typography>
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
                                id="wasteHazardOption"
                                name="wasteHazardOption"
                                label="Waste hazard option"
                                fullWidth
                                options={wasteHazardOption}
                                selectedValue={formik.values.wasteHazardOption}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.wasteHazardOption && formik.errors.wasteHazardOption}
                            />
                            <CeroSelect
                                required
                                id="wasteDisposalLocation"
                                name="wasteDisposalLocation"
                                label="Waste disposal location"
                                fullWidth
                                options={wasteDisposalLocation}
                                selectedValue={formik.values.wasteDisposalLocation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.wasteDisposalLocation && formik.errors.wasteDisposalLocation}
                            />
                            <CeroInput
                                required
                                id="amount"
                                name="amount"
                                label="Amount of Fuel"
                                value={formik.values.amount}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.amount && formik.errors.amount}
                            />

                        </Grid>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroSelect
                                required
                                id="wasteType"
                                name="wasteType"
                                label="Waste type"
                                fullWidth
                                options={wasteTypes}
                                selectedValue={formik.values.wasteType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.wasteType && formik.errors.wasteType}
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
                                id="wasteDisposalOption"
                                name="wasteDisposalOption"
                                label="Waste disposal option"
                                fullWidth
                                options={wasteDisposalOption}
                                selectedValue={formik.values.wasteDisposalOption}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.wasteDisposalOption && formik.errors.wasteDisposalOption}
                            />
                            <CeroSelect
                                required
                                id="wasteDisposalOperation"
                                name="wasteDisposalOperation"
                                label="Waste disposal operation"
                                fullWidth
                                options={wasteDisposalOperation}
                                selectedValue={formik.values.wasteDisposalOperation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.wasteDisposalOperation && formik.errors.wasteDisposalOperation}
                            />
                            <CeroSelect
                                required
                                id="unit"
                                name="unit"
                                label="Fuel Unit"
                                fullWidth
                                options={fuelUnits}
                                selectedValue={formik.values.unit}
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
                    onClick={() => props.onCancel('waste')} />
                <CeroButton
                    buttonText="Add Data"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onAddWasteCombustionData(formik.values)} />
            </Box>
        </Container>
    )
}

export default AddWasteCombustion;
