import { useState } from "react";

import { Grid } from "@mui/material";

import Dropdown from "../../../components/Dropdown";
import SearchBox from "../../../components/SearchBox";
import CeroButton from "../../../components/CeroButton";

import {months, sampleYear, sampleFilterType, sampleFacility} from "../../../constants";

import useStyles from "./styles";


const EmissionTableFilter = (props) => {
    const {onAddData, onApplyFilter} = props;
    const classes = useStyles();
    
    const [searchText, setSearchText] = useState('');
    const [filterYear, setYear] = useState('');
    const [filterMonth, setMonth] = useState('');
    const [filterType, setFilterType] = useState('');
    const [facility, setFacility] = useState('');

    const onApply = () => {
        const filterValue = {};
        if(searchText) {
            filterValue.searchText = searchText;
        }
        if(filterYear) {
            filterValue.filterYear = filterYear;
        }
        if(filterMonth) {
            filterValue.filterMonth = filterMonth;
        }
        if(filterType) {
            filterValue.filterType = filterType;
        }
        if(facility) {
            filterValue.facility = facility;
        }
        onApplyFilter(filterValue);
    };

    return (
        <Grid className={classes.filterContainer} container columnSpacing={2} alignItems="center" justifyContent="center" wrap="nowrap">
            <Grid item xs={1.1}>
                <Dropdown
                    id="year"
                    label="Year"
                    fullWidth
                    options={sampleYear}
                    onChange={({target}) => setYear(target.value)}
                    selectedValue={filterYear}
                />
            </Grid>
            <Grid item xs={1.2}>
                <Dropdown
                    id="month"
                    label="Month"
                    fullWidth
                    options={months}
                    onChange={({target}) => setMonth(target.value)}
                    selectedValue={filterMonth}
                />
            </Grid>
            <Grid item xs={1.3}>
                <Dropdown
                    id="fuelType"
                    label="Fuel Type"
                    fullWidth
                    options={sampleFilterType}
                    onChange={({target}) => setFilterType(target.value)}
                    selectedValue={filterType}
                />
            </Grid>
            <Grid item xs={1.4}>
                <Dropdown
                    id="facility"
                    label="Facility"
                    fullWidth
                    options={sampleFacility}
                    onChange={({target}) => setFacility(target.value)}     
                    selectedValue={facility}           
                />
            </Grid>
            <Grid item xs={3}>
                <SearchBox 
                    placeholder="Search" 
                    onChange={({target}) => setSearchText(target.value)}
                    value={searchText}  />
            </Grid>
            <Grid item xs={1.5}>
                <CeroButton 
                    buttonText="Apply"
                    className={classes.button}
                    onClick={onApply}/>
            </Grid>
            <Grid item xs={2.5}>
                <Grid container alignItems="center" justifyContent="flex-end">
                    <Grid item xs={9}>
                        <CeroButton 
                            buttonText="Add Data"
                            className={classes.button} 
                            onClick={onAddData}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EmissionTableFilter;