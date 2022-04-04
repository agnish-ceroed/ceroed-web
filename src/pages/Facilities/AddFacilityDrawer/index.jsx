import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { addFacilityValidation } from './schema';
import { STATUS } from '../../../redux/constants';
import { addFacility, editFacility, getCountryList, getFacility, listFacilities, listGridRegions, resetAddFacilityStatus } from '../../../redux/actions';
import CeroInput from '../../../components/CeroInput';
import CeroSelect from '../../../components/CeroSelect';
import CeroSideSheetDrawer from '../../../components/CeroSideSheetDrawer';
import useStyles from "./styles";
import CeroAutoComplete from '../../../components/CeroAutoComplete';
import CeroPhoneInput from '../../../components/CeroPhoneInput';

const AddFacilityDrawer = (props) => {
    const { editItem, onClose } = props
    const classes = useStyles();
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const countryListData = useSelector(state => state.listings.countryList.data)
    const addFacilityStatus = useSelector(state => state.facility.addFacility)
    const facilityData = useSelector(state => state.facility.facilityDetails.data)
    const editFacilityStatus = useSelector(state => state.facility.editFacility)
    const gridRegions = useSelector(state => state.listings.gridRegions.data)

    const countryList = countryListData.map(item => ({ id: item.code, label: item.name }));
    const gridRegionList = gridRegions.map(item => ({ key: item.name, value: item.name }))

    const facilityForm = useFormik({
        initialValues: {
            name: facilityData.name || '',
            phone: facilityData.phone || '',
            country: facilityData.country || '',
            gridRegion: facilityData.grid_region || ''
        },
        validationSchema: addFacilityValidation,
        enableReinitialize: true,
        onSubmit: () => { },
    });

    useEffect(() => {
        if (facilityForm.values.country) {
            dispatch(listGridRegions(facilityForm.values.country))
        }
    }, [facilityForm.values.country, dispatch])

    useEffect(() => {
        if (editItem) {
            dispatch(getFacility(editItem))
        }
        return () => {
            dispatch(resetAddFacilityStatus())
        }
    }, [editItem, dispatch])

    useEffect(() => {
        dispatch(getCountryList())
    }, [dispatch])

    useEffect(() => {
        if (addFacilityStatus.status === STATUS.SUCCESS) {
            enqueueSnackbar('Facility added successfully', { variant: 'success' });
            dispatch(resetAddFacilityStatus())
            onClose(false)
            dispatch(listFacilities())
        } else if (addFacilityStatus.status === STATUS.ERROR) {
            enqueueSnackbar(addFacilityStatus.message, { variant: 'error' });
        }
    }, [addFacilityStatus, enqueueSnackbar, dispatch, onClose])


    useEffect(() => {
        if (editFacilityStatus.status === STATUS.SUCCESS) {
            enqueueSnackbar('Facility edited successfully', { variant: 'success' });
            dispatch(resetAddFacilityStatus())
            onClose(false)
            dispatch(listFacilities())
        } else if (editFacilityStatus.status === STATUS.ERROR) {
            enqueueSnackbar(editFacilityStatus.message, { variant: 'error' });
        }
    }, [editFacilityStatus, enqueueSnackbar, onClose, dispatch])

    const onSubmitFacilityData = () => {
        if (props.editItem) {
            dispatch(editFacility(props.editItem, facilityForm.values.name, facilityForm.values.phone, facilityForm.values.country, facilityForm.values.gridRegion))
        } else {
            dispatch(addFacility(facilityForm.values.name, facilityForm.values.phone, facilityForm.values.country, facilityForm.values.gridRegion))
        }
    };

    const getPrimaryPaymentDrawer = () => {
        return (
            <Box className={classes.mainContainer}>
                <CeroInput
                    required
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    value={facilityForm.values.name}
                    onChange={facilityForm.handleChange}
                    onBlur={facilityForm.handleBlur}
                    error={facilityForm.errors.name}
                />
                <CeroPhoneInput
                    required
                    id="phone"
                    name="phone"
                    label="Phone"
                    fullWidth
                    value={facilityForm.values.phone}
                    onChange={(value) => facilityForm.setFieldValue("phone", value)}
                    onBlur={facilityForm.handleBlur}
                    error={facilityForm.errors.phone}
                />
                <CeroAutoComplete
                    id="country"
                    label="Country"
                    onChange={(e, value) => facilityForm.setFieldValue('country', value.id)}
                    onBlur={facilityForm.handleBlur}
                    error={facilityForm.errors.country}
                    options={countryList}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                />
                <CeroSelect
                    required
                    id="gridRegion"
                    name="gridRegion"
                    label="Grid region"
                    fullWidth
                    options={gridRegionList}
                    selectedValue={facilityForm.values.gridRegion}
                    onChange={facilityForm.handleChange}
                    onBlur={facilityForm.handleBlur}
                    error={facilityForm.errors.gridRegion}
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
                    disablePrimaryBtn: !facilityForm.dirty || !facilityForm.isValid,
                },
                classes: {
                    drawerContainer: classes.drawerContainer,
                    contentArea: classes.drawerContentArea,
                },
            }}
        />
    );
}

export default AddFacilityDrawer;
