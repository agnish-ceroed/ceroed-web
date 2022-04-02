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
import { sampleYear } from "../../../constants";
import CeroAutoComplete from "../../../components/CeroAutoComplete";


const CompanyDetails = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const industryTypeData = useSelector(state => state.listings.industryTypes.data)
  const countryListData = useSelector(state => state.listings.countryList.data)

  const countryList = countryListData.map(item => ({ id: item.code, label: item.name }));
  const industryType = industryTypeData.map(item => ({ key: item.code, value: item.name }));

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
      <CeroAutoComplete
        id="country"
        label="Country"
        onChange={(e, value) => companyDetailsForm.setFieldValue('country', value.id)}
        onBlur={companyDetailsForm.handleBlur}
        error={companyDetailsForm.errors.country}
        options={countryList}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <CeroSelect
        required
        name="establishedYear"
        label="Year of establishment"
        fullWidth
        options={sampleYear}
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
