import React, { useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';

import { Container, Grid, Typography } from "@mui/material"; 
import { Box } from '@mui/system';

import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import {sampleYear, sampleFilterType, sampleFacility} from "../../../constants";

import useStyles from "./styles";  

const AddEmissionForm = (props) => {
    const classes = useStyles();
    const [isCalculateDone, setIsCalculateDone] = useState(false);
    const formik = useFormik({
        initialValues: {
            facility:  '',
            year:  '',
            customEmissionFilter:  '',
            fuelType: '',
            amountOfFuel: '',
            facility1: '',
            year1:  '',
            customEmissionFilter1: '',
            fuelType1: '',
            amountOfFuel1: '',
        },
        onSubmit: () => {},
      });

    const onCalculate = () => {
        //API for calculation
        setIsCalculateDone(true);
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography variant="h6" component="div" >Add emission data</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'}>
                        <Grid item container direction={'column'} xs={4}>
                            <CeroSelect
                                required
                                id="facility"
                                name="facility"
                                label="Facility"
                                fullWidth
                                options={sampleFacility}
                                selectedValue={formik.values['facility']||''}
                                onChange={formik.handleChange}/>
                            <CeroSelect
                                required
                                id="year"
                                name="year"
                                label="Year"
                                fullWidth
                                options={sampleYear}
                                selectedValue={formik.values['year']||''}
                                onChange={formik.handleChange}/>
                            <CeroSelect
                                required
                                id="customEmissionFilter"
                                name="customEmissionFilter"
                                label="Custom Emission Filter"
                                fullWidth
                                options={[{key: "yes", value: "Yes"}, {key: "no", value: "No"}]}
                                selectedValue={formik.values['customEmissionFilter']||''}
                                onChange={formik.handleChange}/>
                            <CeroSelect
                                required
                                id="fuelType"
                                name="fuelType"
                                label="Fuel Type"
                                fullWidth
                                options={sampleFilterType}
                                selectedValue={formik.values['fuelType']||''}
                                onChange={formik.handleChange}/>
                            <CeroInput
                                required
                                id="amountOfFuel"
                                name="amountOfFuel"
                                label="Amount of Fuel"
                                value={formik.values['amountOfFuel']||''}
                                fullWidth
                                onChange={formik.handleChange}/>
                        </Grid>
                        <Grid item container direction={'column'} xs={4}>
                            <CeroSelect
                                required
                                id="facility1"
                                name="facility1"
                                label="Facility"
                                fullWidth
                                options={sampleFacility}
                                selectedValue={formik.values['facility1']||''}
                                onChange={formik.handleChange}/>
                            <CeroSelect
                                required
                                id="year1"
                                name="year1"
                                label="Year"
                                fullWidth
                                options={sampleYear}
                                selectedValue={formik.values['year1']||''}
                                onChange={formik.handleChange}/>
                            <CeroSelect
                                required
                                id="customEmissionFilter1"
                                name="customEmissionFilter1"
                                label="Custom Emission Filter"
                                fullWidth
                                options={[{key: "yes", value: "Yes"}, {key: "no", value: "No"}]}
                                selectedValue={formik.values['customEmissionFilter1']||''}
                                onChange={formik.handleChange}/>
                            <CeroSelect
                                required
                                id="fuelType1"
                                name="fuelType1"
                                label="Fuel Type"
                                fullWidth
                                options={sampleFilterType}
                                selectedValue={formik.values['fuelType1']||''}
                                onChange={formik.handleChange}/>
                            <CeroInput
                                required
                                id="amountOfFuel1"
                                name="amountOfFuel1"
                                label="Amount of Fuel"
                                fullWidth
                                value={formik.values['amountOfFuel1']||''}
                                onChange={formik.handleChange}/>
                        </Grid>
                    </Grid>
                    <CeroButton 
                        buttonText="Calculate"
                        className={clsx(classes.button, classes.buttonPrimary)}
                        onClick={onCalculate}/>
                </Box>
                {isCalculateDone && <Box className={classes.bottomContainer}>
                    <Typography variant="subtitle2" component="div" >Emission Preview</Typography>
                    <Grid container direction={'row'} wrap='nowrap' justifyContent={'space-between'}>
                        <Grid item container direction={'column'} xs={4}>
                            <CeroInput
                                required
                                id="co2"
                                label="CO2 : 0 (tonnes)"
                                value="0"
                                fullWidth
                                disabled/>
                            <CeroInput
                                required
                                id="n2o"
                                label="N2O : 0 (tonnes)"
                                value="0"
                                fullWidth
                                disabled/>
                            <CeroInput
                                required
                                id="biofuel"
                                label="Biofuel : 0 tonnes"
                                value="0"
                                fullWidth
                                disabled/>
                        </Grid>
                        <Grid item container direction={'column'} xs={4}>
                            <CeroInput
                                required
                                id="co4"
                                label="CO4 : 0 (tonnes)"
                                value="0"
                                fullWidth
                                disabled/>
                            <CeroInput
                                required
                                id="co2e"
                                label="CO2e : 0 (tonnes)"
                                value="0"
                                fullWidth
                                disabled/>
                            <CeroInput
                                required
                                id="ef"
                                label="EF(kgCO2e/unit)"
                                value="0"
                                fullWidth
                                disabled/>
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton 
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSeconday)}
                    onClick={props.onCancel}/>
                <CeroButton 
                    buttonText="Add Data"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={() => props.onAddEmissionData(formik.values)}/>
            </Box>
        </Container>
    )
}

export default AddEmissionForm;
