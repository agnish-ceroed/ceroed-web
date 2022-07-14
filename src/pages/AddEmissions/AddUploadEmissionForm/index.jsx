import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

import { STATUS } from "../../../redux/constants";
import { schemeValidation } from './schema';
import { addUploadFileEmission, resetAddCombustionStatus } from '../../../redux/actions';
import CeroButton from '../../../components/CeroButton';
import CeroInput from '../../../components/CeroInput';
import CeroEpochDatePicker from '../../../components/CeroDateTimePicker/CeroEpochDatePicker';
import useStyles from "./styles";

const emissionHeadingMap = {
    employees_turnover: 'Employees & Turnover',
    age_based_statistics: 'Age-based statistics',
    gender_based_statistics: 'Gender-based statistics',
    board_diversity: 'Board Diversity',
    management_diversity: 'Management Diversity',
    tax: 'Tax',
}

const AddUploadEmissionForm = (props) => {
    const { onCancel } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const addEmissionData = useSelector(state => state.emission.addUploadFileEmission)

    const formik = useFormik({
        initialValues: {
            content: '',
            date: dayjs().unix(),
        },
        validationSchema: schemeValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        if (addEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar(`${emissionHeadingMap[props.emissionType]} added successfully`, { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (addEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [addEmissionData, dispatch, enqueueSnackbar, onCancel])

    const onAddUploadFileEmission = () => {
        const requestData = {
            emissionType: props.emissionType,
            date: dayjs(formik.values.date * 1000).format("DD/MM/YYYY"),
            content: formik.values.content,
            save: true,
        }
        dispatch(addUploadFileEmission(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div" >{`Add ${emissionHeadingMap[props.emissionType]}`}</Typography>
                <Box className={classes.topContainer}>
                    <Grid container direction='row' wrap='nowrap' justifyContent='space-between' spacing={8}>
                        <Grid item container direction='column' md={6} xs={12}>
                            <CeroInput
                                required
                                id="content"
                                name="content"
                                label="Content"
                                value={formik.values.content}
                                fullWidth
                                multiline
                                rows="3"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.content && formik.errors.content}
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
                    onClick={onAddUploadFileEmission} />
            </Box>
        </Container >
    )
}

export default AddUploadEmissionForm;
