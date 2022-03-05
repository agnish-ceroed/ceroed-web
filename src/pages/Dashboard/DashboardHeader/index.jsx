import React from 'react';
import { Box } from "@mui/material";

import DashboardFilter from '../DashboardFilter';
import useStyles from "./styles";   

const DashboardHeader = () => {
    const classes = useStyles();

    const onApplyFilter = (filter) => {
        //trigger api for filter list
        console.log(filter);
    };

    return (
        <Box className={classes.container}>
            <DashboardFilter onApplyFilter={onApplyFilter}/>
        </Box>
    )
}

export default DashboardHeader;
