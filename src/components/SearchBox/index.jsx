import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import clsx from 'clsx';
import CeroInput from "../CeroInput";

import useStyles from "./styles";

const SearchBox = (props) => {
    const classes = useStyles();

    return (
        <CeroInput
            {...props}
            classes={{ container: clsx(classes.inputRoot, props.classes?.container) }}
            inputProps={{
                startAdornment: <SearchOutlinedIcon fontSize='small' className={classes.icon} />,
                classes: { input: classes.input }
            }}
        />
    );
};

export default SearchBox;