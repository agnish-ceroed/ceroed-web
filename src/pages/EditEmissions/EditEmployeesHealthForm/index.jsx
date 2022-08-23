import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

import { STATUS } from "../../../redux/constants";
import { schemeValidation } from './schema';
import { resetAddCombustionStatus, deleteEmissions, updateWaterDischargeCombustion } from '../../../redux/actions';

import CeroEpochDatePicker from '../../../components/CeroDateTimePicker/CeroEpochDatePicker';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import CeroConfirmDrawer from '../../../components/CeroConfirmDrawer';
import useStyles from "./styles";

const EditEmployeesHealthForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { emissionId, emissionData, facilitiesData, onCancel } = props;

    const [displayWarning, setDisplayWarning] = useState(false);

    const updateEmissionData = useSelector(state => state.emission.updateWaterDischargeCombustion)
    const deleteEmissionData = useSelector(state => state.emission.deleteEmissions)

    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));
   
    const formik = useFormik({
        initialValues: {
            facility: emissionData.facility_id || '',
            date: emissionData.date ? dayjs(emissionData.date, "DD/MM/YYYY").valueOf()/1000 : '',
            affected: emissionData.affected || '',
            details: emissionData.details || '',
            department: emissionData.details || '',
            correctiveAction: emissionData.corrective_action || '',
        },
        validationSchema: schemeValidation,
        onSubmit: () => { },
    });

    useEffect(() => {
        if (updateEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Employees Health and Safety incident updated successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (updateEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar(updateEmissionData.message.message || "Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [updateEmissionData, enqueueSnackbar, onCancel, dispatch])

    useEffect(() => {
        if (deleteEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Employees Health and Safety incident deleted successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (deleteEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar(deleteEmissionData.message.message || "Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch])

    const onUpdateWaterDischargeCombustion = () => {
        const requestData = {
            id: emissionId,
            facility_id: formik.values.facility,
            date: dayjs(formik.values.date * 1000).format("DD/MM/YYYY"),
            affected: formik.values.affected,
            details: formik.values.details,
            corrective_action: formik.values.correctiveAction,
            department: formik.values.department,
            save: true
        }
        dispatch(updateWaterDischargeCombustion(requestData))
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
                <Typography className={classes.title} variant="h6" component="div" >Edit Employees Health and Safety incident</Typography>
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
                            <CeroInput
                                required
                                id="affected"
                                name="affected"
                                label="Number of Affected"
                                value={formik.values.affected}
                                type="number"
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.affected && formik.errors.affected}
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
                            <CeroInput
                                required
                                id="department"
                                name="department"
                                label="Department"
                                value={formik.values.department}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.department && formik.errors.department}
                            />
                            <CeroEpochDatePicker
                                name="date"
                                value={formik.values.date}
                                label="Date"
                                onChange={formik.setFieldValue}
                                error={formik.touched.date && formik.errors.date}
                            />
                            <CeroInput
                                required
                                id="correctiveAction"
                                name="correctiveAction"
                                label="Corrective Action"
                                value={formik.values.correctiveAction}
                                fullWidth
                                multiline
                                rows="3"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.correctiveAction && formik.errors.correctiveAction}
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
                    onClick={onUpdateWaterDischargeCombustion} />
            </Box>
            {displayWarning && <CeroConfirmDrawer
                isOpen={displayWarning}
                onClose={() => setDisplayWarning(false)}
                onConfirm={onConfirmDelete}
            />}
        </Container>
    )
}

export default EditEmployeesHealthForm;
