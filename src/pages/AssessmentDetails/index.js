import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography,CircularProgress } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import CeroTable from "../../components/CeroTable";
import { useNavigate } from "react-router-dom";

import { listAssessmentCycle } from "../../redux/actions";
import { STATUS } from "../../redux/constants";

import CreateAssessmentCycle from "./CreateAssessmentCycle";

import useStyles from "./styles";
import CeroButton from "../../components/CeroButton";

export const assessmentDetailsColumn = [
  {
    columnKey: "assessment_year",
    columnId: "assessment_year",
    columnHeader: "Assessment Year",
  },
  {
    columnKey: "approval_cycle",
    columnId: "approval_cycle",
    columnHeader: "Approval Cycle",
  },
  {
    columnKey: "audit_cycle",
    columnId: "audit_cycle",
    columnHeader: "Audit Cycle",
  },
  {
    columnKey: "gwp_dataset",
    columnId: "gwp_dataset",
    columnHeader: "GWP Dataset",
  },
];

const AssessmentDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const assessmentList = useSelector(
    (state) => state.assessment.assessmentList.data
  );
  const assessmentListStatus = useSelector(
    (state) => state.assessment.assessmentList.status
  );

  const onSelectAuditSummaryData = (row) => {
    navigate(`details/?year=${row.assessment_year}`);
  };

  useEffect(() => {
    dispatch(listAssessmentCycle());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Box className={classes.header}>
          <Typography variant="h7" component="span">
            Assessment Cycles
          </Typography>
          <CeroButton
            buttonText="Create assessment cycle"
            className={classes.buttonPrimary}
            onClick={() => setIsDrawerOpen(true)}
          />
        </Box>
        {assessmentListStatus === STATUS.SUCCESS ? (
          <CeroTable
            columns={assessmentDetailsColumn}
            data={assessmentList}
            hasMore={false}
            loading={false}
            onSelectRow={onSelectAuditSummaryData}
            classes={{ tableContainer: classes.tableContainer }}
          />
        ) : (
          <Box className={classes.loader}>
            <Typography variant="h7" component="span">
              {assessmentListStatus === STATUS.RUNNING
                ? <CircularProgress/>
                : assessmentListStatus === STATUS.ERROR
                ? "Something went wrong. Please try again later"
                : ""}
            </Typography>
          </Box>
        )}
      </Container>
      <CreateAssessmentCycle
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </DashboardLayout>
  );
};

export default AssessmentDetails;
