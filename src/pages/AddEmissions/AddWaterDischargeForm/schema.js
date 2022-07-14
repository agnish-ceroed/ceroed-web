import * as yup from 'yup';

export const addWaterDischargeCombustionValidation = yup.object({
  facility: yup.string('Facility is required').required('Facility is required'),
  month: yup.string('Month is required').required('Month is required'),
  year: yup.string('Year is required').required('Year is required'),
  destination: yup
    .string('Destination is required')
    .required('Destination is required'),
  stressType: yup
    .string('Stress Type is required')
    .required('Stress Type is required'),
  destinationType: yup
    .string('Destination Type is required')
    .required('Destination Type is required'),
  treatmentRequired: yup
    .string('Treatment Required is required')
    .required('Treatment Required is required'),
  treatmentLevel: yup
    .string('Treatment Level is required')
    .required('Treatment Level is required'),
  fuelUnit: yup.string('Unit is required').required('Unit is required'),
  amountOfFuel: yup
    .string('Amount of water is required')
    .required('Amount of water is required')
});