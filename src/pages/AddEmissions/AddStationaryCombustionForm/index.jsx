import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';

import { sampleYear, sampleFilterType } from "../../../constants";
import { addStationaryCombutionValidation } from './schema';
import { addStationaryCombustion, listFacilities, resetAddCombustionStatus } from '../../../redux/actions';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import { STATUS } from "../../../redux/constants";
import useStyles from "./styles";

const AddStationaryCombustionForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [isCalculateDone, setIsCalculateDone] = useState(false);

    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const addEmissionData = useSelector(state => state.emission);

    const facilitiesList = facilitiesData.map(item => ({ key: item?.id,value: item?.name }));

    useEffect(() => {
        dispatch(listFacilities());
    }, []);

    useEffect(() => {
        if (addEmissionData.addStationaryCombustion.status === STATUS.SUCCESS) {
            enqueueSnackbar('Stationary combustion added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus());
            props.onCancelAdd();
        } else if (addEmissionData.addStationaryCombustion.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus());
        }
    }, [addEmissionData.addStationaryCombustion, enqueueSnackbar])

    const formik = useFormik({
        initialValues: {
            facility: '',
            year: '',
            month: '',
            emissionType: '',
            fuelType: '',
            fuel: '',
            fuelUnit: '',
            amountOfFuel: '',
        },
        validationSchema: addStationaryCombutionValidation,
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
        dispatch(addStationaryCombustion(requestData))
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
                                options={sampleYear}
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
                                options={sampleFilterType}
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
                                id="fuelType"
                                name="fuelType"
                                label="Fuel Type"
                                fullWidth
                                options={sampleFilterType}
                                selectedValue={formik.values.fuelType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fuelType && formik.errors.fuelType}
                            />
                            <CeroSelect
                                required
                                id="fuelUnit"
                                name="fuelUnit"
                                label="Fuel Unit"
                                fullWidth
                                options={sampleFilterType}
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

export default AddStationaryCombustionForm;
