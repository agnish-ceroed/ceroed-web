import React from 'react';
import { Box } from "@mui/material";
import useStyles from "./styles";   

import EmissionTableFilter from '../EmissionTableFilter';

const EmissionHeader = (props) => {
    const classes = useStyles();

    const onApplyFilter = (filter) => {
        //trigger api for filter list
        console.log(filter);
    };

    const onAddData = () => {
        //Trigger add data action
    };
    return (
        <Box className={classes.container}>
            <EmissionTableFilter onAddData = {onAddData} onApplyFilter={onApplyFilter}/>
        </Box>
    )
}

export default EmissionHeader;
