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
        options={[{key: "india", value: "India"}]}
      />
      <CeroSelect
        required
        id="estabhlishedYear"
        label="Year of establishment"
        fullWidth
        options={[{key: "2010", value: "2010"}, {key: "2020", value: "2020"}]}
      />
      <CeroSelect
        required
        id="industryType"
        label="Type of industry"
        fullWidth
        options={[{key: "Manufacturing", value: "Manufacturing"},{key: "Reclycling", value: "Reclycling"}]}
      />
    </>
  );
}

export default CompanyDetails;
