import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { Container, Typography, Box, Chip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

import DashboardLayout from "../../../layouts/DashboardLayout";
import CeroInput from "../../../components/CeroInput";
import CeroButton from "../../../components/CeroButton";
import Status from "../Status";

import {
  addResponse,
  closeTicket,
  deleteTicket,
  getTicketDetails,
  resetTicketStatus,
} from "../../../redux/actions";
import { STATUS } from "../../../redux/constants";

import useStyles from "./styles";
import CeroCommentCell from "../../../components/CeroCommentCell";

const getStatus = (status) => {
  if (status === "open") {
    return <Chip label={"Open"} color="warning" />;
  } else if (status === "closed") {
    return (
      <Chip
        label={"Closed"}
        color="success"
        deleteIcon={<DoneIcon />}
        onDelete={() => {}}
      />
    );
  } else {
    return <Chip label={status} color="info" variant="outlined" />;
  }
};

const TicketDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("ticketId");
  const companyId = queryParams.get("companyId");

  const [comment, setComment] = useState("");

  const ticketDetails = useSelector(
    (state) => state.ticket.ticketDetails.data.response
  );
  const ticketDetailsAction = useSelector(
    (state) => state.ticket.ticketDetails.data.actions
  );
  const ticketDetailsStatus = useSelector(
    (state) => state.ticket.ticketDetails.status
  );
  const closeTicketDetailsStatus = useSelector(
    (state) => state.ticket.closeTicketDetails.status
  );
  const deleteTicketDetailsStatus = useSelector(
    (state) => state.ticket.deleteTicketDetails.status
  );
  const addCommentStatus = useSelector(
    (state) => state.ticket.addResponse.status
  );

  const onAddComment = () => {
    dispatch(addResponse({ id, response: comment, companyId }));
  };

  const onCloseTicket = () => {
    dispatch(closeTicket({ id, companyId }));
  };

  const onDeleteTicket = () => {
    dispatch(deleteTicket({id, companyId}));
  };

  const isCommentLoading = addCommentStatus === STATUS.RUNNING;
  const isCloseLoading = closeTicketDetailsStatus === STATUS.RUNNING;
  const isDeleteLoading = deleteTicketDetailsStatus === STATUS.RUNNING;

  useEffect(() => {
    if (addCommentStatus === STATUS.SUCCESS) {
      enqueueSnackbar("Comment added successfully", { variant: "success" });
      setComment("");
      dispatch(resetTicketStatus());
      dispatch(getTicketDetails({ id, companyId }));
    } else if (addCommentStatus === STATUS.ERROR) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      dispatch(resetTicketStatus());
    }
  }, [addCommentStatus, enqueueSnackbar, dispatch, id, companyId]);

  useEffect(() => {
    if (closeTicketDetailsStatus === STATUS.SUCCESS) {
      enqueueSnackbar("Ticket closed successfully", { variant: "success" });
      dispatch(resetTicketStatus());
      navigate("/tickets");
    } else if (closeTicketDetailsStatus === STATUS.ERROR) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      dispatch(resetTicketStatus());
    }
  }, [closeTicketDetailsStatus, enqueueSnackbar, dispatch, navigate]);

  useEffect(() => {
    if (deleteTicketDetailsStatus === STATUS.SUCCESS) {
      enqueueSnackbar("Ticket deleted successfully", { variant: "success" });
      dispatch(resetTicketStatus());
      navigate("/tickets");
    } else if (deleteTicketDetailsStatus === STATUS.ERROR) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      dispatch(resetTicketStatus());
    }
  }, [deleteTicketDetailsStatus, enqueueSnackbar, dispatch, navigate]);

  useEffect(() => {
    id && dispatch(getTicketDetails({ id, companyId }));
  }, [dispatch, id, companyId]);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        {ticketDetailsStatus === STATUS.SUCCESS ? (
          <Fragment>
            <Box className={classes.header}>
              <Typography variant="h6" component="span">
                {`Ticket: ${ticketDetails.title}`}
              </Typography>
              {getStatus(ticketDetails.status)}
            </Box>
            <Status ticketDetails={ticketDetails} />
            <Box className={classes.detailsContainer}>
              <Box
                className={
                  ticketDetailsAction.perform_ticket_close ||
                  ticketDetailsAction.perform_ticket_deletion
                    ? clsx(
                        classes.ticketInnerContainer,
                        classes.innerContainerWithFooter
                      )
                    : classes.ticketInnerContainer
                }
              >
                <Box className={classes.descriptionContainer}>
                  <Typography variant="h6" component="span">
                    {`Description`}
                  </Typography>
                  <Typography variant="h7" component="span">
                    {ticketDetails.description}
                  </Typography>
                </Box>
                <Box className={classes.descriptionContainer}>
                  <Typography variant="h6" component="span">
                    {`Comments`}
                  </Typography>
                  {ticketDetails.responses && ticketDetails.responses.length ? (
                    ticketDetails.responses.map((comment) => (
                      <CeroCommentCell
                        key={comment.response.id}
                        name={comment.response_user_name}
                        msg={comment.response}
                        time={comment.created_on}
                      />
                    ))
                  ) : (
                    <Typography variant="h7" component="span">
                      No comments yet
                    </Typography>
                  )}
                </Box>
                {ticketDetailsAction.perform_ticket_response && (
                  <Box className={classes.commentBox}>
                    <CeroInput
                      classes={{ container: classes.textArea }}
                      rows={3}
                      multiline
                      id="comment"
                      name="comment"
                      label="Comment"
                      placeholder="Please type your comment"
                      value={comment}
                      fullWidth
                      onChange={({ target }) => setComment(target.value)}
                    />
                    <CeroButton
                      buttonText={
                        isCommentLoading ? "Commenting..." : "Add comment"
                      }
                      className={clsx(
                        classes.buttonPrimary,
                        classes.commentButton
                      )}
                      onClick={onAddComment}
                      disabled={!comment || isCommentLoading}
                    />
                  </Box>
                )}
              </Box>
              {(ticketDetailsAction.perform_ticket_close ||
                ticketDetailsAction.perform_ticket_deletion) && (
                <Box className={classes.ticketFooter}>
                  {ticketDetailsAction.perform_ticket_close && (
                    <CeroButton
                      buttonText={
                        isCloseLoading ? "Closing..." : "Close ticket"
                      }
                      className={
                        ticketDetailsAction.perform_ticket_deletion
                          ? clsx(
                              classes.buttonSecondary,
                              classes.secondaryMargin
                            )
                          : classes.buttonSecondary
                      }
                      onClick={onCloseTicket}
                      disabled={isCloseLoading}
                      variant="outlined"
                    />
                  )}
                  {ticketDetailsAction.perform_ticket_deletion && (
                    <CeroButton
                      buttonText={
                        isDeleteLoading ? "Deleting..." : "Delete ticket"
                      }
                      className={classes.buttonPrimary}
                      onClick={onDeleteTicket}
                      disabled={isDeleteLoading}
                    />
                  )}
                </Box>
              )}
            </Box>
          </Fragment>
        ) : (
          <Box className={classes.loader}>
            <Typography variant="h7" component="span">
              {ticketDetailsStatus === STATUS.RUNNING
                ? "Loading..."
                : ticketDetailsStatus === STATUS.ERROR
                ? "Something went wrong. Please try again later"
                : ""}
            </Typography>
          </Box>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default TicketDetails;
