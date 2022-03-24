import React from 'react';
import { Box } from "@mui/material";

import EmissionTableFilter from '../EmissionTableFilter';
import EmissionSelection from '../EmissionSelection';
import useStyles from "./styles";

const EmissionHeader = ({ onAddData, emissionType, setEmissionType }) => {
    const classes = useStyles();

    const onApplyFilter = (filter) => {
        //trigger api for filter list
        console.log(filter);
    };

    return (
        <Box className={classes.container}>
            <EmissionSelection emissionType={emissionType} onSelectEmission={setEmissionType} />
            <EmissionTableFilter onAddData={onAddData} onApplyFilter={onApplyFilter} />
        </Box>
    )
}

export default EmissionHeader;
