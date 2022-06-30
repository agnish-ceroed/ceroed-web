/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { TextField, Popover, Box } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import dayjs from 'dayjs';

const CeroEpochDatePickerPopover = (props) => {
  const ref = useRef();

  const handleDateChange = (date) => {
    if (date?.isValid()) props.onChange(props.name, date?.unix() || 0);
  };

  return (
    <>
      <Box onClick={props.toggleShowPopover} ref={ref} className={props?.className}>
        {props.anchorComponent}
      </Box>
      <Popover
        id={props.id}
        open={!!props.open}
        anchorOrigin={{
          vertical: props.anchorOriginVertical || 'bottom',
          horizontal: props.anchorOriginHorizontal || 'center',
        }}
        anchorEl={ref.current}
        onClose={props.toggleShowPopover}
      >
        <LocalizationProvider dateAdapter={DateAdapter}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={dayjs(props.value * 1000)}
            minDate={props.minDate ? dayjs(props.minDate * 1000) : undefined}
            maxDate={props.maxDate ? dayjs(props.maxDate * 1000) : undefined}
            inputFormat={props.format || 'DD MM YYYY'}
            onChange={handleDateChange}
            ignoreInvalidInputs
            disableMaskedInput
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Popover>
    </>
  );
};

export default CeroEpochDatePickerPopover;
