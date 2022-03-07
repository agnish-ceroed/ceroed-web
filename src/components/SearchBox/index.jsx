import { Box } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CeroInput from "../CeroInput";

import useStyles from "./styles";

const SearchBox = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.searchBoxContainer}>
            <CeroInput
                {...props}
                inputProps={{
                    startAdornment: <SearchOutlinedIcon fontSize='small' className={classes.icon} />,
                    classes: { input: classes.inputBox }
                }}
            />
        </Box>
    );
};

export default SearchBox;