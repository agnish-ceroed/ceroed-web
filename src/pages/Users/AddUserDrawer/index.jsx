import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { userSchema } from './schema';
import { STATUS } from '../../../redux/constants';
import { addUser, editUser, getUserDetails, listUsers, resetUserStatus } from '../../../redux/actions';

import CeroInput from '../../../components/CeroInput';
import CeroSelect from '../../../components/CeroSelect';
import CeroSideSheetDrawer from '../../../components/CeroSideSheetDrawer';
import useStyles from "./styles";

const AddUserDrawer = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const addUserStatus = useSelector(state => state.users.addUser)
    const userData = useSelector(state => state.users.userDetails.data)
    const editUserStatus = useSelector(state => state.users.editUser)

    const userForm = useFormik({
        initialValues: {
            email: userData.email || '',
            role: userData.role || '',
        },
        validationSchema: userSchema,
        enableReinitialize: true,
        onSubmit: () => { },
    });

    useEffect(() => {
        if (props.editUser) {
            dispatch(getUserDetails(props.editUser))
        }
        return () => dispatch(resetUserStatus())
    }, [props.editUser, dispatch])

    useEffect(() => {
        if (addUserStatus.status === STATUS.SUCCESS) {
            enqueueSnackbar('User added successfully', { variant: 'success' });
            props.onClose(false)
            dispatch(resetUserStatus())
            dispatch(listUsers())
        } else if (addUserStatus.status === STATUS.ERROR) {
            enqueueSnackbar(addUserStatus.message.message, { variant: 'error' });
        }
    }, [addUserStatus, enqueueSnackbar, dispatch, props.onClose])

    useEffect(() => {
        if (editUserStatus.status === STATUS.SUCCESS) {
            enqueueSnackbar('User edited successfully', { variant: 'success' });
            props.onClose(false)
            dispatch(resetUserStatus())
            dispatch(listUsers())
        } else if (editUserStatus.status === STATUS.ERROR) {
            enqueueSnackbar(editUserStatus.message, { variant: 'error' });
        }
    }, [editUserStatus, enqueueSnackbar, props.onClose, dispatch])

    const onSubmitFacilityData = () => {
        if (props.editUser) {
            dispatch(editUser(props.editUser, userForm.values.email, userForm.values.role))
        } else {
            dispatch(addUser(userForm.values.email, userForm.values.role))
        }
    };

    const getPrimaryPaymentDrawer = () => {
        return (
            <Box className={classes.mainContainer}>
                <CeroInput
                    required
                    id="email"
                    name="email"
                    label="Email address"
                    fullWidth
                    value={userForm.values.email}
                    onChange={userForm.handleChange}
                    onBlur={userForm.handleBlur}
                    error={userForm.errors.email}
                    disabled={props.editUser}
                />
                <CeroSelect
                    required
                    id="role"
                    name="role"
                    label="Role"
                    fullWidth
                    options={[{ key: 'admin', value: 'Admin' }]}
                    selectedValue={userForm.values.role}
                    onChange={userForm.handleChange}
                    onBlur={userForm.handleBlur}
                    error={userForm.errors.role}
                />
            </Box>
        )
    };

    return (
        <CeroSideSheetDrawer
            primaryDrawer={{
                drawerOpen: props.isOpen,
                onClose: () => props.onClose(false),
                content: getPrimaryPaymentDrawer(),
                header: { title: "Add Facility" },
                footer: {
                    primaryBtnTitle: 'Save',
                    secondaryBtnTitle: 'Cancel',
                    primaryBtnAction: onSubmitFacilityData,
                    secondaryBtnAction: () => props.onClose(false),
                    disablePrimaryBtn: !userForm.dirty || !userForm.isValid,
                },
                classes: {
                    drawerContainer: classes.drawerContainer,
                    contentArea: classes.drawerContentArea,
                },
            }}
        />
    );
}

export default AddUserDrawer;
