/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { Drawer, Paper } from '@mui/material';

import Header from './Header';
import Footer from './Footer';
import useStyles from './styles';

// DrawerProps {
//   content: React.ReactNode;
//   drawerOpen: boolean;
//   onClose?: (data?: any) => void;
//   largeDrawer?: boolean;
//   hideHeader?: boolean;
//   header?: IHeader;
//   hideFooter?: boolean;
//   footer?: IFooter;
//   classes?: ClassType;
// }

// CeroSideSheetDrawer props {
//   primaryDrawer: DrawerProps;
//   secondaryDrawer?: DrawerProps;
// }

const CeroSideSheetDrawer = (props) => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="right"
      open={props.primaryDrawer.drawerOpen}
      onClose={props.primaryDrawer.onClose}
      classes={{ modal: classes.modal, paper: classes.drawer }}
    >
      <Paper
        className={clsx(
          classes.container,
          props.primaryDrawer.classes?.drawerContainer,
          props.primaryDrawer.largeDrawer && classes.containerLarge,
        )}
      >
        {!props.primaryDrawer.hideHeader && <Header {...props.primaryDrawer.header} onClose={props.primaryDrawer.onClose} /> }
        <Paper className={clsx(classes.contentArea, props.primaryDrawer.classes?.contentArea)} variant="outlined">
          {props.primaryDrawer.content}
        </Paper>
        {!props.primaryDrawer.hideFooter && <Footer {...props.primaryDrawer.footer} /> }
      </Paper>
      { props.secondaryDrawer?.drawerOpen && (
        <Paper
          className={clsx(
            classes.container,
            props.secondaryDrawer.classes?.drawerContainer,
            props.secondaryDrawer.largeDrawer && classes.containerLarge,
          )}
        >
          {!props.secondaryDrawer.hideHeader && <Header {...props.secondaryDrawer.header} onClose={props.secondaryDrawer.onClose} /> }
          <Paper className={clsx(classes.contentArea, props.secondaryDrawer.classes?.contentArea)} variant="outlined">
            {props.secondaryDrawer.content}
          </Paper>
          {!props.secondaryDrawer.hideFooter && <Footer {...props.secondaryDrawer.footer} /> }
        </Paper>
      )}
    </Drawer>
  );
};

export default CeroSideSheetDrawer;
