import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { userSchema } from "./schema";
import { STATUS } from "../../../redux/constants";
import {
  addUser,
  editUser,
  getUserDetails,
  listUsers,
  resetUserStatus,
  getManagerList,
} from "../../../redux/actions";

import CeroInput from "../../../components/CeroInput";
import CeroSelect from "../../../components/CeroSelect";
import CeroSideSheetDrawer from "../../../components/CeroSideSheetDrawer";
import { userRoles } from "../../../constants";
import useStyles from "./styles";

const AddUserDrawer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addUserStatus = useSelector((state) => state.users.addUser);
  const userData = useSelector((state) => state.users.userDetails.data);
  const editUserStatus = useSelector((state) => state.users.editUser);
  const facilitiesData = useSelector(
    (state) => state.listings.listFacilities.data
  );

  const listManager = useSelector((state) => state.listings.listManager.data);

  const managerList = listManager.map((item) => ({
    key: item.id,
    value: item.name,
  }));

  const facilitiesList = facilitiesData.map((item) => ({
    key: item.id,
    value: item.name,
  }));

  const userForm = useFormik({
    initialValues: {
      email: userData.email || "",
      role: userData.role || "",
      manager: userData.manager_id || "",
    },
    validationSchema: userSchema,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    if (props.editUser) {
      dispatch(getUserDetails(props.editUser));
    }
    return () => dispatch(resetUserStatus());
  }, [props.editUser, dispatch]);

  useEffect(() => {
    userForm.values.role &&
      dispatch(
        getManagerList(
          userForm.values.role,
          userForm.values.role === "facilitator"
            ? userForm.values.facility
            : null
        )
      );
  }, [dispatch, userForm.values.role, userForm.values.facility]);

  useEffect(() => {
    if (addUserStatus.status === STATUS.SUCCESS) {
      enqueueSnackbar("User added successfully", { variant: "success" });
      props.onClose(false);
      dispatch(resetUserStatus());
      dispatch(listUsers());
    } else if (addUserStatus.status === STATUS.ERROR) {
      enqueueSnackbar(addUserStatus.message.message, { variant: "error" });
    }
  }, [addUserStatus, enqueueSnackbar, dispatch, props.onClose]);

  useEffect(() => {
    if (editUserStatus.status === STATUS.SUCCESS) {
      enqueueSnackbar("User edited successfully", { variant: "success" });
      props.onClose(false);
      dispatch(resetUserStatus());
      dispatch(listUsers());
    } else if (editUserStatus.status === STATUS.ERROR) {
      enqueueSnackbar(editUserStatus.message, { variant: "error" });
    }
  }, [editUserStatus, enqueueSnackbar, props.onClose, dispatch]);

  const onSubmitUserData = () => {
    if (props.editUser) {
      dispatch(
        editUser(
          props.editUser,
          userForm.values.email,
          userForm.values.role,
          userForm.values.facility,
          userForm.values.manager
        )
      );
    } else {
      dispatch(
        addUser(
          userForm.values.email,
          userForm.values.role,
          userForm.values.facility,
          userForm.values.manager
        )
      );
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
          options={userRoles}
          selectedValue={userForm.values.role}
          onChange={userForm.handleChange}
          onBlur={userForm.handleBlur}
          error={userForm.errors.role}
        />
        {userForm.values.role === "facilitator" && (
          <CeroSelect
            required
            id="facility"
            name="facility"
            label="Facility"
            fullWidth
            options={facilitiesList}
            selectedValue={userForm.values.facility}
            onChange={userForm.handleChange}
            onBlur={userForm.handleBlur}
            error={userForm.errors.facility}
          />
        )}
        <CeroSelect
          id="manager"
          name="manager"
          label="Manager"
          fullWidth
          options={managerList}
          selectedValue={userForm.values.manager}
          onChange={userForm.handleChange}
          onBlur={userForm.handleBlur}
        />
      </Box>
    );
  };

  return (
    <CeroSideSheetDrawer
      primaryDrawer={{
        drawerOpen: props.isOpen,
        onClose: () => props.onClose(false),
        content: getPrimaryPaymentDrawer(),
        header: { title: "Add Users" },
        footer: {
          primaryBtnTitle: "Save",
          secondaryBtnTitle: "Cancel",
          primaryBtnAction: onSubmitUserData,
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
};

export default AddUserDrawer;
