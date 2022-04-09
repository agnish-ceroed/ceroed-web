import React from 'react';
import { Box } from "@mui/material";

import DashboardFilter from '../DashboardFilter';
import useStyles from "./styles";

const DashboardHeader = (props) => {
    const classes = useStyles();
    
    return (
        <Box className={classes.container}>
            <DashboardFilter onApplyFilter={props.onApplyFilter} />
        </Box>
    )
}

export default DashboardHeader;
