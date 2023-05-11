import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useFormik } from 'formik';
import { useSelector } from "react-redux";

import { companyDetailsSchema } from "../schema";
import { getIndustryTypes, getCountryList } from "../../../redux/actions";
import { sampleYear } from "../../../constants";

import CeroPhoneInput from "../../../components/CeroPhoneInput";
import CeroAutoComplete from "../../../components/CeroAutoComplete";
import CeroInput from '../../../components/CeroInput';
import CeroButton from '../../../components/CeroButton';
import useStyles from './styles';


const CompanyDetails = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const industryTypeData = useSelector(state => state.listings.industryTypes.data)
  const countryListData = useSelector(state => state.listings.countryList.data)

  const countryList = countryListData.map(item => ({ key: item.code, label: item.name }));
  const industryType = industryTypeData.map(item => ({ key: item.code, label: item.name }));
  const yearList = sampleYear.map(item => ({ key: item.key, label: item.value }));

  useEffect(() => {
    dispatch(getIndustryTypes())
    dispatch(getCountryList())
  }, [dispatch])

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
      <CeroPhoneInput
        required
        fullWidth
        name="phone"
        label="Phone number"
        value={companyDetailsForm.values.phone}
        onChange={(value) => companyDetailsForm.setFieldValue("phone", value)}
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
      <CeroAutoComplete
        id="country"
        label="Country"
        onChange={(e, value) => companyDetailsForm.setFieldValue('country', value?.key)}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.country && companyDetailsForm.errors.country}
        options={countryList}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <CeroAutoComplete
        name="establishedYear"
        label="Year of establishment"
        options={yearList}
        onChange={(e, value) => companyDetailsForm.setFieldValue('establishedYear', value?.key)}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.establishedYear && companyDetailsForm.errors.establishedYear}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <CeroAutoComplete
        name="industryType"
        label="Type of industry"
        options={industryType}
        onChange={(e, value) => companyDetailsForm.setFieldValue('industryType', value?.key)}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.touched.industryType && companyDetailsForm.errors.industryType}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <Box className={classes.cardFooter}>
        <CeroButton
          onClick={props.onBack}
          buttonText='Back'
          className={classes.backButton}
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
