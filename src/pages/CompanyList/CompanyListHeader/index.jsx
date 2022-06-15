import { useState } from "react";
import { Box, Grid } from "@mui/material";

import CeroDropdown from "../../../components/CeroDropdown";
import { sampleYear } from "../../../constants";
import useStyles from "./styles";


const CompanyFilter = (props) => {
    const { onApplyFilter } = props;
    const classes = useStyles();

    const [filterYear, setYear] = useState(sampleYear[0].key);

    const onApply = (e) => {
        const filterValue = {};
        if (e.target.value) {
            filterValue.year = e.target.value;
        }
        setYear(e.target.value)
        onApplyFilter(filterValue);
    };

    return (
        <Box className={classes.container}>
            <Grid className={classes.filterContainer} container columnSpacing={2} alignItems="center" justifyContent="center" wrap="nowrap">
                <Grid item xs={2}>
                    <CeroDropdown
                        id="year"
                        label="Year"
                        fullWidth
                        options={sampleYear}
                        onChange={onApply}
                        selectedValue={filterYear}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CompanyFilter;