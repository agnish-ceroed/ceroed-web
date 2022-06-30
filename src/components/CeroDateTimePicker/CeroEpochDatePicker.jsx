/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { Box, TextField, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import dayjs from 'dayjs';
import clsx from 'clsx';

import useStyles from './styles';

const CeroEpochDatePicker = (props) => {
  const classes = useStyles();
  const handleDateChange = (date) => {
    if (date?.isValid()) props.onChange(props.name, date?.unix() || 0);
  };

  return (

    <Box className={clsx(classes.container, props.classes?.container)}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DesktopDatePicker
          label={props.label || 'Date Picker'}
          value={dayjs(props.value * 1000)}
          minDate={props.minDate ? dayjs(props.minDate * 1000) : undefined}
          maxDate={props.maxDate ? dayjs(props.maxDate * 1000) : undefined}
          onChange={handleDateChange}
          inputFormat={props.format || 'DD MMM YYYY'}
          ignoreInvalidInputs
          disableMaskedInput
          renderInput={(params) => <TextField {...params} id={props.id} />}
        />
      </LocalizationProvider>
      {!!props.helperText && <Typography className={clsx(classes.text, props.classes?.helperText)}>{props.helperText}</Typography>}
      {!!props.error && <Typography className={clsx(classes.text, classes.error, props.classes?.error)}>{props.error}</Typography>}
    </Box>
  );
};

export default CeroEpochDatePicker;
