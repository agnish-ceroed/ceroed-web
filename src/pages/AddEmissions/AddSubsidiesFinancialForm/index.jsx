import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

import { STATUS } from "../../../redux/constants";
import { schemeValidation } from './schema';
import { addSubsidiesFinancialAssistance, resetAddCombustionStatus } from '../../../redux/actions';
import CeroButton from '../../../components/CeroButton';
import CeroInput from '../../../components/CeroInput';
import CeroEpochDatePicker from '../../../components/CeroDateTimePicker/CeroEpochDatePicker';
import useStyles from "./styles";

const AddSubsidiesFinancialForm = (props) => {
    const { onCancel } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const addEmissionData = useSelector(state => state.emission.addFinancialAssistance)

    const formik = useFormik({
        initialValues: {
            amount: '',
            details: '',
            donor: '',
            date: dayjs().unix(),
        },
        validationSchema: schemeValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        if (addEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Subsidies & Financial Assistance added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (addEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [addEmissionData, dispatch, enqueueSnackbar, onCancel])

    const onAddSubsidiesFinancialContribution = () => {
        const requestData = {
            date: dayjs(formik.values.date * 1000).format("DD/MM/YYYY"),
            amount: formik.values.amount,
            details: formik.values.details,
            donor: formik.values.donor,
            save: true,
        }
        dispatch(addSubsidiesFinancialAssistance(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div" >Add Subsidies & Financial Assistance</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' md={6} xs={12}>
                            <CeroInput
                                required
                                id="amount"
                                name="amount"
                                label="Amount"
                                value={formik.values.amount}
                                type="number"
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.amount && formik.errors.amount}
                            />
                            <CeroInput
                                required
                                id="details"
                                name="details"
                                label="Details"
                                value={formik.values.details}
                                fullWidth
                                multiline
                                rows="3"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.details && formik.errors.details}
                                classes={{ container: classes.textAreaContainer }}
                            />
                        </Grid>
                        <Grid item container direction={'column'} md={6} xs={12}>
                            <CeroEpochDatePicker
                                name="date"
                                value={formik.values.date}
                                label="Date"
                                onChange={formik.setFieldValue}
                                error={formik.touched.date && formik.errors.date}
                            />
                            <CeroInput
                                required
                                id="donor"
                                name="donor"
                                label="Donor"
                                value={formik.values.donor}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.donor && formik.errors.donor}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className={classes.buttonContainer}>
                <CeroButton
                    buttonText="Cancel"
                    variant="outlined"
                    className={clsx(classes.button, classes.buttonSecondary)}
                    onClick={props.onCancel} />
                <CeroButton
                    buttonText="Add Data"
                    disabled={!formik.dirty || !formik.isValid}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onAddSubsidiesFinancialContribution} />
            </Box>
        </Container >
    )
}

export default AddSubsidiesFinancialForm;
