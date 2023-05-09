import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

import { STATUS } from "../../../redux/constants";
import {
  resetAddCombustionStatus,
  deleteEmissions,
} from "../../../redux/actions";
import { getMonth } from "../../../services/utilityService";
import CeroButton from "../../../components/CeroButton";
import ListComments from "../ListComment";
import ListAuditTrails from "../ListAuditTrails";
import ListEmissionFiles from "../ListEmissionFiles";
import ListTicketDrawer from "../../common/ListTicketsDrawer";
import CeroConfirmDrawer from "../../../components/CeroConfirmDrawer";
import useStyles from "./styles";

const SupplierScreening = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    emissionId,
    emissionData,
    onCancel,
    isDeleteEnable,
    setIsDrawerOpen,
  } = props;

  const [value, setValue] = useState(0);
  const [showTickets, setShowTickets] = useState(false);
  const [displayWarning, setDisplayWarning] = useState(false);

  const deleteEmissionData = useSelector(
    (state) => state.emission.deleteEmissions
  );

  useEffect(() => {
    if (deleteEmissionData.status === STATUS.SUCCESS) {
      enqueueSnackbar("Supplier Screening deleted successfully", {
        variant: "success",
      });
      dispatch(resetAddCombustionStatus());
      onCancel();
    } else if (deleteEmissionData.status === STATUS.ERROR) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      dispatch(resetAddCombustionStatus());
    }
  }, [deleteEmissionData, enqueueSnackbar, onCancel, dispatch]);

  const onUpdatePurchasedElectricity = () => {
    navigate(`/emissions/edit/supplier_screening/${emissionId}`);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onConfirmDelete = () => {
    const requestData = {
      id: emissionId,
    };
    dispatch(deleteEmissions(requestData));
  };

  const onclickShowTickets = () => {
    setShowTickets(true);
  };

  const onCloseTickets = () => {
    setShowTickets(false);
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.innerContainer}>
        <Box className={classes.header}>
          <Typography variant="h6" component="div">
            Supplier Screening
          </Typography>
          <Box>
            <CeroButton
              variant="outlined"
              buttonText="Raise a ticket"
              className={classes.buttonSecondary}
              onClick={() => setIsDrawerOpen(true)}
            />
            <IconButton onClick={onclickShowTickets}>
              <AssignmentIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.topContainer}>
          <Grid
            container
            direction={"row"}
            wrap="nowrap"
            justifyContent={"space-between"}
            spacing={12}
          >
            <Grid item container direction={"column"} xs={10}>
              <Typography className={classes.previewItem}>
                Details: {emissionData.details}
              </Typography>
              <Typography className={classes.previewItem}>
                Supplier: {emissionData.supplier}
              </Typography>
              <Typography className={classes.previewItem}>
                Month and year: {getMonth[emissionData.month]}{" "}
                {emissionData.year}
              </Typography>
              <Typography className={classes.previewItem}>
                Status: {emissionData.status}
              </Typography>
              <Typography className={classes.previewItem}>
                Audited on: {emissionData.audited_by}
              </Typography>
              <Typography className={classes.previewItem}>
                Audited by:{" "}
                {emissionData.audited_on
                  ? dayjs(emissionData.audited_on).format("DD/MM/YYYY")
                  : ""}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className={classes.buttonContainer}>
        <CeroButton
          buttonText="Back"
          variant="outlined"
          className={clsx(classes.button, classes.buttonSecondary)}
          onClick={props.onCancel}
        />
        {isDeleteEnable && (
          <CeroButton
            buttonText={<DeleteOutlineIcon />}
            className={clsx(classes.button, classes.deleteButton)}
            onClick={() => setDisplayWarning(true)}
          />
        )}
        {emissionData.status !== 'approved' && (
          <CeroButton
            buttonText="Update"
            className={clsx(classes.button, classes.buttonPrimary)}
            onClick={onUpdatePurchasedElectricity}
          />
        )}
      </Box>
      <Box
        className={classes.tabContainer}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="emission tabs">
          <Tab label="Comments" id="comments" />
          <Tab label="Attachment" id="files" />
          <Tab label="Audit History" id="audit-history" />
        </Tabs>
      </Box>
      {value === 0 && <ListComments emissionId={emissionId} />}
      {value === 2 && <ListAuditTrails emissionId={emissionId} />}
      {value === 1 && <ListEmissionFiles emissionId={emissionId} />}
      {displayWarning && (
        <CeroConfirmDrawer
          isOpen={displayWarning}
          onClose={() => setDisplayWarning(false)}
          onConfirm={onConfirmDelete}
        />
      )}
      {showTickets && (
        <ListTicketDrawer
          isOpen={showTickets}
          scope="emission"
          scopeId={emissionId}
          onClose={onCloseTickets}
        />
      )}
    </Container>
  );
};

export default SupplierScreening;
