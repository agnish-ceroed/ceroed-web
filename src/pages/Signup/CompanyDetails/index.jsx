import { Typography } from "@mui/material";

import CeroInput from "../../../components/CeroInput";
import CeroSelect from "../../../components/CeroSelect";

const CompanyDetails = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>Company details</Typography>
      <CeroInput required id="company" label="Company" fullWidth />
      <CeroInput required id="website" label="Website" fullWidth />
      <CeroSelect
        required
        id="country"
        label="Country"
        fullWidth
        selectValues={["india"]}
      />
      <CeroSelect
        required
        id="estabhlishedYear"
        label="Year of establishment"
        fullWidth
        selectValues={[2010, 2020]}
      />
      <CeroSelect
        required
        id="industryType"
        label="Type of industry"
        fullWidth
        selectValues={["Manufacturing", "Reclycling"]}
      />
    </>
  );
}

export default CompanyDetails;
