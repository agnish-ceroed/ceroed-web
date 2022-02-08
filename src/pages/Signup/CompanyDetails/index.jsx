import { Typography, Box } from "@mui/material";
import { useFormik } from 'formik';

import CeroInput from '../../../components/CeroInput';
import CeroSelect from '../../../components/CeroSelect';
import CeroButton from '../../../components/CeroButton';
import { companyDetailsSchema } from "../schema";
import useStyles from './styles';

const CompanyDetails = (props) => {
  const classes = useStyles();
  const companyDetailsForm = useFormik({
    initialValues: {
      company: props.companyDetails.company || '',
      website: props.companyDetails.website || '',
      country: props.companyDetails.country || '',
      estabhlishedYear: props.companyDetails.estabhlishedYear || '',
      industryType: props.companyDetails.industryType || '',
    },
    validationSchema: companyDetailsSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  });
  const handleNext = () => {
    props.onNext(1, companyDetailsForm.values);
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>Company details</Typography>
      <CeroInput
        required
        fullWidth
        name="company"
        label="Company"
        value={companyDetailsForm.values.company}
        onChange={companyDetailsForm.handleChange}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.company && companyDetailsForm.errors.company}
      />
      <CeroInput
        required
        fullWidth
        name="website"
        label="Website"
        value={companyDetailsForm.values.website}
        onChange={companyDetailsForm.handleChange}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.website && companyDetailsForm.errors.website}
      />
      <CeroSelect
        required
        name="country"
        label="Country"
        fullWidth
        options={[{ key: "india", value: "India" }]}
        selectedValue={companyDetailsForm.values.country}
        onChange={companyDetailsForm.handleChange}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.country && companyDetailsForm.errors.country}
      />
      <CeroSelect
        required
        name="estabhlishedYear"
        label="Year of establishment"
        fullWidth
        options={[{ key: "2010", value: "2010" }, { key: "2020", value: "2020" }]}
        selectedValue={companyDetailsForm.values.estabhlishedYear}
        onChange={companyDetailsForm.handleChange}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.estabhlishedYear && companyDetailsForm.errors.estabhlishedYear}
      />
      <CeroSelect
        required
        name="industryType"
        label="Type of industry"
        fullWidth
        options={[{ key: "Manufacturing", value: "Manufacturing" }, { key: "Reclycling", value: "Reclycling" }]}
        selectedValue={companyDetailsForm.values.industryType}
        onChange={companyDetailsForm.handleChange}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.industryType && companyDetailsForm.errors.industryType}
      />
      <Box className={classes.cardFooter}>
        <CeroButton
          onClick={props.onBack}
          buttonText='Back'
          className={classes.button}
        />
        <CeroButton
          variant="contained"
          onClick={handleNext}
          buttonText={'Next'}
          classes={{ root: classes.button }}
          disabled={!companyDetailsForm.dirty || !companyDetailsForm.isValid}
        />
      </Box>
    </>
  );
}

export default CompanyDetails;
