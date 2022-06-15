import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import { months, sampleYear, selectionPeriod } from "../../../constants";

import CeroDropdown from "../../../components/CeroDropdown";
import CeroButton from "../../../components/CeroButton";
import useStyles from "./styles";


const DashboardFilter = (props) => {
    const { onApplyFilter } = props;
    const classes = useStyles();

    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));
    facilitiesList.splice(0, 0, { key: 'all', value: 'All' });

    const [filterPeriod, setPeriod] = useState('last_one_year');
    const [facility, setFacility] = useState('all');
    const [filterStartYear, setStartYear] = useState('');
    const [filterStartMonth, setStartMonth] = useState('');
    const [filterEndYear, setEndYear] = useState('');
    const [filterEndMonth, setEndMonth] = useState('');

    const onApply = () => {
        const filterValue = {}
        if (filterPeriod) {
            filterValue.duration = filterPeriod;
        }
        if (facility && facility !== 'all') {
            filterValue.facility = facility;
        }
        if (filterStartYear) {
            filterValue.start_year = filterStartYear
        }
        if (filterStartMonth) {
            filterValue.start_month = filterStartMonth
        }
        if (filterEndYear) {
            filterValue.end_year = filterEndYear
        }
        if (filterEndMonth) {
            filterValue.end_month = filterEndMonth
        }
        onApplyFilter(filterValue);
    };

    const onReset = () => {
        setPeriod('')
        setFacility('')
        setStartYear('')
        setStartMonth('')
        setEndYear('')
        setEndMonth('')
        onApplyFilter()
    }

    return (
        <>
            <Grid className={classes.filterContainer} container columnSpacing={2} alignItems="center" wrap="nowrap">
                <Grid item sm={3} md={2}>
                    <CeroDropdown
                        id="facility"
                        label="Facility Type"
                        fullWidth
                        options={facilitiesList}
                        onChange={({ target }) => setFacility(target.value)}
                        selectedValue={facility}
                    />
                </Grid>
                <Grid item sm={3} md={2}>
                    <CeroDropdown
                        id="period"
                        label="Select Period"
                        fullWidth
                        options={selectionPeriod}
                        onChange={({ target }) => setPeriod(target.value)}
                        selectedValue={filterPeriod}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <CeroButton
                        buttonText="Apply"
                        className={classes.button}
                        onClick={onApply} />
                </Grid>
                <Grid item xs={1.5}>
                    <CeroButton
                        buttonText="Reset"
                        className={classes.button}
                        onClick={onReset} />
                </Grid>
            </Grid>
            {filterPeriod === 'advanced' &&
                <Grid className={classes.filterContainer} container columnSpacing={2} alignItems="center" wrap="nowrap">
                    <Grid item sm={3} md={2}>
                        <CeroDropdown
                            id="startYyear"
                            label="Starting Year"
                            fullWidth
                            options={sampleYear}
                            onChange={({ target }) => setStartYear(target.value)}
                            selectedValue={filterStartYear}
                        />
                    </Grid>
                    <Grid item sm={3} md={2}>
                        <CeroDropdown
                            id="startMonth"
                            label="Starting Month"
                            fullWidth
                            options={months}
                            onChange={({ target }) => setStartMonth(target.value)}
                            selectedValue={filterStartMonth}
                        />
                    </Grid>
                    <Grid item sm={3} md={2}>
                        <CeroDropdown
                            id="endYear"
                            label="Ending Year"
                            fullWidth
                            options={sampleYear}
                            onChange={({ target }) => setEndYear(target.value)}
                            selectedValue={filterEndYear}
                        />
                    </Grid>
                    <Grid item sm={3} md={2}>
                        <CeroDropdown
                            id="endMonth"
                            label="Ending Month"
                            fullWidth
                            options={months}
                            onChange={({ target }) => setEndMonth(target.value)}
                            selectedValue={filterEndMonth}
                        />
                    </Grid>
                </Grid>
            }
        </>
        
            
            
        
    );
};

export default DashboardFilter;
