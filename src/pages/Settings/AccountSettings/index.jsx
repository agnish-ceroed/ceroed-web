import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Paper, Stack, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'

import { getAccountDetails, resetAccountStatus, updateAccountDetails } from '../../../redux/actions'
import { STATUS } from '../../../redux/constants'
import { accountSchema } from '../schema'
import CeroInput from '../../../components/CeroInput'
import CeroButton from '../../../components/CeroButton'
import useStyles from './styles'

const AccountSettings = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();

    const accountData = useSelector(state => state.account.accountDetails)
    const updateAccountData = useSelector(state => state.account.updateAccountDetails)

    useEffect(() => {
        dispatch(getAccountDetails())
    }, [dispatch])

    useEffect(() => {
        if (updateAccountData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Account details updated', { variant: 'success' })
            dispatch(resetAccountStatus())
        } else if (updateAccountData.status === STATUS.ERROR) {
            enqueueSnackbar(updateAccountData.message, { variant: 'error' })
            dispatch(resetAccountStatus())
        }
    }, [updateAccountData, dispatch, enqueueSnackbar])

    const accountForm = useFormik({
        initialValues: {
            name: accountData.data.name || '',
            email: accountData.data.email || '',
        },
        enableReinitialize: true,
        validationSchema: accountSchema,
        onSubmit: (values) => {
            console.log(values)
        },
    });

    const handleUpdate = () => {
        dispatch(updateAccountDetails(accountForm.values.name, accountForm.values.email))
    }

    return (
        <Paper className={classes.container}>
            <Typography variant='h6'>Profile settings</Typography>
            <CeroInput
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={accountForm.values.name}
                onChange={accountForm.handleChange}
                onBlur={accountForm.handleBlur}
                error={accountForm.errors.name}
            />
            <CeroInput
                required
                fullWidth
                id="email"
                label="Email address"
                autoFocus
                value={accountForm.values.email}
                onChange={accountForm.handleChange}
                onBlur={accountForm.handleBlur}
                error={accountForm.errors.email}
            />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <CeroButton variant='outlined' buttonText='CHANGE PASSWORD' onClick={() => navigate('/change-password')} />
                <CeroButton buttonText='SAVE' onClick={handleUpdate} disabled={!accountForm.dirty || !accountForm.isValid} />
            </Stack>
        </Paper>
    )
}

export default AccountSettings
