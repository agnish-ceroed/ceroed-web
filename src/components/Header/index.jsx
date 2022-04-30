import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box } from '@mui/system';

import useStyles from "./styles";

const Header = ({placeholder, onChange}) => {
    const classes = useStyles();

    return <Box className={classes.header}>
        <Box className={classes.searchBoxContainer}>
            {/* <SearchOutlinedIcon fontSize='small' className={classes.icon}/>
            <input
                className={classes.searchBox} 
                placeholder={placeholder ? placeholder : 'Global search'} 
                onChange={onChange}/> */}
        </Box>
        <NotificationsOutlinedIcon className={classes.notificationIcon}/>
    </Box>
};

export default Header;