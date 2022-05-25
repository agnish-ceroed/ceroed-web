
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box } from "@mui/material";
import { useFormik } from "formik";

import CeroInput from "../../components/CeroInput";
import CeroSelect from "../../components/CeroSelect";
import CeroSideSheetDrawer from "../../components/CeroSideSheetDrawer";
import CeroTextArea from "../../components/CeroTextArea/input";

import { listAssignee } from '../../redux/actions';

import { createTicketValidation } from "./schema";

import useStyles from "./styles";

const CreateTicketDrawer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const { ticketData, isOpen } = props;
  const userList = useSelector(state => state.listings.assigneeList.data)

  const usersOptionList = userList.map(item => ({ key: item.id, value: item.name }))

  const createTicketForm = useFormik({
    initialValues: {
      title: ticketData ? ticketData.title : "",
      details: ticketData ? ticketData.details : "",
      assignee: ticketData ? ticketData.assignee : '',
    },
    validationSchema: createTicketValidation,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const onSubmitTicketData = () => {
    console.log(createTicketForm.values.title, createTicketForm.values.details);
  };

  const onClose = () => {
    createTicketForm.resetForm();
    props.onClose();
  };

  useEffect(() => {
    dispatch(listAssignee())
}, [dispatch])

  const getPrimaryPaymentDrawer = () => {
    return (
      <Box className={classes.mainContainer}>
        <CeroInput
          required
          id="title"
          name="title"
          label="Ticket Title"
          fullWidth
          value={createTicketForm.values.title}
          onChange={createTicketForm.handleChange}
          onBlur={createTicketForm.handleBlur}
          error={createTicketForm.errors.title}
        />
        <CeroTextArea
          minRows={6}
          placeholder={"Please enter ticket details"}
          required
          id="details"
          name="details"
          label="Ticket Details"
          value={createTicketForm.values.details}
          onChange={createTicketForm.handleChange}
          onBlur={createTicketForm.handleBlur}
          error={createTicketForm.errors.details}
          multiline
        />
        <CeroSelect
          required
          id="assignee"
          name="assignee"
          label="Assignee"
          fullWidth
          options={usersOptionList}
          selectedValue={createTicketForm.values.assignee}
          onChange={createTicketForm.handleChange}
          onBlur={createTicketForm.handleBlur}
          error={createTicketForm.errors.assignee}
        />
      </Box>
    );
  };

  return (
    <CeroSideSheetDrawer
      primaryDrawer={{
        drawerOpen: isOpen,
        onClose: onClose,
        content: getPrimaryPaymentDrawer(),
        header: { title: "Raise a ticket" },
        footer: {
          primaryBtnTitle: "Save",
          secondaryBtnTitle: "Cancel",
          primaryBtnAction: onSubmitTicketData,
          secondaryBtnAction: onClose,
          disablePrimaryBtn:
            !createTicketForm.dirty || !createTicketForm.isValid,
        },
        classes: {
          drawerContainer: classes.drawerContainer,
          contentArea: classes.drawerContentArea,
        },
      }}
    />
  );
};

export default CreateTicketDrawer;
