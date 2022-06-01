import * as yup from "yup";

export const createReportValidation = yup.object({
  name: yup
    .string("Report name is required")
    .required("Report name is required"),
  framework: yup
    .string("Report framework is required")
    .required("Please fill ticket framework"),
  year: yup
    .number("Report year is required")
    .required("Report year is required"),
  topic: yup
    .array()
    .min(1)
    .required("Report topic is required"),
});
