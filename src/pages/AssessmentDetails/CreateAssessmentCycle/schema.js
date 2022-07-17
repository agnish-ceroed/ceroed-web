import * as yup from "yup";

export const createAssessmentValidation = yup.object({
  gwp_dataset: yup
    .string("GWP dataset is required")
    .required("GWP dataset is required"),
  assessment_year: yup
    .number("Assessment year is required")
    .required("Assessment year is required"),
  assessment_start_year: yup
    .number("Assessment start year is required")
    .required("Assessment start year is required"),
  assessment_end_year: yup
    .number("Assessment end year is required")
    .required("Assessment end year is required"),
  assessment_start_month: yup
    .number("Assessment start month is required")
    .required("Assessment start month is required"),
  assessment_end_month: yup
    .number("Assessment end month is required")
    .required("Assessment end month is required"),
  approval_cycle: yup
    .string("Approval cycle is required")
    .required("Approval cycle is required"),
  submission_due_days_count: yup
    .number("Submission due days count is required")
    .required("Submission due days count is required"),
  approval_assignment_due_days_count: yup
    .number("Approval assignment due days count is required")
    .required("Approval assignment due days count is required")
    .test("Max", "Should not exceed submission due days count", function (f) {
      const ref = yup.ref("submission_due_days_count");
      return f <= this.resolve(ref);
    }),
  approval_due_days_count: yup
    .number("Approval due days count is required")
    .required("Approval due days count is required")
    .test(
      "Max",
      "Should not exceed approval assignment due days count",
      function (f) {
        const ref = yup.ref("approval_assignment_due_days_count");
        return f <= this.resolve(ref);
      }
    ),
  audit_cycle: yup
    .string("Audit cycle is required")
    .required("Audit cycle is required"),
  auditor_assignment_due_days_count: yup
    .number("Auditor assignment due days count is required")
    .required("Auditor assignment due days count is required"),
  audit_due_days_count: yup
    .number("Audit due days count is required")
    .required("Audit due days count is required")
    .test("Max", "Should not exceed auditor assignment due days count", function (f) {
      const ref = yup.ref("auditor_assignment_due_days_count");
      return f <= this.resolve(ref);
    }),
});
