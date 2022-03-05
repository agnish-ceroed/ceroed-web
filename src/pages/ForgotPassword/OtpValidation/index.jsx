import { Typography } from "@mui/material";
import { useFormik } from "formik";

import CeroButton from "../../../components/CeroButton";
import CeroInput from "../../../components/CeroInput";
import { otpSchema } from "../schema";

const OtpValidation = (props) => {

  const otpForm = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: otpSchema
  });

  const handleNext = () => {
    props.onNext(1, otpForm.values)
  }

  return (
    <>
      <Typography variant="body1">Please enter otp which is sent to your email address</Typography>
      <CeroInput
        required
        id="otp"
        label="Enter OTP"
        fullWidth
        value={otpForm.values.otp}
        onChange={otpForm.handleChange}
        onBlur={otpForm.handleBlur}
        error={otpForm.touched.email && otpForm.errors.email}
      />
      <CeroButton
        variant="contained"
        onClick={handleNext}
        fullWidth
        buttonText='VERIFY OTP'
        disabled={!otpForm.dirty || !otpForm.isValid}
      />
    </>
  );
}

export default OtpValidation;
