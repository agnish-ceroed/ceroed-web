import React from 'react';
import { Box } from "@mui/material";

import FacilitiesTableFilter from '../FacilitiesTableFilter';
import useStyles from "./styles";

const FacilitiesHeader = ({ onAddData }) => {
    const classes = useStyles();

    const onApplyFilter = (filter) => {
        //trigger api for filter list
        console.log(filter);
    };

    return (
        <Box className={classes.container}>
            <FacilitiesTableFilter onAddData={onAddData} onApplyFilter={onApplyFilter} />
        </Box>
    )
}

export default FacilitiesHeader;
