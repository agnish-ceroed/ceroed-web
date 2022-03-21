import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Paper, Stack, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'

import { getCompanyDetails, resetAccountStatus, updateCompanyDetails } from '../../../redux/actions'
import { STATUS } from '../../../redux/constants'
import { companySchema } from '../schema'
import CeroInput from '../../../components/CeroInput'
import CeroButton from '../../../components/CeroButton'
import useStyles from './styles'

const AccountSettings = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();

    const companyData = useSelector(state => state.account.companyDetails.data)
    const updateCompanyData = useSelector(state => state.account.updateCompanyDetails)

    useEffect(() => {
        dispatch(getCompanyDetails())
    }, [dispatch])

    useEffect(() => {
        if (updateCompanyData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Account details updated', { variant: 'success' })
            dispatch(resetAccountStatus())
        } else if (updateCompanyData.status === STATUS.ERROR) {
            enqueueSnackbar(updateCompanyData.message, { variant: 'error' })
            dispatch(resetAccountStatus())
        }
    }, [updateCompanyData, dispatch, enqueueSnackbar])

    const companyForm = useFormik({
        initialValues: {
            name: companyData.name || '',
            email: companyData.email || '',
            phone: companyData.phone || '',
            website: companyData.website || '',
            startYear: companyData.estd_year || '',
            goal: companyData.estd_year || '',
        },
        enableReinitialize: true,
        validationSchema: companySchema,
        onSubmit: (values) => {
            console.log(values)
        },
    });

    const handleUpdate = () => {
        dispatch(
          updateCompanyDetails(
            companyForm.values.name,
            companyForm.values.email,
            companyForm.values.phone,
            companyForm.values.website
          )
        );
    }

    return (
        <Paper className={classes.container}>
            <Typography variant='h6'>Company settings</Typography>
            <CeroInput
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={companyForm.values.name}
                onChange={companyForm.handleChange}
                onBlur={companyForm.handleBlur}
                error={companyForm.errors.name}
            />
            <CeroInput
                required
                fullWidth
                id="email"
                label="Email address"
                autoFocus
                value={companyForm.values.email}
                onChange={companyForm.handleChange}
                onBlur={companyForm.handleBlur}
                error={companyForm.errors.email}
            />
            <CeroInput
                required
                fullWidth
                id="phone"
                label="Phone Number"
                autoFocus
                value={companyForm.values.phone}
                onChange={companyForm.handleChange}
                onBlur={companyForm.handleBlur}
                error={companyForm.errors.phone}
            />
            <CeroInput
                required
                fullWidth
                id="website"
                label="Website"
                autoFocus
                value={companyForm.values.website}
                onChange={companyForm.handleChange}
                onBlur={companyForm.handleBlur}
                error={companyForm.errors.website}
            />
            <CeroInput
                required
                fullWidth
                id="startYear"
                label="Established Year"
                autoFocus
                value={companyForm.values.startYear}
                disabled
            />
            <CeroInput
                required
                fullWidth
                id="goal"
                label="Goal"
                autoFocus
                value={companyForm.values.goal}
                disabled
            />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <CeroButton variant='outlined' buttonText='CHANGE PASSWORD' onClick={() => navigate('/change-password')} />
                <CeroButton buttonText='SAVE' onClick={handleUpdate} disabled={!companyForm.dirty || !companyForm.isValid} />
            </Stack>
        </Paper>
    )
}

export default AccountSettings
