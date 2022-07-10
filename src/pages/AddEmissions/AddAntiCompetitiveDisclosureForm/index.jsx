import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

import { STATUS } from "../../../redux/constants";
import { schemeValidation } from './schema';
import { addAntiCompetitiveDisclosure, resetAddCombustionStatus } from '../../../redux/actions';
import CeroButton from '../../../components/CeroButton';
import CeroSelect from '../../../components/CeroSelect';
import CeroInput from '../../../components/CeroInput';
import CeroEpochDatePicker from '../../../components/CeroDateTimePicker/CeroEpochDatePicker';
import useStyles from "./styles";

const AddAntiCompetitiveDisclosureForm = (props) => {
    const { onCancel } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const addEmissionData = useSelector(state => state.emission.addCompetitiveDisclosure)

    const formik = useFormik({
        initialValues: {
            facility: '',
            recipient: '',
            correctiveAction: '',
            details: '',
            date: dayjs().unix(),
        },
        validationSchema: schemeValidation,
        onSubmit: () => { },
    });

    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));

    useEffect(() => {
        if (addEmissionData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Anti competitive Disclosure added successfully', { variant: 'success' });
            dispatch(resetAddCombustionStatus())
            onCancel();
        } else if (addEmissionData.status === STATUS.ERROR) {
            enqueueSnackbar("Something went wrong", { variant: 'error' });
            dispatch(resetAddCombustionStatus())
        }
    }, [addEmissionData, dispatch, enqueueSnackbar, onCancel])

    const onAddAntiCompetitiveDisclosure = () => {
        const requestData = {
            facility_id: formik.values.facility,
            date: dayjs(formik.values.date * 1000).format("DD/MM/YYYY"),
            details: formik.values.details,
            corrective_action: formik.values.correctiveAction,
            affected_party: formik.values.recipient,
            save: true,
        }
        dispatch(addAntiCompetitiveDisclosure(requestData))
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.innerContainer}>
                <Typography className={classes.title} variant="h6" component="div" >Add Anti-competitive Disclosure</Typography>
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
                            <CeroEpochDatePicker
                                name="date"
                                value={formik.values.date}
                                label="Date"
                                onChange={formik.setFieldValue}
                                error={formik.touched.date && formik.errors.date}
                            />
                        </Grid>
                        <Grid item container direction={'column'} md={6} xs={12}>
                            <CeroInput
                                required
                                id="recipient"
                                name="recipient"
                                label="Affected Party"
                                value={formik.values.recipient}
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.recipient && formik.errors.recipient}
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
                <CeroButton
                    buttonText="Add Data"
                    disabled={!formik.dirty || !formik.isValid}
                    className={clsx(classes.button, classes.buttonPrimary)}
                    onClick={onAddAntiCompetitiveDisclosure} />
            </Box>
        </Container >
    )
}

export default AddAntiCompetitiveDisclosureForm;
