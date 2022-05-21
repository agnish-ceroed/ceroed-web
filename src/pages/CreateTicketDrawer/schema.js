import * as yup from "yup";

export const createTicketValidation = yup.object({
  title: yup
    .string("Ticket title is required")
    .required("Ticket title is required"),
  details: yup
    .string("Ticket details is required")
    .required("Please fill ticket details"),
  assignee: yup
    .string("Ticket should be assigned")
    .required("Please assign ticket to someone"),
});
