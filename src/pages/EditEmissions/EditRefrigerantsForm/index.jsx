import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSnackbar } from 'notistack';

import { STATUS } from "../../../redux/constants";
import { sampleYear, months } from "../../../constants";
import { editRefrigerantsValidation } from './schema';
import { updateRefrigerants, resetAddCombustionStatus, deleteEmissions } from '../../../redux/actions';

import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import CeroInfoPair from '../../../components/CeroInfoPair';
import CeroConfirmDrawer from '../../../components/CeroConfirmDrawer';
import useStyles from "./styles";

const EditRefrigerantsForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, facilitiesData, emissionInputs, onCancel } = props

    const [isFiltered, setIsFiltered] = useState(false);
    const [typesOfEmissionFactors, setTypesOfEmissionFactors] = useState([]);
    const [displayWarning, setDisplayWarning] = useState(false);

    const isCalculateDone = useSelector(state => state.emission.updateRefrigerants.isCalculateDone)
    const updateEmissionData = useSelector(state => state.emission.updateRefrigerants);
    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)

    const facilitiesList = facilitiesData.map(item => ({ key: item?.id, value: item?.name }));
    const gasType = (emissionInputs.gas_types || []).map(item => ({ key: item?.code, value: item?.name, id: item?.id }));
    const units = (emissionInputs.units || []).map(item => ({ key: item?.name, value: item?.name }));
    const yearList = sampleYear.map(item => ({ id: item.key, label: item.value }));

    const formik = useFormik({
        initialValues: {
            facility: emissionData.facility_id || '',
            year: emissionData.year || '',
            month: emissionData.month || '',
            gasType: gasType.find(type => type.id === emissionData.gas_type_id)?.key || '',
            refrigerant: emissionData.refrigerant_id || '',
            unit: emissionData.unit || '',
            amountOfFuel: emissionData.amount || '',
        },
        validationSchema: editRefrigerantsValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        const selectedTypesOfEmissionFactors = (emissionInputs.refrigerants || [])
            .filter(item => item.gas_type_code === formik.values.gasType)
            .map(item => ({ key: item?.id, value: item?.name }));
        setTypesOfEmissionFactors(selectedTypesOfEmissionFactors)
        !!selectedTypesOfEmissionFactors && setTimeout(() => setIsFiltered(true), 200)
    }, [formik.values.gasType, emissionInputs.refrigerants])

    useEffect(() => {
        if (updateEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Refrigerant added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel('refrigerants');
        } else if (updateEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar(updateEmissionData.message.message || "Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [updateEmissionData, enqueueSnackbar, dispatch, onCancel])

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Refrigerants deleted successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar(deleteEmissionData.message.message || "Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onCalculate = () => {
        const requestData = {
            id: emissionId,
            facility_id: formik.values.facility,
            gas_type_id: gasType.find(item => item.key === formik.values.gasType)?.id,
            year: formik.values.year,
            month: formik.values.month,
            refrigerant_id: formik.values.refrigerant,
            unit: formik.values.unit + '',
            amount: parseFloat(formik.values.amountOfFuel),
            save: false
        }
        dispatch(updateRefrigerants(requestData))
    };

    const onEditRefrigerants = () => {
        const requestData = {
            id: emissionId,
            facility_id: formik.values.facility,
            gas_type_id: gasType.find(item => item.key === formik.values.gasType)?.id,
            year: formik.values.year,
            month: formik.values.month,
            refrigerant_id: formik.values.refrigerant,
            unit: formik.values.unit + '',
            amount: parseFloat(formik.values.amountOfFuel),
            save: true
        }
        dispatch(updateRefrigerants(requestData))
    };

    const onConfirmDelete = () => {
        const requestData = {
            id: emissionId
        }
        dispatch(deleteEmissions(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div" >Edit Refrigerant</Typography>
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
                            {isFiltered && <CeroSelect
                                required
                                id="refrigerant"
                                key="refrigerant"
                                name="refrigerant"
                                label="Refrigerant"
                                fullWidth
                                options={typesOfEmissionFactors}
                                selectedValue={formik.values.refrigerant || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.refrigerant && formik.errors.refrigerant}
                                disabled={!formik.values.gasType}
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
                                label="Amount of Refrigerant"
                                value={formik.values.amountOfFuel || ''}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.amountOfFuel && formik.errors.amountOfFuel}
                            />
                        </Grid>
                        <Grid item container direction={'column'} md={6} xs={12}>
                            <CeroSelect
                                required
                                id="gasType"
                                name="gasType"
                                label="Gas Type"
                                fullWidth
                                options={gasType}
                                selectedValue={formik.values.gasType || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.gasType && formik.errors.gasType}
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
                    <Typography variant="h6" component="h6" className={classes.previewTitle}>Emission Preview</Typography>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' xs={12} md={6}>
                            <CeroInfoPair title={<>CO<sub>2</sub>e</>} value={`${updateEmissionData.data.co2e} tonnes`} />
                        </Grid>
                    </Grid>
                </Box>}
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSecondary)}
                    onClick={props.onCancel} />
                {props.isDeleteEnable && <CeroButton
                    buttonText={<DeleteOutlineIcon />}
                    className={clsx(classes.button, classes.deleteButton)}
                    onClick={() => setDisplayWarning(true)} />}
                <CeroButton
                    buttonText="Update"
                    disabled={!isCalculateDone}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onEditRefrigerants}
                />
            </Box>
            {displayWarning && <CeroConfirmDrawer
                isOpen={displayWarning}
                onClose={() => setDisplayWarning(false)}
                onConfirm={onConfirmDelete}
            />}
        </Container>
    )
}

export default EditRefrigerantsForm;
