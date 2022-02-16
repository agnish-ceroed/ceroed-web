import React from 'react';
import { Box } from "@mui/material";
import useStyles from "./styles";   

import EmissionTableFilter from '../EmissionTableFilter';

const EmissionHeader = ({onAddData}) => {
    const classes = useStyles();

    const onApplyFilter = (filter) => {
        //trigger api for filter list
        console.log(filter);
    };

    return (
        <Box className={classes.container}>
            <EmissionTableFilter onAddData = {onAddData} onApplyFilter={onApplyFilter}/>
        </Box>
    )
}

export default EmissionHeader;
