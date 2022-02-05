import { Box } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CeroInput from "../CeroInput";

import useStyles from "./styles";

const SearchBox = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.searchBoxContainer}>
            <SearchOutlinedIcon fontSize='small' className={classes.icon}/>
            <CeroInput {...props} inputProps={{classes: {input: classes.inputBox}}} variant="standard"/>
        </Box>
    );
};

export default SearchBox;