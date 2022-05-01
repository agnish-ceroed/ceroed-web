import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Dropdown from "../../../components/Dropdown";
import SearchBox from "../../../components/SearchBox";
import CeroButton from "../../../components/CeroButton";
import {months, sampleYear} from "../../../constants";
import { listFacilities } from "../../../redux/actions";
import useStyles from "./styles";

const facilityAllowedEmissionTypes = [
    'stationary_combustion',
    'mobile_combustion',
    'purchased_electricity',
    'water_discharge',
    'water_consumption',
    'refrigerants',
    'waste',
];

const EmissionTableFilter = (props) => {
    const {onAddData, onApplyFilter} = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const facilitiesData = useSelector(state => state.listings.listFacilities.data);
    const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));

    
    const [searchText, setSearchText] = useState('');
    const [filterYear, setYear] = useState('');
    const [filterMonth, setMonth] = useState('');
    const [filterType, setFilterType] = useState('');
    const [facility, setFacility] = useState('');

    useEffect(() => {
        dispatch(listFacilities())
    }, []);

    const onClear = () => {
        setSearchText('');
        setYear('');
        setMonth('');
        setFacility('');
    }

    const onApply = () => {
        const filterValue = {};
        if(searchText) {
            filterValue.search = searchText;
        }
        if(filterYear) {
            filterValue.year = filterYear;
        }
        if(filterMonth) {
            filterValue.month = filterMonth;
        }
        if(filterType) {
            filterValue.filterType = filterType;
        }
        if(facility) {
            filterValue.facity_id = facility;
        }
        onApplyFilter(filterValue);
    };

    return (
        <Box className={classes.filterContainer}>
            <Box className={classes.primaryContainer}>
                <Grid className={classes.filterItem} item xs={3}>
                    <Dropdown
                        id="year"
                        label="Year"
                        fullWidth
                        options={sampleYear}
                        onChange={({target}) => setYear(target.value)}
                        selectedValue={filterYear}
                    />
                </Grid>
                {filterYear && <Grid className={classes.filterItem} item xs={3}>
                    <Dropdown
                        id="month"
                        label="Month"
                        fullWidth
                        options={months}
                        onChange={({target}) => setMonth(target.value)}
                        selectedValue={filterMonth}
                    />
                </Grid>}
                {/* <Grid item xs={1.3}>
                    <Dropdown
                        id="fuelType"
                        label="Fuel Type"
                        fullWidth
                        options={sampleFilterType}
                        onChange={({target}) => setFilterType(target.value)}
                        selectedValue={filterType}
                    />
                </Grid> */}
                { facilityAllowedEmissionTypes.indexOf(props.emissionType) > -1 && <Grid className={classes.filterItem} item xs={2}>
                    <Dropdown
                        id="facility"
                        label="Facility"
                        fullWidth
                        options={facilitiesList}
                        onChange={({target}) => setFacility(target.value)}     
                        selectedValue={facility}           
                    />
                </Grid> }
                <Grid className={classes.filterItem} item xs={3}>
                    <SearchBox 
                        placeholder="Search" 
                        onChange={({target}) => setSearchText(target.value)}
                        value={searchText}
                        classes={{ container: classes.input}}
                    />
                </Grid>
                <Grid className={classes.filterItem} item xs={2}>
                    <CeroButton 
                        buttonText="Apply"
                        className={classes.button}
                        onClick={onApply}/>
                </Grid>
                <Grid className={classes.filterItem} item xs={2}>
                    <CeroButton 
                        buttonText="Clear"
                        className={classes.button}
                        onClick={onClear}/>
                </Grid>
            </Box>
            <Box>
                <CeroButton 
                    buttonText="Add Data"
                    className={classes.button} 
                    onClick={onAddData}
                />
            </Box>
        </Box>
    );
};

export default EmissionTableFilter;