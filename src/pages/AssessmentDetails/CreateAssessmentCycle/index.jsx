import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

import CeroInput from "../../../components/CeroInput";
import CeroSelect from "../../../components/CeroSelect";
import CeroSideSheetDrawer from "../../../components/CeroSideSheetDrawer";
import { months } from "../../../constants";
import { createAssessmentValidation } from "./schema";

import {
  resetAssessmentCycle,
  createAssessmentCycle,
  updateAssessmentCycle,
  listAssessmentCycle,
  getAssessmentDetails,
} from "../../../redux/actions";
import { STATUS } from "../../../redux/constants";

import useStyles from "./styles";

const CreateAssessmentCycle = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { assessmentData, isOpen, isEdit } = props;
  const createAssessmentCycleStatus = useSelector(
    (state) => state.assessment.createAssessmentCycle.status
  );
  const updateAssessmentCycleStatus = useSelector(
    (state) => state.assessment.updateAssessmentCycle.status
  );

  const isButtonLoading =
    createAssessmentCycleStatus === STATUS.RUNNING ||
    updateAssessmentCycleStatus === STATUS.RUNNING;

  const gwpDatasetList = [
    {
      key: "2014 IPCC Fifth Assessment",
      value: "2014 IPCC Fifth Assessment",
    },
  ];

  const approvalCycleOptions = [
    {
      key: "monthly",
      value: "Monthly",
    },
  ];

  const auditCycleOptions = [
    {
      key: "yearly",
      value: "Yearly",
    },
  ];
  
  const createAssessmentForm = useFormik({
    initialValues: {
      gwp_dataset: assessmentData
        ? assessmentData.gwp_dataset
        : "2014 IPCC Fifth Assessment",
      assessment_year: assessmentData
        ? assessmentData.assessment_year
        : dayjs().year() + 1,
      assessment_start_year: assessmentData
        ? assessmentData.assessment_start_year
        : dayjs().year() + 1,
      assessment_end_year: assessmentData
        ? assessmentData.assessment_end_year
        : dayjs().year() + 1,
      assessment_start_month: assessmentData
        ? assessmentData.assessment_start_month
        : 1,
      assessment_end_month: assessmentData
        ? assessmentData.assessment_end_month
        : 12,
      approval_cycle: assessmentData
        ? assessmentData.approval_cycle
        : "monthly",
      submission_due_days_count: assessmentData
        ? assessmentData.submission_due_days_count
        : 10,
      approval_assignment_due_days_count: assessmentData
        ? assessmentData.approval_assignment_due_days_count
        : 8,
      approval_due_days_count: assessmentData
        ? assessmentData.approval_due_days_count
        : 6,
      audit_cycle: assessmentData ? assessmentData.audit_cycle : "yearly",
      auditor_assignment_due_days_count: assessmentData
        ? assessmentData.auditor_assignment_due_days_count
        : 4,
      audit_due_days_count: assessmentData
        ? assessmentData.audit_due_days_count
        : 3,
    },
    validationSchema: createAssessmentValidation,
    onSubmit: () => {},
  });

  const onSubmitReportData = () => {
    const payload = {
      gwp_dataset: createAssessmentForm.values.gwp_dataset,
      assessment_year: createAssessmentForm.values.assessment_year,
      assessment_start_year: createAssessmentForm.values.assessment_start_year,
      assessment_end_year: createAssessmentForm.values.assessment_end_year,
      assessment_start_month:
        createAssessmentForm.values.assessment_start_month,
      assessment_end_month: createAssessmentForm.values.assessment_end_month,
      approval_cycle: createAssessmentForm.values.approval_cycle,
      submission_due_days_count:
        createAssessmentForm.values.submission_due_days_count,
      approval_assignment_due_days_count:
        createAssessmentForm.values.approval_assignment_due_days_count,
      approval_due_days_count:
        createAssessmentForm.values.approval_due_days_count,
      audit_cycle: createAssessmentForm.values.audit_cycle,
      auditor_assignment_due_days_count:
        createAssessmentForm.values.auditor_assignment_due_days_count,
      audit_due_days_count: createAssessmentForm.values.audit_due_days_count,
    };
    if (isEdit) {
      payload.id = assessmentData.id;
      dispatch(updateAssessmentCycle(payload));
    } else {
      dispatch(createAssessmentCycle(payload));
    }
  };
  const onClose = useCallback(() => {
    createAssessmentForm.resetForm({});
    props.onClose();
  }, [createAssessmentForm, props]);

  useEffect(() => {
    if (createAssessmentCycleStatus === STATUS.SUCCESS) {
      enqueueSnackbar("Assessment cycle created successfully", {
        variant: "success",
      });
      dispatch(listAssessmentCycle());
      dispatch(resetAssessmentCycle());
      onClose();
    } else if (createAssessmentCycleStatus === STATUS.ERROR) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      dispatch(resetAssessmentCycle());
    }
  }, [createAssessmentCycleStatus, enqueueSnackbar, onClose, dispatch]);

  useEffect(() => {
    if (updateAssessmentCycleStatus === STATUS.SUCCESS) {
      enqueueSnackbar("Assessment cycle updated successfully", {
        variant: "success",
      });
      dispatch(getAssessmentDetails({ year: assessmentData.assessment_year }));
      dispatch(resetAssessmentCycle());
      onClose();
    } else if (updateAssessmentCycleStatus === STATUS.ERROR) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      dispatch(resetAssessmentCycle());
    }
  }, [updateAssessmentCycleStatus, enqueueSnackbar, onClose, dispatch.apply, assessmentData, dispatch]);

  const getDrawer = () => {
    return (
      <Box className={classes.mainContainer}>
        <CeroSelect
          classes={{ container: classes.selectContainer }}
          required
          id="gwp_dataset"
          name="gwp_dataset"
          label="GWP dataset"
          fullWidth
          options={gwpDatasetList}
          selectedValue={createAssessmentForm.values.gwp_dataset}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.gwp_dataset &&
            createAssessmentForm.errors.gwp_dataset
          }
        />
        <CeroInput
          classes={{ container: classes.selectContainer }}
          required
          id="assessment_year"
          name="assessment_year"
          label="Approval assignment due days count"
          fullWidth
          type="number"
          value={createAssessmentForm.values.assessment_year}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.assessment_year &&
            createAssessmentForm.errors.assessment_year
          }
        />
        <CeroInput
          classes={{ container: classes.selectContainer }}
          required
          id="assessment_start_year"
          name="assessment_start_year"
          label="Approval assignment due days count"
          fullWidth
          type="number"
          value={createAssessmentForm.values.assessment_start_year}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.assessment_start_year &&
            createAssessmentForm.errors.assessment_start_year
          }
        />
        <CeroInput
          classes={{ container: classes.selectContainer }}
          required
          id="assessment_end_year"
          name="assessment_end_year"
          label="Approval assignment due days count"
          fullWidth
          type="number"
          value={createAssessmentForm.values.assessment_end_year}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.assessment_end_year &&
            createAssessmentForm.errors.assessment_end_year
          }
        />
        <CeroSelect
          classes={{ container: classes.selectContainer }}
          required
          id="assessment_start_month"
          name="assessment_start_month"
          label="Assessment start month"
          fullWidth
          options={months}
          selectedValue={
            createAssessmentForm.values.assessment_start_month || ""
          }
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.assessment_start_month &&
            createAssessmentForm.errors.assessment_start_month
          }
        />
        <CeroSelect
          classes={{ container: classes.selectContainer }}
          required
          id="assessment_end_month"
          name="assessment_end_month"
          label="Assessment end month"
          fullWidth
          options={months}
          selectedValue={createAssessmentForm.values.assessment_end_month || ""}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.assessment_end_month &&
            createAssessmentForm.errors.assessment_end_month
          }
        />
        <CeroSelect
          classes={{ container: classes.selectContainer }}
          required
          id="approval_cycle"
          name="approval_cycle"
          label="Approval cycle"
          fullWidth
          options={approvalCycleOptions}
          selectedValue={createAssessmentForm.values.approval_cycle || ""}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.approval_cycle &&
            createAssessmentForm.errors.approval_cycle
          }
        />
        <CeroInput
          classes={{ container: classes.selectContainer }}
          required
          id="submission_due_days_count"
          name="submission_due_days_count"
          label="Submission due days count"
          fullWidth
          type="number"
          value={createAssessmentForm.values.submission_due_days_count}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.submission_due_days_count &&
            createAssessmentForm.errors.submission_due_days_count
          }
        />
        <CeroInput
          classes={{ container: classes.selectContainer }}
          required
          id="approval_assignment_due_days_count"
          name="approval_assignment_due_days_count"
          label="Approval assignment due days count"
          fullWidth
          type="number"
          value={createAssessmentForm.values.approval_assignment_due_days_count}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.approval_assignment_due_days_count &&
            createAssessmentForm.errors.approval_assignment_due_days_count
          }
        />
        <CeroInput
          classes={{ container: classes.selectContainer }}
          required
          id="approval_due_days_count"
          name="approval_due_days_count"
          label="Approval due days count"
          fullWidth
          type="number"
          value={createAssessmentForm.values.approval_due_days_count}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.approval_due_days_count &&
            createAssessmentForm.errors.approval_due_days_count
          }
        />
        <CeroSelect
          classes={{ container: classes.selectContainer }}
          required
          id="audit_cycle"
          name="audit_cycle"
          label="Audit cycle"
          fullWidth
          options={auditCycleOptions}
          selectedValue={createAssessmentForm.values.audit_cycle || ""}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.audit_cycle &&
            createAssessmentForm.errors.audit_cycle
          }
        />
        <CeroInput
          classes={{ container: classes.selectContainer }}
          required
          id="auditor_assignment_due_days_count"
          name="auditor_assignment_due_days_count"
          label="Auditor assignment due days count"
          fullWidth
          type="number"
          value={createAssessmentForm.values.auditor_assignment_due_days_count}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.auditor_assignment_due_days_count &&
            createAssessmentForm.errors.auditor_assignment_due_days_count
          }
        />
        <CeroInput
          classes={{ container: classes.selectContainer }}
          required
          id="audit_due_days_count"
          name="audit_due_days_count"
          label="Audit due days count"
          fullWidth
          type="number"
          value={createAssessmentForm.values.audit_due_days_count}
          onChange={createAssessmentForm.handleChange}
          onBlur={createAssessmentForm.handleBlur}
          error={
            createAssessmentForm.touched.audit_due_days_count &&
            createAssessmentForm.errors.audit_due_days_count
          }
        />
      </Box>
    );
  };

  return (
    <CeroSideSheetDrawer
      primaryDrawer={{
        drawerOpen: isOpen,
        onClose: onClose,
        content: getDrawer(),
        header: {
          title: isEdit ? "Update assessment cycle" : "Create assessment cycle",
        },
        footer: {
          primaryBtnTitle: isButtonLoading ? "Saving..." : "Save",
          secondaryBtnTitle: "Cancel",
          primaryBtnAction: onSubmitReportData,
          secondaryBtnAction: onClose,
          disablePrimaryBtn:
            !!Object.keys(createAssessmentForm.errors).length ||
            isButtonLoading,
        },
        classes: {
          drawerContainer: classes.drawerContainer,
          contentArea: classes.drawerContentArea,
        },
      }}
    />
  );
};

export default CreateAssessmentCycle;
