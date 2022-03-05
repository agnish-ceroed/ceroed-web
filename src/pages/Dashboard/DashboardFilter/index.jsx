import React, { useState } from "react";
import { Grid } from "@mui/material";

import Dropdown from "../../../components/Dropdown";
import CeroButton from "../../../components/CeroButton";
import { sampleYear, sampleFacility } from "../../../constants";
import useStyles from "./styles";


const DashboardFilter = (props) => {
    const { onApplyFilter } = props;
    const classes = useStyles();

    const [filterYear, setYear] = useState('');
    const [filterPeriod, setPeriod] = useState('');
    const [facility, setFacility] = useState('');

    const onApply = () => {
        const filterValue = {};
        if (filterYear) {
            filterValue.filterYear = filterYear;
        }
        if (filterPeriod) {
            filterValue.filterPeriod = filterPeriod;
        }
        if (facility) {
            filterValue.facility = facility;
        }
        onApplyFilter(filterValue);
    };

    return (
        <Grid className={classes.filterContainer} container columnSpacing={2} alignItems="center" wrap="nowrap">
            <Grid item xs={1.6}>
                <Dropdown
                    id="facility"
                    label="Facility Type"
                    fullWidth
                    options={sampleFacility}
                    onChange={({ target }) => setFacility(target.value)}
                    selectedValue={facility}
                />
            </Grid>
            <Grid item xs={1.8}>
                <Dropdown
                    id="period"
                    label="Select Period"
                    fullWidth
                    options={[{ key: 'one', value: 'Post 1 Month' }, { key: "quarter", value: 'Past Quarter' }]}
                    onChange={({ target }) => setPeriod(target.value)}
                    selectedValue={filterPeriod}
                />
            </Grid>
            <Grid item xs={1.8}>
                <Dropdown
                    id="year"
                    label="Starting Year"
                    fullWidth
                    options={sampleYear}
                    onChange={({ target }) => setYear(target.value)}
                    selectedValue={filterYear}
                />
            </Grid>
            <Grid item xs={1.5}>
                <CeroButton
                    buttonText="Apply"
                    className={classes.button}
                    onClick={onApply} />
            </Grid>
        </Grid>
    );
};

export default DashboardFilter;
