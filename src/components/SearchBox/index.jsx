import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CeroInput from "../CeroInput";

import useStyles from "./styles";

const SearchBox = (props) => {
    const classes = useStyles();

    return (
        <CeroInput
            {...props}
            classes={{ container: classes.inputRoot }}
            inputProps={{
                startAdornment: <SearchOutlinedIcon fontSize='small' className={classes.icon} />,
                classes: { input: classes.inputBox }
            }}
        />
    );
};

export default SearchBox;