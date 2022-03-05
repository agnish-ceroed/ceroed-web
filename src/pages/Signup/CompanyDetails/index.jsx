import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useFormik } from 'formik';

import CeroInput from '../../../components/CeroInput';
import CeroSelect from '../../../components/CeroSelect';
import CeroButton from '../../../components/CeroButton';
import { companyDetailsSchema } from "../schema";
import { getIndustryTypes, getCountryList } from "../../../redux/actions";
import useStyles from './styles';
import { useSelector } from "react-redux";


const CompanyDetails = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const industryType = useSelector(state => state.listings.industryTypes.data)
  const countryList = useSelector(state => state.listings.countryList.data)

  useEffect(() => {
    dispatch(getIndustryTypes())
    dispatch(getCountryList())
  }, [])

  const companyDetailsForm = useFormik({
    initialValues: {
      company: props.companyDetails.company || '',
      phone: props.companyDetails.phone || '',
      website: props.companyDetails.website || '',
      email: props.companyDetails.email || '',
      address: props.companyDetails.address || '',
      country: props.companyDetails.country || '',
      establishedYear: props.companyDetails.establishedYear || '',
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
        name="phone"
        label="Phone number"
        value={companyDetailsForm.values.phone}
        onChange={companyDetailsForm.handleChange}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.phone && companyDetailsForm.errors.phone}
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
      <CeroInput
        required
        fullWidth
        name="email"
        label="Company email"
        value={companyDetailsForm.values.email}
        onChange={companyDetailsForm.handleChange}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.email && companyDetailsForm.errors.email}
      />
      <CeroInput
        required
        fullWidth
        name="address"
        label="Company address"
        value={companyDetailsForm.values.address}
        onChange={companyDetailsForm.handleChange}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.address && companyDetailsForm.errors.address}
      />
      <CeroSelect
        required
        name="country"
        label="Country"
        fullWidth
        options={countryList}
        selectedValue={companyDetailsForm.values.country}
        onChange={companyDetailsForm.handleChange}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.country && companyDetailsForm.errors.country}
      />
      <CeroSelect
        required
        name="establishedYear"
        label="Year of establishment"
        fullWidth
        options={[{ code: "2010", name: "2010" }, { code: "2020", name: "2020" }]}
        selectedValue={companyDetailsForm.values.establishedYear}
        onChange={companyDetailsForm.handleChange}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.establishedYear && companyDetailsForm.errors.establishedYear}
      />
      <CeroSelect
        required
        name="industryType"
        label="Type of industry"
        fullWidth
        options={industryType}
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
