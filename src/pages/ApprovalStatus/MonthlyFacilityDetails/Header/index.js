import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { sampleYear, months } from "../../../../constants";
import CeroDropdown from "../../../../components/CeroDropdown";
import CeroButton from "../../../../components/CeroButton";
import { submitApproval, resetApprovalData, requestApproval, approveRequest } from "../../../../redux/actions";
import { STATUS } from "../../../../redux/constants";

import useStyles from "./styles";
import CreateTicketDrawer from "../../../CreateTicketDrawer";

const Header = ({
  onApplyFilter,
  selectedYear,
  selectedMonth,
  facilitiesList,
  selectedFacility,
  actions,
  statusId,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const submitApprovalStatus = useSelector(
    (state) => state.approval.submitApproval.status
  );

  const requestApprovalStatus = useSelector(
    (state) => state.approval.requestApproval.status
  );

  const approveRequestStatus = useSelector(
    (state) => state.approval.approveRequest.status
  );

  const [filterYear, setYear] = useState(selectedYear);
  const [filterMonth, setMonth] = useState(selectedMonth);
  const [facility, setFacility] = useState(selectedFacility);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const isSubmitLoading = submitApprovalStatus === STATUS.RUNNING;
  const isRequestApprovalLoading = requestApprovalStatus === STATUS.RUNNING;
  const isApproveRequestLoading = approveRequestStatus === STATUS.RUNNING;

  const onSubmitApproval = () => {
    dispatch(
      submitApproval(
        statusId,
        actions.next_assignee_id,
      )
    );
  };

  const onRequestApproval = () => {
    dispatch(
      requestApproval(
        statusId,
        actions.next_assignee_id,
      )
    );
  };

  const onApprovingRequest = () => {
    dispatch(
      approveRequest(
        statusId,
        'Approved',
      )
    );
  };

  useEffect(() => {
    if (submitApprovalStatus === STATUS.SUCCESS) {
      dispatch(resetApprovalData());
      enqueueSnackbar("Successfully submitted for approval", {
        variant: "success",
      });
    } else if (submitApprovalStatus === STATUS.ERROR) {
      dispatch(resetApprovalData());
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }, [submitApprovalStatus, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (requestApprovalStatus === STATUS.SUCCESS) {
      dispatch(resetApprovalData());
      enqueueSnackbar("Successfully requested for approval", {
        variant: "success",
      });
    } else if (requestApprovalStatus === STATUS.ERROR) {
      dispatch(resetApprovalData());
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }, [requestApprovalStatus, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (approveRequestStatus === STATUS.SUCCESS) {
      dispatch(resetApprovalData());
      enqueueSnackbar("Successfully requested for approval", {
        variant: "success",
      });
    } else if (approveRequestStatus === STATUS.ERROR) {
      dispatch(resetApprovalData());
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }, [approveRequestStatus, dispatch, enqueueSnackbar]);

  return (
    <Container className={classes.headerContainer}>
      <Typography variant="h7" component="span">
        Monthly aggregate
      </Typography>
      <Grid
        className={classes.filterContainer}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Box className={classes.yearContainer}>
          <CeroDropdown
            classes={{ container: classes.dropdown }}
            id="year"
            label="Year"
            fullWidth
            options={sampleYear}
            onChange={({ target }) => setYear(target.value)}
            selectedValue={filterYear}
          />
          <CeroDropdown
            classes={{ container: classes.monthsDropdown }}
            id="month"
            label="Month"
            fullWidth
            options={months}
            onChange={({ target }) => setMonth(target.value)}
            selectedValue={filterMonth}
          />
          <CeroDropdown
            classes={{ container: classes.facilityDropdown }}
            id="facility"
            label="Facility"
            fullWidth
            options={facilitiesList}
            onChange={({ target }) => setFacility(target.value)}
            selectedValue={facility}
          />
          <CeroButton
            buttonText="Apply"
            className={classes.buttonPrimary}
            onClick={() =>
              onApplyFilter({
                year: filterYear,
                month: filterMonth,
                facility: facility,
              })
            }
          />
        </Box>
        <Box className={classes.buttonContainer}>
          <CeroButton
            variant="outlined"
            buttonText="Raise a ticket"
            className={classes.buttonSecondary}
            onClick={() => setIsDrawerOpen(true)}
          />
          {actions && actions.perform_approval && (
            <CeroButton
              buttonText={isApproveRequestLoading ? "Approving..." : "Approve"}
              className={classes.buttonPrimary}
              onClick={onApprovingRequest}
              disabled={isApproveRequestLoading}
            />
          )}
          {actions && actions.perform_request_approval && (
            <CeroButton
              buttonText={isRequestApprovalLoading ? "Requesting..." : "Request Approval"}
              className={clsx(classes.buttonPrimary, classes.requestApproval)}
              onClick={onRequestApproval}
              disabled={isRequestApprovalLoading}
            />
          )}
          {actions && actions.perform_submission && (
            <CeroButton
              buttonText={isSubmitLoading ? "Submitting..." : "Submit"}
              className={classes.buttonPrimary}
              onClick={onSubmitApproval}
              disabled={isSubmitLoading}
            />
          )}
        </Box>
        <CreateTicketDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} scope="approval " scopeId={statusId}/>
      </Grid>
    </Container>
  );
};

export default Header;
