import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from 'notistack';

import CeroInput from "../../components/CeroInput";
import CeroSelect from "../../components/CeroSelect";
import CeroSideSheetDrawer from "../../components/CeroSideSheetDrawer";

import { listAssignee, createTicket, resetTicketStatus } from "../../redux/actions";
import { STATUS } from "../../redux/constants";

import { createTicketValidation, createTicketAuditorValidation } from "./schema";

import useStyles from "./styles";

const CreateTicketDrawer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { ticketData, isOpen, scope, scopeId, companyId } = props;
  const userList = useSelector((state) => state.listings.assigneeList.data);
  const createTicketDetailsStatus = useSelector((state) => state.ticket.createTicketDetails.status);

  const isButtonLoading = createTicketDetailsStatus === STATUS.RUNNING

  const usersOptionList = userList.map((item) => ({
    key: item.id,
    value: item.name,
  }));

  const createTicketForm = useFormik({
    initialValues: {
      title: ticketData ? ticketData.title : "",
      details: ticketData ? ticketData.details : "",
      assignee: ticketData ? ticketData.assignee : "",
    },
    validationSchema: companyId ? createTicketAuditorValidation : createTicketValidation,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const onSubmitTicketData = () => {
    const payload = {
      title: createTicketForm.values.title,
      description: createTicketForm.values.details,
      assigned_to_id: createTicketForm.values.assignee,
      ticket_scope: scope,
      ticket_scope_id: scopeId,
      companyId
    };
    dispatch(createTicket(payload))
  };

  const onClose = useCallback(() => {
    createTicketForm.resetForm();
    props.onClose();
  }, [createTicketForm, props]);

  useEffect(() => {
    if (createTicketDetailsStatus === STATUS.SUCCESS) {
        enqueueSnackbar('Ticket created successfully', { variant: 'success' });
        dispatch(resetTicketStatus())
        onClose();
    } else if (createTicketDetailsStatus === STATUS.ERROR) {
        enqueueSnackbar("Something went wrong", { variant: 'error' });
        dispatch(resetTicketStatus())
    }
}, [createTicketDetailsStatus, enqueueSnackbar, onClose, dispatch])

  useEffect(() => {
    !companyId && dispatch(listAssignee());
  }, [dispatch, companyId]);

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
        <CeroInput
          classes={{container: classes.textAreaContainer}}
          rows={6}
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
        {!companyId && <CeroSelect
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
        />}
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
          primaryBtnTitle: isButtonLoading ? "Saving..." : "Save",
          secondaryBtnTitle: "Cancel",
          primaryBtnAction: onSubmitTicketData,
          secondaryBtnAction: onClose,
          disablePrimaryBtn:
            !createTicketForm.dirty || !createTicketForm.isValid || isButtonLoading, 
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
