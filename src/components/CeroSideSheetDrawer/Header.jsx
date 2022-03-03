import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button, IconButton, Paper, Typography,
} from '@mui/material';

import useStyles from './styles';

// Header Props{
//   hideCloseBtn?: boolean;
//   title?: string;
//   hidePrimaryBtn?: boolean;
//   disablePrimaryBtn?: boolean;
//   primaryBtnTitle?: string;
//   primaryBtnAction?: ()=>void;
//   classes?: ClassType;
// }

const Header = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.headerContainer}>
      { props.title
        && (
        <Typography noWrap className={clsx(classes.headerTitle, props.classes?.title)}>
          {props.title}
        </Typography>
        )}
      { !props.hidePrimaryBtn && (
        <Button
          disableRipple
          disabled={props.disablePrimaryBtn}
          onClick={props.primaryBtnAction}
          className={clsx(classes.headerPrimaryBtn, props.classes?.primaryBtn)}
          classes={{ text: clsx(classes.headerPrimaryBtnText, props.classes?.primaryBtnTitle) }}
        >
          {props.primaryBtnTitle}
        </Button>
      )}
      {!props.hideCloseBtn && <IconButton onClick={props.onClose}><CloseIcon /></IconButton>}
    </Paper>
  );
};

export default Header;
