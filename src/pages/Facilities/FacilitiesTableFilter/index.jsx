import { useState } from "react";
import { Grid } from "@mui/material";

import { sampleCountryList } from "../../../constants";

import CeroDropdown from "../../../components/CeroDropdown";
import SearchBox from "../../../components/SearchBox";
import CeroButton from "../../../components/CeroButton";

import useStyles from "./styles";


const FacilitiesTableFilter = (props) => {
    const { onAddData, onApplyFilter } = props;
    const classes = useStyles();

    const [searchText, setSearchText] = useState('');
    const [filterYear, setYear] = useState('');

    const onApply = () => {
        const filterValue = {};
        if (searchText) {
            filterValue.searchText = searchText;
        }
        if (filterYear) {
            filterValue.filterYear = filterYear;
        }
        onApplyFilter(filterValue);
    };

    return (
        <Grid className={classes.filterContainer} container alignItems="center" justifyContent="space-between" wrap="nowrap">
            <Grid container columnSpacing={2} alignItems="center" wrap="nowrap">
                <Grid item xs={3}>
                    <CeroDropdown
                        id="country"
                        label="Country"
                        fullWidth
                        options={sampleCountryList}
                        onChange={({ target }) => setYear(target.value)}
                        selectedValue={filterYear}
                    />
                </Grid>
                <Grid item xs={3}>
                    <SearchBox
                        placeholder="Search"
                        onChange={({ target }) => setSearchText(target.value)}
                        value={searchText}
                        classes={{container: classes.searchTextContainer}}
                         />
                </Grid>
                <Grid item xs={1.5}>
                    <CeroButton
                        buttonText="Apply"
                        className={classes.button}
                        onClick={onApply} />
                </Grid>
            </Grid>
            <Grid item xs={2.5}>
                <Grid container alignItems="center" justifyContent="flex-end">
                    <Grid item xs={9}>
                        <CeroButton
                            buttonText="Add Facility"
                            className={classes.button}
                            onClick={onAddData} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FacilitiesTableFilter;
