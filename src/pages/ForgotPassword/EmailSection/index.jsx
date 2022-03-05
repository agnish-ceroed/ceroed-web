import { Typography } from "@mui/material";
import { useFormik } from "formik";

import CeroInput from "../../../components/CeroInput";
import CeroButton from '../../../components/CeroButton'
import { emailSchema } from "../schema";

const EmailSection = (props) => {

  const emailForm = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema
  });

  const handleNext = () => {
    props.onNext(0, emailForm.values)
  }

  return (
    <>
      <Typography variant="body1">
        To receive otp to reset your password, please enter your current email
        address.
      </Typography>
      <CeroInput
        required
        id="email"
        label="Email address"
        fullWidth
        value={emailForm.values.email}
        onBlur={emailForm.handleBlur}
        onChange={emailForm.handleChange}
        error={emailForm.touched.email && emailForm.errors.email}
      />
      <CeroButton
        variant="contained"
        onClick={handleNext}
        fullWidth
        buttonText='SENT OTP'
        disabled={!emailForm.dirty || !emailForm.isValid}
      />
    </>
  );
}

export default EmailSection;
