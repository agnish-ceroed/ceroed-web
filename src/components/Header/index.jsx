// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Box } from '@mui/system';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsMenu from './SettingsMenu'
import NotificationIcon from './NotificationIcon'

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
        <Box className={classes.notificationContainer}>
            <NotificationIcon />
            <SettingsMenu/>
        </Box>
    </Box>
};

export default Header;