import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Stack, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'

import { getUserCompanyDetails, resetAccountStatus, updateCompanyDetails } from '../../../redux/actions'
import { STATUS } from '../../../redux/constants'
import { companySchema } from '../schema'
import CeroInput from '../../../components/CeroInput'
import CeroButton from '../../../components/CeroButton'
import {rolesEnum} from '../../../layouts/DashboardLayout/pages'
import useStyles from './styles'

const AccountSettings = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    
    const companyData = useSelector(state => state.account.companyDetails.data)
    const updateCompanyData = useSelector(state => state.account.updateCompanyDetails)
    const userInfo = useSelector(state => state.auth.userInfo);
    const isAdmin = userInfo.role === rolesEnum.ADMIN

    useEffect(() => {
        dispatch(getUserCompanyDetails())
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
            goal: companyData.goal || '',
        },
        enableReinitialize: true,
        validationSchema: companySchema,
        onSubmit: (values) => {
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
                disabled={!isAdmin}
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
                disabled={!isAdmin}
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
                disabled={!isAdmin}
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
                disabled={!isAdmin}
            />
            <CeroInput
                required
                fullWidth
                id="startYear"
                label="Established Year"
                autoFocus
                value={companyForm.values.startYear}
                onChange={companyForm.startYear}
                onBlur={companyForm.startYear}
                error={companyForm.errors.startYear}
                disabled
            />
            <CeroInput
                required
                fullWidth
                id="goal"
                label="Goal"
                autoFocus
                value={companyForm.values.goal}
                onChange={companyForm.goal}
                onBlur={companyForm.goal}
                error={companyForm.errors.goal}
                disabled
            />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <CeroButton buttonText='SAVE' onClick={handleUpdate} disabled={!companyForm.dirty || !companyForm.isValid || !isAdmin} />
            </Stack>
        </Paper>
    )
}

export default AccountSettings
