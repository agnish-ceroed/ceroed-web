import React from 'react';
import {
  Box, Button, Paper, Typography,
} from '@mui/material';
import clsx from 'clsx';

import useStyles from './styles';

// Footer Props {
//   footerInfoText?: string;
//   hidePrimaryBtn?: boolean;
//   disablePrimaryBtn?: boolean;
//   primaryBtnTitle?: string;
//   primaryBtnAction?: ()=>void;
//   hideSecondaryBtn?: boolean;
//   disableSecondaryBtn?: boolean;
//   secondaryBtnTitle?: string;
//   secondaryBtnAction?: ()=>void;
//   classes?: ClassType;
// }

const Footer = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.footerContainer}>
      {props.footerInfoText && (
      <Typography className={clsx(classes.footerTitle, props.classes?.footerInfoText)} noWrap>
        {props.footerInfoText}
      </Typography>
      )}
      <Box className={classes.footerBtnContainer}>
        {!props.hideSecondaryBtn && (
        <Button
          disabled={props.disableSecondaryBtn}
          onClick={props.secondaryBtnAction}
          className={clsx(classes.secondaryBtn, props.classes?.secondaryBtn)}
          classes={{ text: clsx(classes.secondaryBtnText, props.classes?.secondaryBtnTitle) }}
        >
          {props.secondaryBtnTitle}
        </Button>
        )}
        {!props.hidePrimaryBtn && (
        <Button
          disableFocusRipple
          disabled={props.disablePrimaryBtn}
          onClick={props.primaryBtnAction}
          className={clsx(classes.primaryBtn, props.classes?.primaryBtn)}
          classes={{ text: clsx(classes.primaryBtnText, props.classes?.primaryBtnTitle) }}
        >
          {props.primaryBtnTitle}
        </Button>
        )}
      </Box>
    </Paper>
  );
};

export default Footer;
