import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import clsx from "clsx";

import { Container, Typography, Box, Tooltip, Zoom } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import DashboardLayout from "../../../layouts/DashboardLayout";
import Status from "../Status";
import CeroButton from "../../../components/CeroButton";
import CeroEditor from "../../../components/CeroEditor";

import {
  getReportDetails,
  deleteReport,
  resetReportStatus,
  updateReport,
} from "../../../redux/actions";
import { STATUS } from "../../../redux/constants";

import useStyles from "./styles";

const parse = require("html-react-parser");

const ReportDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const reportDetails = useSelector(
    (state) => state.reports.reportDetails.data
  );
  const reportsListStatus = useSelector(
    (state) => state.reports.reportDetails.status
  );
  const deleteReportStatus = useSelector(
    (state) => state.reports.deleteReport.status
  );

  const updateReportStatus = useSelector(
    (state) => state.reports.updateReport.status
  );

  const onDeleteReport = () => {
    id && dispatch(deleteReport(id));
  };

  const onEditReport = () => {
    window.open(reportDetails.edit_url, "_blank");
  }

  useEffect(() => {
    if (deleteReportStatus === STATUS.SUCCESS) {
      enqueueSnackbar("Report deleted successfully", { variant: "success" });
      dispatch(resetReportStatus());
      navigate("/reports");
    } else if (deleteReportStatus === STATUS.ERROR) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      dispatch(resetReportStatus());
    }
  }, [deleteReportStatus, enqueueSnackbar, dispatch, navigate]);

  useEffect(() => {
    id && dispatch(getReportDetails(id));
  }, [dispatch, id]);

  const isDeleteLoading = deleteReportStatus === STATUS.RUNNING;

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        {reportsListStatus === STATUS.SUCCESS ? (
          <Fragment>
            <Box>
              <Typography variant="h6" component="span">
                {`Report: ${reportDetails.name}`}
              </Typography>
              <Box className={classes.buttonContainer}>
                <CeroButton
                  buttonText="Back"
                  className={classes.buttonSecondary}
                  onClick={() => navigate(-1)}
                  variant="outlined"
                />
                <CeroButton
                  buttonText={isDeleteLoading ? "Deleting..." : "Delete Report"}
                  className={classes.buttonPrimary}
                  onClick={onDeleteReport}
                  disabled={isDeleteLoading}
                />
                <CeroButton
                  buttonText="Edit Report"
                  className={classes.buttonTeritiary}
                  onClick={onEditReport}
                  disabled={!reportDetails.preview_url}
                />
              </Box>
            </Box>

            <Status reportDetails={reportDetails} />
            <Box className={classes.detailsContainer}>
              {/* {isEditEnabled ? (
                <>
                  <Box className={classes.editorContainer}>
                    <CeroEditor value={editorValue} setValue={setEditorValue} />
                  </Box>
                  <Box
                    className={clsx(classes.buttonContainer, classes.footer)}
                  >
                    <CeroButton
                      buttonText="Cancel"
                      className={classes.buttonSecondary}
                      onClick={onCancelEdit}
                      variant="outlined"
                    />
                    <CeroButton
                      buttonText={isUpdateLoading ? "Saving..." : "Save"}
                      className={classes.buttonPrimary}
                      onClick={onUpdateReport}
                      disabled={!editorValue || isUpdateLoading}
                    />
                  </Box>
                </>
              ) : ( */}
                <Box className={classes.bodyContainer}>
                  {/* <Tooltip
                    title="Edit report details"
                    placement="bottom"
                    arrow
                    TransitionComponent={Zoom}
                    className={classes.tooltip}
                  >
                    <EditOutlinedIcon onClick={() => setIsEditEnabled(true)} />
                  </Tooltip> */}
                  {/* {reportDetails.body && parse(reportDetails.body)} */}
                  {reportDetails.preview_url && <iframe title="report-preview" src={reportDetails.preview_url} height={600} width={window.innerWidth - 256 - 36*2}/>}
                </Box>
              {/* )} */}
            </Box>
          </Fragment>
        ) : (
          <Box className={classes.loader}>
            <Typography variant="h7" component="span">
              {reportsListStatus === STATUS.RUNNING
                ? "Loading..."
                : reportsListStatus === STATUS.ERROR
                ? "Something went wrong. Please try again later"
                : ""}
            </Typography>
          </Box>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default ReportDetails;
