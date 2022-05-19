import { useState } from "react";
import { Box, Grid } from "@mui/material";

import CeroDropdown from "../../../components/CeroDropdown";
import CeroButton from "../../../components/CeroButton";
import { sampleYear } from "../../../constants";
import useStyles from "./styles";


const CompanyFilter = (props) => {
    const { onApplyFilter } = props;
    const classes = useStyles();

    const [filterYear, setYear] = useState(sampleYear[0].key);

    const onClear = () => {
        setYear('');
    }

    const onApply = () => {
        const filterValue = {};
        if (filterYear) {
            filterValue.year = filterYear;
        }
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
                        onChange={({ target }) => setYear(target.value)}
                        selectedValue={filterYear}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <CeroButton
                        buttonText="Clear"
                        className={classes.button}
                        onClick={onClear} />
                </Grid>
                <Grid item xs={1.5}>
                    <CeroButton
                        buttonText="Apply"
                        className={classes.button}
                        onClick={onApply} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CompanyFilter;