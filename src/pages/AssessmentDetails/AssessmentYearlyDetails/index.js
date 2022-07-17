import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { getAssessmentDetails } from "../../../redux/actions";
import { STATUS } from "../../../redux/constants";

import CeroButton from "../../../components/CeroButton";
import CeroInfoPair from "../../../components/CeroInfoPair";
import { months } from "../../../constants";
import CreateAssessmentCycle from "../CreateAssessmentCycle";
import DashboardLayout from "../../../layouts/DashboardLayout";

import useStyles from "./styles";

const AssessmentYearlyDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const year = queryParams.get("year");

  const assessmentDetails = useSelector(
    (state) => state.assessment.assessmentDetails.data
  );
  const assessmentDetailsStatus = useSelector(
    (state) => state.assessment.assessmentDetails.status
  );

  useEffect(() => {
    year && dispatch(getAssessmentDetails({ year }));
  }, [dispatch, year]);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Box className={classes.header}>
          <Typography variant="h7" component="span">
            {`Assessment Details ${year}`}
          </Typography>
          <Box className={classes.buttonContainer}>
            <CeroButton
              buttonText="Back"
              className={classes.buttonSecondary}
              onClick={() => navigate(-1)}
              variant="outlined"
            />
            {/* <CeroButton
                  buttonText={isDeleteLoading ? "Deleting..." : "Delete Report"}
                  className={classes.buttonPrimary}
                  onClick={onDeleteReport}
                  disabled={isDeleteLoading}
                /> */}
            <CeroButton
              buttonText="Edit"
              className={classes.buttonPrimary}
              onClick={() => setIsDrawerOpen(true)}
            />
          </Box>
        </Box>
        {assessmentDetailsStatus === STATUS.SUCCESS ? (
          <Box className={classes.innerContainer}>
            <CeroInfoPair
              title="GWP dataset"
              value={assessmentDetails.gwp_dataset}
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Assesment start year"
              value={assessmentDetails.assessment_start_year}
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Assesment end year"
              value={assessmentDetails.assessment_end_year}
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Assesment start month"
              value={
                months.find(
                  (month) =>
                    month.key === assessmentDetails.assessment_start_month
                )?.value
              }
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Assesment end month"
              value={
                months.find(
                  (month) =>
                    month.key === assessmentDetails.assessment_end_month
                )?.value
              }
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Approval cycle"
              value={assessmentDetails.approval_cycle}
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Submission due days count"
              value={assessmentDetails.submission_due_days_count}
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Approval assignment due days count"
              value={assessmentDetails.approval_assignment_due_days_count}
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Approval due days count"
              value={assessmentDetails.approval_due_days_count}
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Audit cycle"
              value={assessmentDetails.audit_cycle}
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Auditor assignment due days count"
              value={assessmentDetails.auditor_assignment_due_days_count}
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
            <CeroInfoPair
              title="Auditor due days count"
              value={assessmentDetails.audit_due_days_count}
              classes={{
                container: classes.infoContainer,
                title: classes.title,
                value: classes.title,
              }}
            />
          </Box>
        ) : (
          <Box className={classes.loader}>
            <Typography variant="h7" component="span">
              {assessmentDetailsStatus === STATUS.RUNNING
                ? "Loading..."
                : assessmentDetailsStatus === STATUS.ERROR
                ? "Something went wrong. Please try again later"
                : ""}
            </Typography>
          </Box>
        )}
        {assessmentDetailsStatus !== STATUS.RUNNING &&
          !_.isEmpty(assessmentDetails) && (
            <CreateAssessmentCycle
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              assessmentData={assessmentDetails}
              isEdit
            />
          )}
      </Container>
    </DashboardLayout>
  );
};

export default AssessmentYearlyDetails;
