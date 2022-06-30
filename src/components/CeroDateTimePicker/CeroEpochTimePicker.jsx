/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { Box, TextField, Typography } from '@mui/material';
import { DesktopTimePicker, LocalizationProvider } from '@mui/lab';
import dayjs from 'dayjs';
import clsx from 'clsx';

import useStyles from './styles';

const CeroEpochTimePicker = (props) => {
  const classes = useStyles();
  const handleDateChange = (date) => {
    if (date?.isValid()) props.onChange(props.name, date?.unix());
  };

  return (

    <Box className={clsx(classes.container, props.classes?.container)}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DesktopTimePicker
          label={props.label || 'Time Picker'}
          value={dayjs(props.value * 1000)}
          minTime={props.minTime ? dayjs(props.minTime * 1000) : undefined}
          maxTime={props.maxTime ? dayjs(props.maxTime * 1000) : undefined}
          onChange={handleDateChange}
          inputFormat={props.format || props.enableAmPm === false ? 'HH:mm' : 'hh:mm a'}
          ampm={props.enableAmPm}
          renderInput={(params) => <TextField {...params} id={props.id} />}
        />
      </LocalizationProvider>
      {!!props.helperText && <Typography className={clsx(classes.text, props.classes?.helperText)}>{props.helperText}</Typography>}
      {!!props.error && <Typography className={clsx(classes.text, classes.error, props.classes?.error)}>{props.error}</Typography>}
    </Box>
  );
};

export default CeroEpochTimePicker;
