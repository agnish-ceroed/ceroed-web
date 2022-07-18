import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

import { STATUS } from "../../../redux/constants";
import { updateUploadValidation } from './schema';
import { resetAddCombustionStatus, deleteEmissions, updateNonEmissionDetails } from '../../../redux/actions';

import CeroButton from '../../../components/CeroButton';
import CeroEpochDatePicker from '../../../components/CeroDateTimePicker/CeroEpochDatePicker';
import CeroInput from '../../../components/CeroInput';
import CeroConfirmDrawer from '../../../components/CeroConfirmDrawer';
import useStyles from "./styles";

const emissionHeadingMap = {
    employees_turnover: 'Employees & Turnover',
    age_based_statistics: 'Age-based statistics',
    gender_based_statistics: 'Gender-based statistics',
    board_diversity: 'Board Diversity',
    management_diversity: 'Management Diversity',
    tax: 'Tax',
}

const EditUploadEmissionForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, emissionType, onCancel } = props;

    const [displayWarning, setDisplayWarning] = useState(false);

    const updateEmissionData = useSelector(state => state.emission.updateNonEmissionDetails)
    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)

    const formik = useFormik({
        initialValues: {
            date: emissionData.date ? dayjs(emissionData.date, "DD/MM/YYYY").valueOf()/1000 : '',
            content: emissionData.content || '',
        },
        validationSchema: updateUploadValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        if (updateEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar(`${emissionHeadingMap[props.emissionType]} updated successfully`, { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (updateEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
        }
    }, [updateEmissionData, enqueueSnackbar, onCancel, dispatch])

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar(`${emissionHeadingMap[props.emissionType]} deleted successfully`, { variant: 'success' });
            dispatch(resetAddCombustionStatus());
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onUpdateDetails = () => {
        const requestData = {
            id: emissionId,
            emissionType: emissionType,
            date: dayjs(formik.values.date * 1000).format("DD/MM/YYYY"),
            content: formik.values.content,
            save: true,
        }
        dispatch(updateNonEmissionDetails(requestData))
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
                <Typography className={classes.title} variant="h6" component="div" >Edit Water Distribution</Typography>
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
                {props.isDeleteEnable && <CeroButton
                    buttonText={<DeleteOutlineIcon />}
                    className={clsx(classes.button, classes.deleteButton)}
                    onClick={() => setDisplayWarning(true)} />}
                <CeroButton
                    buttonText="Update"
                    disabled={!formik.dirty || !formik.isValid}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onUpdateDetails} />
            </Box>
            {displayWarning && <CeroConfirmDrawer
                isOpen={displayWarning}
                onClose={() => setDisplayWarning(false)}
                onConfirm={onConfirmDelete}
            />}
        </Container>
    )
}

export default EditUploadEmissionForm;
