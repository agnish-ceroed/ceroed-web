import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { sampleYear } from "../../../constants";
import { addTransportationCombutionValidation } from './schema';
import { addTransportationCombustion, listFacilities, resetAddCombustionStatus } from '../../../redux/actions';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import { STATUS } from "../../../redux/constants";
import useStyles from "./styles";

const sampleCategory = [
    {
        key: 'upstream',
        value: 'Upstream T&D',
    }, {
        key: 'business_travel',
        value: 'Business Travel',
    }, {
        key: 'employee_commute',
        value: 'Employee Commute',
    }
];

const sampleEmissionFactorDataset = [
    {
        key: 'custom_emission_factor',
        value: 'Custom Emission Factor',
    }, {
        key: 'us_epa',
        value: 'US EPA',
    }
];

const sampleActivityType = [
    {
        key: "example_s3",
        value: "Example S#",
    }, {
        key: 'distance',
        value: 'Distance',
    },
]

const AddTransportationForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [isCalculateDone, setIsCalculateDone] = useState(false);

    const addEmissionData = useSelector(state => state.emission)

    useEffect(() => {
        dispatch(listFacilities())
    }, [])

    useEffect(() => {
        if (addEmissionData.addTransportationCombustion.status === STATUS.SUCCESS) {
            enqueueSnackbar('Transportation combustion added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus());
            props.onCancel();
        } else if (addEmissionData.addTransportationCombustion.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus());
        }
    }, [addEmissionData.addTransportationCombustion, enqueueSnackbar])

    const formik = useFormik({
        initialValues: {
            description: '',
            category: '',
            emissionFactorDataset: '',
            activityType: '',
            year: '',
            modeOfTransport: '',
            vehicleType: '',
            amount: '',
            unit: '',
        },
        validationSchema: addTransportationCombutionValidation,
        onSubmit: () => { },
    });

    const onCalculate = () => {
        //API for calculation
        setIsCalculateDone(true);
    };

    const onAddStationaryData = () => {
        const requestData = {
            facility_id: formik.values.facility,
            emission_type: formik.values.emissionType,
            year: formik.values.year,
            month: formik.values.month,
            fuel_type_id: formik.values.fuelType,
            fuel_id: formik.values.fuel,
            unit: formik.values.fuelUnit,
            amount: formik.values.amountOfFuel,
            save: true
        }
        dispatch(addTransportationCombustion(requestData))
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
                                id="category"
                                name="category"
                                label="Category"
                                fullWidth
                                options={sampleCategory}
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
                                options={sampleEmissionFactorDataset}
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
                                options={sampleActivityType}
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
                        </Grid>
                        <Grid item container direction={'column'} xs={6}>
                            <CeroSelect
                                required
                                id="modeOfTransport"
                                name="modeOfTransport"
                                label="Mode of Transport"
                                fullWidth
                                options={[{ key: "car", value: "Car" }, { key: "bus", value: "Bus" }]}
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
                                options={[{ key: "type_a", value: "Type A" }, { key: "type_b", value: "Type B" }]}
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
                                options={[{ key: "mile", value: "Mile" }, { key: "passenger_mile", value: "Passenger Mile" }]}
                                selectedValue={formik.values.unit || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.unit && formik.errors.unit}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'} spacing={8}>
                        <Grid item container direction={'column'} xs={12}>
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
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Add Data"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => onAddStationaryData(formik.values)} />
            </Box>
        </Container>
    )
}

export default AddTransportationForm;
