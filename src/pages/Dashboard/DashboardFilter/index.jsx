import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { listFacilities } from "../../../redux/actions";
import { months, sampleYear, selectionPeriod } from "../../../constants";

import Dropdown from "../../../components/Dropdown";
import CeroButton from "../../../components/CeroButton";
import useStyles from "./styles";


const DashboardFilter = (props) => {
    const dispatch = useDispatch()
    const { onApplyFilter } = props;
    const classes = useStyles();

    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));

    const [filterPeriod, setPeriod] = useState('');
    const [facility, setFacility] = useState('');
    const [filterStartYear, setStartYear] = useState('');
    const [filterStartMonth, setStartMonth] = useState('');
    const [filterEndYear, setEndYear] = useState('');
    const [filterEndMonth, setEndMonth] = useState('');

    useEffect(() => {
        dispatch(listFacilities())
    }, [dispatch])

    const onApply = () => {
        const filterValue = {}
        if (filterPeriod) {
            filterValue.filterPeriod = filterPeriod;
        }
        if (facility) {
            filterValue.facility = facility;
        }
        if (filterStartYear) {
            filterValue.filterStartYear = filterStartYear
        }
        if (filterStartMonth) {
            filterValue.filterStartMonth = filterStartMonth
        }
        if (filterEndYear) {
            filterValue.filterEndYear = filterEndYear
        }
        if (filterEndMonth) {
            filterValue.filterEndMonth = filterEndMonth
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
                    options={facilitiesList}
                    onChange={({ target }) => setFacility(target.value)}
                    selectedValue={facility}
                />
            </Grid>
            <Grid item xs={1.8}>
                <Dropdown
                    id="period"
                    label="Select Period"
                    fullWidth
                    options={selectionPeriod}
                    onChange={({ target }) => setPeriod(target.value)}
                    selectedValue={filterPeriod}
                />
            </Grid>
            {filterPeriod === 'advanced' &&
                <>
                    <Grid item xs={1.8}>
                        <Dropdown
                            id="startYyear"
                            label="Starting Year"
                            fullWidth
                            options={sampleYear}
                            onChange={({ target }) => setStartYear(target.value)}
                            selectedValue={filterStartYear}
                        />
                    </Grid>
                    <Grid item xs={1.8}>
                        <Dropdown
                            id="startMonth"
                            label="Starting Month"
                            fullWidth
                            options={months}
                            onChange={({ target }) => setStartMonth(target.value)}
                            selectedValue={filterStartMonth}
                        />
                    </Grid>
                    <Grid item xs={1.8}>
                        <Dropdown
                            id="endYear"
                            label="Ending Year"
                            fullWidth
                            options={sampleYear}
                            onChange={({ target }) => setEndYear(target.value)}
                            selectedValue={filterEndYear}
                        />
                    </Grid>
                    <Grid item xs={1.8}>
                        <Dropdown
                            id="endMonth"
                            label="Ending Month"
                            fullWidth
                            options={months}
                            onChange={({ target }) => setEndMonth(target.value)}
                            selectedValue={filterEndMonth}
                        />
                    </Grid>
                </>
            }
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
