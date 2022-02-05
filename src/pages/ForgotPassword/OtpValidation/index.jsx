import { Typography } from "@mui/material";

import CeroInput from "../../../components/CeroInput";

const OtpValidation = ({ otp, onChangeOtp, onError, onBlur }) => {
  return (
    <>
      <Typography variant="body1">Please enter otp which is sent to your email address</Typography>
      <CeroInput
        required
        value={otp}
        onChange={onChangeOtp}
        onBlur={onBlur}
        error={onError}
        id="otp"
        label="Enter OTP"
        fullWidth />
    </>
  );
}

export default OtpValidation;
