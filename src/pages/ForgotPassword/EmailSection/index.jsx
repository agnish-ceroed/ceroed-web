import { Typography } from "@mui/material";

import CeroInput from "../../../components/CeroInput";

const EmailSection = ({ email, onChangeEmail, onError, onBlur }) => {
  return (
    <>
      <Typography variant="body1">
        To receive otp to reset your password, please enter your current email
        address.
      </Typography>
      <CeroInput
        required
        value={email}
        onBlur={onBlur}
        onChange={onChangeEmail}
        error={onError}
        id="email"
        label="Email address"
        fullWidth
        required={true}
      />
    </>
  );
}

export default EmailSection;
